(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) {
    return;
  }

  function getCurrentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function setToggleState(theme) {
    toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  }

  setToggleState(getCurrentTheme());

  toggle.addEventListener("click", function () {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setToggleState(nextTheme);
  });
})();
