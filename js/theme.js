(function () {
  const themeStorageKey = "electromatic-theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const icon = button.querySelector("i");
      const nextMode = isDark ? "light" : "dark";
      button.setAttribute("aria-label", `Switch to ${nextMode} mode`);
      button.setAttribute("title", `Switch to ${nextMode} mode`);
      button.setAttribute("aria-pressed", String(isDark));

      if (icon) {
        icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
      }
    });
  }

  let storedTheme = "light";
  try {
    storedTheme = localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light";
  } catch (error) {
    console.warn("Unable to read the saved color theme.", error);
  }
  applyTheme(storedTheme);

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(root.dataset.theme);

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        try {
          localStorage.setItem(themeStorageKey, nextTheme);
        } catch (error) {
          console.warn("Unable to save the selected color theme.", error);
        }
      });
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === themeStorageKey) {
      applyTheme(event.newValue === "dark" ? "dark" : "light");
    }
  });
})();
