(function () {
  const diagrams = document.querySelectorAll("pre.mermaid");

  if (!diagrams.length || typeof mermaid === "undefined") {
    return;
  }

  const theme =
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "neutral";

  mermaid.initialize({
    startOnLoad: false,
    theme: theme,
    securityLevel: "strict",
  });

  mermaid.run({ nodes: diagrams });
})();
