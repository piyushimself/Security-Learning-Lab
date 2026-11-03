const cards = [...document.querySelectorAll(".resource-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const searchInput = document.getElementById("resource-search");
const noResults = document.getElementById("no-results");
const resultCount = document.getElementById("result-count");
let activeFilter = "all";

function updateResources() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const categoryMatch = activeFilter === "all" || card.dataset.domain === activeFilter;
    const searchText = `${card.dataset.search} ${card.innerText}`.toLowerCase();
    const searchMatch = !query || searchText.includes(query);
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  noResults.hidden = visible !== 0;
  resultCount.textContent = `Showing ${visible} of ${cards.length} learning resources`;
}
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    updateResources();
  });
});
searchInput.addEventListener("input", updateResources);
document.querySelectorAll(".path-action[data-filter]").forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.filter;
    activeFilter = target;
    filterButtons.forEach(button => {
      const selected = button.dataset.filter === target;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    updateResources();
  });
});
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  nav.classList.toggle("open", !expanded);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
}));
document.getElementById("year").textContent = new Date().getFullYear();
updateResources();
