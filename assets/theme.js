(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  if (!button) return;
  var icon = button.querySelector("i");
  var media = matchMedia("(prefers-color-scheme: dark)");
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function stored() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute("data-bs-theme", theme);
    var next = theme === "dark" ? "light" : "dark";
    icon.className = theme === "dark" ? "bi bi-moon-stars" : "bi bi-sun";
    button.setAttribute("aria-label", "Switch to " + next + " mode");
    button.title = "Switch to " + next + " mode";
    if (themeColor) {
      themeColor.content = getComputedStyle(root).getPropertyValue("--frame").trim();
    }
  }

  apply(root.getAttribute("data-bs-theme") || "light");

  button.addEventListener("click", function () {
    var theme = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    apply(theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
  });

  media.addEventListener("change", function (e) {
    var s = stored();
    if (s !== "light" && s !== "dark") apply(e.matches ? "dark" : "light");
  });
})();
