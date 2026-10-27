function formatLogDate(value) {
  const match = String(value || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!match) return value;
  return `${match[1]}.${match[2]}.${match[3]} / ${match[4]}:${match[5]}:${match[6]}`;
}

function enhanceLogView(root = document) {
  root.querySelectorAll(".entry-date").forEach((node) => {
    node.textContent = formatLogDate(node.textContent);
  });

  root.querySelectorAll(".article-meta time").forEach((node) => {
    node.textContent = formatLogDate(node.getAttribute("datetime") || node.textContent);
  });

  root.querySelectorAll(".entry-card").forEach((card, index) => {
    card.dataset.logIndex = String(index + 1).padStart(3, "0");
  });

  root.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

const NAV_SECTIONS = [
  ["/apps/", /^\/(apps|works|games)\//],
  ["/archive/", /^\/(archive|categories|series)\//],
  ["/tags/", /^\/tags\//],
  ["/search/", /^\/search\//],
  ["/", /^\/(?:$|page\/|posts\/|entry\/)/],
];

function markCurrentNav() {
  const path = location.pathname;
  const hit = NAV_SECTIONS.find(([, pattern]) => pattern.test(path));
  document.querySelectorAll(".site-header nav a").forEach((link) => {
    if (hit && link.getAttribute("href") === hit[0]) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// Phone only: tuck the header away while scrolling down, bring it back on scroll up.
function setupTuckingHeader() {
  const header = document.querySelector(".site-header");
  const phone = window.matchMedia("(max-width: 42rem)");
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const tuck = phone.matches && y > 160 && y > lastY + 4 && !header.contains(document.activeElement);
    if (tuck) header.classList.add("is-tucked");
    else if (y < lastY - 4 || y <= 160 || !phone.matches) header.classList.remove("is-tucked");
    lastY = y;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  header.addEventListener("focusin", () => header.classList.remove("is-tucked"));
}

function refresh() {
  enhanceLogView();
  markCurrentNav();
  document.querySelector(".site-header")?.classList.remove("is-tucked");
}

enhanceLogView();
markCurrentNav();
setupTuckingHeader();
document.addEventListener("tsuzuri:navigation-end", refresh);
document.addEventListener("tsuzuri:spa-page", refresh);
