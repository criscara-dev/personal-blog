(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) {
    return;
  }

  function getCurrentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function setToggleLabel(theme) {
    toggle.textContent = theme === "dark" ? "LIGHT" : "DARK";
    toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  }

  setToggleLabel(getCurrentTheme());

  toggle.addEventListener("click", function () {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setToggleLabel(nextTheme);
  });
})();
