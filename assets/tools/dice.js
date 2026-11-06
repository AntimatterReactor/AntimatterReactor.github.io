(function () {
  var R = window.AcrossRandom;
  var form = document.getElementById("dice-form");
  var input = document.getElementById("dice-input");
  var out = document.getElementById("dice-out");
  var detail = document.getElementById("dice-detail");
  var err = document.getElementById("dice-error");
  var history = document.getElementById("dice-history");
  var historyHeading = document.getElementById("dice-history-heading");

  function parse(src) {
    var s = src.replace(/\s+/g, "").replace(/−/g, "-").toLowerCase();
    if (!s) throw new Error("Enter dice to roll, like 2d6.");
    if (!/^[+-]?(\d*d\d+|\d+)([+-](\d*d\d+|\d+))*$/.test(s)) throw new Error("Couldn't read that. Use terms like 2d6, d20, or 3, joined by + or −.");
    var terms = [];
    s.replace(/([+-]?)(\d*d\d+|\d+)/g, function (_, sign, body) {
      var neg = sign === "-";
      var m = body.match(/^(\d*)d(\d+)$/);
      if (m) {
        var n = m[1] === "" ? 1 : parseInt(m[1], 10);
        var sides = parseInt(m[2], 10);
        if (n < 1 || n > 100) throw new Error("Roll between 1 and 100 dice per term.");
        if (sides < 2 || sides > 1000) throw new Error("Dice need between 2 and 1000 sides.");
        terms.push({ neg: neg, n: n, sides: sides });
      } else {
        terms.push({ neg: neg, value: parseInt(body, 10) });
      }
    });
    return terms;
  }

  function roll(src) {
    err.textContent = "";
    var terms;
    try { terms = parse(src); } catch (e) { err.textContent = e.message; return; }
    var total = 0;
    var parts = terms.map(function (t, i) {
      var sign = t.neg ? "− " : (i ? "+ " : "");
      if (t.value !== undefined) {
        total += t.neg ? -t.value : t.value;
        return sign + t.value;
      }
      var rolls = [];
      for (var k = 0; k < t.n; k++) rolls.push(R.int(1, t.sides));
      var sum = rolls.reduce(function (a, b) { return a + b; }, 0);
      total += t.neg ? -sum : sum;
      return sign + t.n + "d" + t.sides + " [" + rolls.join(", ") + "]";
    });

    if (out.textContent) {
      var li = document.createElement("li");
      li.textContent = out.dataset.label + " = " + out.textContent;
      history.insertBefore(li, history.firstChild);
      while (history.children.length > 10) history.removeChild(history.lastChild);
      historyHeading.hidden = false;
    }
    out.textContent = total;
    out.dataset.label = src.replace(/\s+/g, "");
    detail.textContent = parts.join(" ");
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); roll(input.value); });
  document.querySelectorAll("[data-dice]").forEach(function (b) {
    b.addEventListener("click", function () { input.value = b.dataset.dice; roll(b.dataset.dice); });
  });
})();
