/** Accessible static-site search over a generated JSON index. */

function normalize(value) {
  return String(value || '').normalize('NFKC').toLocaleLowerCase();
}

export function tokenize(value) {
  const text = normalize(value);
  const tokens = new Set();
  for (const word of text.match(/[a-z0-9]+(?:[-_'][a-z0-9]+)*/g) || []) {
    tokens.add(word);
  }
  for (const run of text.match(/[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]+/g) || []) {
    if (run.length === 1) tokens.add(run);
    for (let i = 0; i < run.length - 1; i += 1) tokens.add(run.slice(i, i + 2));
    for (let i = 0; i < run.length - 2; i += 1) tokens.add(run.slice(i, i + 3));
  }
  return Array.from(tokens);
}

function count(text, term) {
  let total = 0;
  let offset = 0;
  while ((offset = text.indexOf(term, offset)) !== -1) {
    total += 1;
    offset += Math.max(1, term.length);
  }
  return total;
}

export class StaticSearch {
  constructor(root, options = {}) {
    this.root = root;
    this.form = root.matches('form') ? root : root.querySelector('form');
    this.input = root.querySelector('[data-search-input], input[type="search"]');
    this.output = root.querySelector('[data-search-results]');
    this.status = root.querySelector('[data-search-status]');
    this.indexURL = options.indexURL || root.dataset?.index || '/search-index.json';
    this.limit = Number(options.limit || root.dataset?.limit || 20);
    this.index = null;
    this.timer = null;
  }

  async start() {
    if (!this.input || !this.output) return this;
    if (this.root.dataset.tsuzuriSearchStarted === 'true') return this;
    this.root.dataset.tsuzuriSearchStarted = 'true';
    this.form?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.search(this.input.value);
    });
    this.input.addEventListener('input', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.search(this.input.value), 100);
    });
    const query = new URL(location.href).searchParams.get('q');
    if (query) {
      this.input.value = query;
      await this.search(query);
    }
    return this;
  }

  async load() {
    if (this.index) return this.index;
    const response = await fetch(this.indexURL, { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`Cannot load search index: ${response.status}`);
    this.index = await response.json();
    return this.index;
  }

  async search(query) {
    const clean = normalize(query).trim();
    if (!clean) {
      this.output.replaceChildren();
      if (this.status) this.status.textContent = '';
      return [];
    }
    if (this.status) this.status.textContent = '検索中…';
    try {
      const index = await this.load();
      const documents = index.documents || index.docs || [];
      const terms = tokenize(clean);
      const postingScores = new Map();
      if (index.index && typeof index.index === 'object') {
        for (const term of terms) {
          for (const row of index.index[term] || []) {
            if (!Array.isArray(row) || row.length < 2) continue;
            const documentNumber = Number(row[0]);
            postingScores.set(documentNumber,
              (postingScores.get(documentNumber) || 0) + Number(row[1] || 0));
          }
        }
      }
      const hasPostings = postingScores.size > 0;
      const results = documents.map((document, position) => {
        const title = normalize(document.title);
        const tags = normalize((document.tags || []).join(' '));
        const body = normalize(document.text || document.summary || '');
        let score = postingScores.get(position) || 0;
        score += title.includes(clean) ? 40 : 0;
        score += tags.includes(clean) ? 20 : 0;
        if (!hasPostings) {
          for (const term of terms) {
            score += count(title, term) * 10;
            score += count(tags, term) * 6;
            score += Math.min(8, count(body, term));
          }
        }
        return { document, score, position };
      }).filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.position - b.position)
        .slice(0, this.limit);
      this.render(results, clean);
      return results;
    } catch (error) {
      this.output.replaceChildren();
      if (this.status) this.status.textContent = '検索索引を読み込めませんでした。';
      this.root.dispatchEvent(new CustomEvent('tsuzuri:search-error', { detail: { error } }));
      return [];
    }
  }

  render(results, query) {
    const fragment = document.createDocumentFragment();
    for (const { document: item } of results) {
      const article = document.createElement('article');
      article.className = 'tsuzuri-search-result';
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.title || item.url;
      heading.append(link);
      article.append(heading);
      if (item.summary) {
        const summary = document.createElement('p');
        summary.textContent = item.summary;
        article.append(summary);
      }
      fragment.append(article);
    }
    this.output.replaceChildren(fragment);
    if (this.status) this.status.textContent = `${results.length}件の検索結果`;
    const url = new URL(location.href);
    url.searchParams.set('q', query);
    history.replaceState(history.state, '', url);
    this.root.dispatchEvent(new CustomEvent('tsuzuri:search-results', {
      detail: { query, count: results.length },
    }));
  }
}

export function bootStaticSearch(root = document) {
  const elements = Array.from(root.querySelectorAll('[data-tsuzuri-search]'));
  if (elements.length === 0
      && root.querySelector('.search-form')
      && root.querySelector('#search-results')) {
    elements.push(root);
  }
  return elements.map((element) => {
    const search = new StaticSearch(element);
    search.start();
    return search;
  });
}

function autoBoot() { bootStaticSearch(); }
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoBoot, { once: true });
} else {
  autoBoot();
}
