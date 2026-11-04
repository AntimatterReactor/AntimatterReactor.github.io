(function () {
  var data = document.getElementById("oracle-data");
  var lineEl = document.getElementById("oracle-line");
  var linkEl = document.getElementById("oracle-link");
  var button = document.getElementById("oracle-next");
  if (!data || !lineEl || !linkEl || !button) return;

  var lines;
  try { lines = JSON.parse(data.textContent); } catch (e) { return; }
  if (!lines.length) return;

  var current = -1;
  function show() {
    var i = Math.floor(Math.random() * lines.length);
    if (lines.length > 1 && i === current) i = (i + 1) % lines.length;
    current = i;
    lineEl.classList.remove("is-shown");
    void lineEl.offsetWidth;
    lineEl.textContent = lines[i].t;
    linkEl.textContent = lines[i].p;
    linkEl.href = lines[i].u;
    lineEl.classList.add("is-shown");
  }

  show();
  if (lines.length > 1) {
    button.hidden = false;
    button.addEventListener("click", show);
  }
})();
