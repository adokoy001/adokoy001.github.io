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

enhanceLogView();
document.addEventListener("tsuzuri:navigation-end", () => enhanceLogView());
document.addEventListener("tsuzuri:spa-page", () => enhanceLogView());
