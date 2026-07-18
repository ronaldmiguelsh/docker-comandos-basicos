(() => {
  "use strict";

  const guide = window.DOCKER_GUIDE;
  if (!guide) return;

  const state = { query: "", level: "all", category: "all" };
  const levelLabels = { beginner: "Inicial", intermediate: "Intermedio", advanced: "Avanzado" };
  const categoryMap = Object.fromEntries(guide.categories.map((category) => [category.id, category]));

  const elements = {
    themeToggle: document.querySelector("#themeToggle"),
    learningPath: document.querySelector("#learningPath"),
    commandCount: document.querySelector("#commandCount"),
    search: document.querySelector("#searchInput"),
    levelFilters: document.querySelector("#levelFilters"),
    categoryFilters: document.querySelector("#categoryFilters"),
    resultSummary: document.querySelector("#resultSummary"),
    commandGrid: document.querySelector("#commandGrid"),
    emptyState: document.querySelector("#emptyState"),
    clearFilters: document.querySelector("#clearFilters"),
    dialog: document.querySelector("#commandDialog"),
    toast: document.querySelector("#toast")
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function initializeTheme() {
    const saved = localStorage.getItem("docker-guide-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    applyTheme(saved || preferred);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    elements.themeToggle.querySelector("span").textContent = theme === "dark" ? "☀" : "☾";
    elements.themeToggle.setAttribute("aria-label", theme === "dark" ? "Activar tema claro" : "Activar tema oscuro");
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#07111f" : "#f5f8fc";
  }

  function renderLearningPath() {
    elements.learningPath.innerHTML = guide.learningPath.map((item, index) => `
      <article class="learning-card" tabindex="0" data-path-category="${item.category}" aria-label="Ver ${escapeHtml(item.title)}">
        <div class="step"><span>PASO ${String(index + 1).padStart(2, "0")}</span><i></i></div>
        <i class="card-icon" aria-hidden="true">${escapeHtml(item.icon)}</i>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `).join("");
  }

  function renderCategoryFilters() {
    elements.categoryFilters.innerHTML = [
      '<button class="category-tab active" type="button" data-category="all">Todas</button>',
      ...guide.categories.map((category) => `<button class="category-tab" type="button" data-category="${category.id}">${escapeHtml(category.label)}</button>`)
    ].join("");
  }

  function filteredCommands() {
    const query = state.query.toLocaleLowerCase("es");
    return guide.commands.filter((item) => {
      const matchesLevel = state.level === "all" || item.level === state.level;
      const matchesCategory = state.category === "all" || item.category === state.category;
      const haystack = `${item.command} ${item.summary} ${item.description} ${categoryMap[item.category].label}`.toLocaleLowerCase("es");
      return matchesLevel && matchesCategory && haystack.includes(query);
    });
  }

  function renderCommands() {
    const commands = filteredCommands();
    elements.resultSummary.textContent = `${commands.length} ${commands.length === 1 ? "comando encontrado" : "comandos encontrados"}`;
    elements.emptyState.hidden = commands.length !== 0;
    elements.commandGrid.hidden = commands.length === 0;
    elements.commandGrid.innerHTML = commands.map((item) => `
      <article class="command-card">
        <div>
          <header>
            <code>${escapeHtml(item.command)}</code>
            <span class="level-badge level-${item.level}">${levelLabels[item.level]}</span>
            ${item.risk ? '<span class="risk-badge">Precaución</span>' : ""}
          </header>
          <p>${escapeHtml(item.summary)}</p>
        </div>
        <div class="card-actions">
          <button type="button" data-copy="${escapeHtml(item.example)}" aria-label="Copiar ${escapeHtml(item.example)}">Copiar</button>
          <button type="button" data-open-command="${item.id}" aria-label="Explicar ${escapeHtml(item.command)}">Ver</button>
        </div>
      </article>
    `).join("");
  }

  function selectCategory(category) {
    state.category = category;
    elements.categoryFilters.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.dataset.category === category);
    });
    renderCommands();
  }

  function resetFilters() {
    state.query = "";
    state.level = "all";
    state.category = "all";
    elements.search.value = "";
    elements.levelFilters.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.level === "all"));
    elements.categoryFilters.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.category === "all"));
    renderCommands();
  }

  function openCommand(id) {
    const item = guide.commands.find((command) => command.id === id);
    if (!item) return;
    document.querySelector("#dialogCategory").textContent = `${categoryMap[item.category].label} · ${levelLabels[item.level]}`;
    document.querySelector("#dialogTitle").textContent = item.command;
    document.querySelector("#dialogDescription").textContent = item.description;
    document.querySelector("#dialogCode").textContent = item.example;
    document.querySelector("#dialogBreakdown").innerHTML = item.breakdown.map((line) => `<li>${escapeHtml(line)}</li>`).join("");
    document.querySelector("#dialogResult").textContent = item.result;
    const warning = document.querySelector("#dialogWarning");
    warning.hidden = !item.warning;
    warning.querySelector("p").textContent = item.warning || "";
    document.querySelector("#dialogCopy").dataset.copy = item.example;
    elements.dialog.showModal();
  }

  let toastTimer;
  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    clearTimeout(toastTimer);
    elements.toast.classList.add("visible");
    toastTimer = setTimeout(() => elements.toast.classList.remove("visible"), 1800);
  }

  function loadLabProgress() {
    let progress = [];
    try { progress = JSON.parse(localStorage.getItem("docker-guide-lab") || "[]"); } catch { progress = []; }
    document.querySelectorAll("#labSteps input").forEach((input, index) => { input.checked = Boolean(progress[index]); });
    updateLabProgress();
  }

  function updateLabProgress() {
    const checks = [...document.querySelectorAll("#labSteps input")];
    const completed = checks.filter((input) => input.checked).length;
    localStorage.setItem("docker-guide-lab", JSON.stringify(checks.map((input) => input.checked)));
    document.querySelector("#labProgressText").textContent = `${completed} de ${checks.length}`;
    document.querySelector("#labProgressBar").style.width = `${(completed / checks.length) * 100}%`;
  }

  elements.themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("docker-guide-theme", next);
    applyTheme(next);
  });

  elements.search.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    renderCommands();
  });

  elements.levelFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-level]");
    if (!button) return;
    state.level = button.dataset.level;
    elements.levelFilters.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    renderCommands();
  });

  elements.categoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (button) selectCategory(button.dataset.category);
  });

  elements.learningPath.addEventListener("click", (event) => {
    const card = event.target.closest("[data-path-category]");
    if (!card) return;
    selectCategory(card.dataset.pathCategory);
    document.querySelector("#comandos").scrollIntoView();
  });

  elements.learningPath.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.target.click();
    }
  });

  document.addEventListener("click", (event) => {
    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) copyText(copyButton.dataset.copy);
    const openButton = event.target.closest("[data-open-command]");
    if (openButton) openCommand(openButton.dataset.openCommand);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      elements.search.focus();
    }
  });

  document.querySelector("#dialogClose").addEventListener("click", () => elements.dialog.close());
  elements.dialog.addEventListener("click", (event) => {
    if (event.target === elements.dialog) elements.dialog.close();
  });
  elements.clearFilters.addEventListener("click", resetFilters);
  document.querySelector("#labSteps").addEventListener("change", updateLabProgress);
  document.querySelector("#resetLab").addEventListener("click", () => {
    document.querySelectorAll("#labSteps input").forEach((input) => { input.checked = false; });
    updateLabProgress();
  });
  document.querySelector("[data-safety-filter]").addEventListener("click", () => {
    state.level = "advanced";
    selectCategory("maintenance");
    elements.levelFilters.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.level === "advanced"));
  });

  initializeTheme();
  renderLearningPath();
  renderCategoryFilters();
  renderCommands();
  loadLabProgress();
  elements.commandCount.textContent = guide.commands.length;
})();
