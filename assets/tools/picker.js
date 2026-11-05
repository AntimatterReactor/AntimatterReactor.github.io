(function () {
  var R = window.AcrossRandom;
  var form = document.getElementById("pick-form");
  var items = document.getElementById("pick-items");
  var out = document.getElementById("pick-out");
  var list = document.getElementById("pick-list");
  var err = document.getElementById("pick-error");

  function read() {
    return items.value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function run(action) {
    err.textContent = "";
    list.hidden = true;
    out.hidden = false;
    if (action === "coin") {
      out.textContent = R.int(0, 1) ? "Heads" : "Tails";
      return;
    }
    var xs = read();
    if (xs.length < 2) { err.textContent = "Add at least two items, one per line."; out.textContent = ""; return; }
    if (action === "pick") {
      out.textContent = xs[R.int(0, xs.length - 1)];
      return;
    }
    var shuffled = R.shuffle(xs);
    out.textContent = "";
    out.hidden = true;
    list.innerHTML = "";
    shuffled.forEach(function (x) {
      var li = document.createElement("li");
      li.textContent = x;
      list.appendChild(li);
    });
    list.hidden = false;
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); run("pick"); });
  form.querySelectorAll("[data-action]").forEach(function (b) {
    if (b.type === "button") b.addEventListener("click", function () { run(b.dataset.action); });
  });
})();
