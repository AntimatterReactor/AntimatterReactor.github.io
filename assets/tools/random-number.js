(function () {
  var R = window.AcrossRandom;
  var form = document.getElementById("rng-form");
  var out = document.getElementById("rng-out");
  var err = document.getElementById("rng-error");
  var $ = function (id) { return document.getElementById(id); };

  function fail(msg) { err.textContent = msg; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    err.textContent = "";
    var min = parseFloat($("rng-min").value);
    var max = parseFloat($("rng-max").value);
    var count = parseInt($("rng-count").value, 10);
    var d = parseInt($("rng-decimals").value, 10);
    var unique = $("rng-unique").checked;

    if (isNaN(min) || isNaN(max)) return fail("Enter both ends of the range.");
    if (min > max) { var t = min; min = max; max = t; }
    if (!(count >= 1 && count <= 1000)) return fail("How many must be between 1 and 1000.");

    var scale = Math.pow(10, d);
    var lo = Math.ceil(min * scale - 1e-9);
    var hi = Math.floor(max * scale + 1e-9);
    if (lo > hi) return fail("No " + (d ? "values with " + d + " decimal places" : "whole numbers") + " fit in that range.");
    if (hi - lo + 1 > 4294967296) return fail("Range too large. Narrow it or use fewer decimal places.");
    if (unique && count > hi - lo + 1) return fail("Only " + (hi - lo + 1) + " distinct values fit in that range.");

    var ints;
    if (unique) {
      ints = R.uniqueInts(lo, hi, count);
    } else {
      ints = [];
      for (var i = 0; i < count; i++) ints.push(R.int(lo, hi));
    }
    var text = ints.map(function (n) { return (n / scale).toFixed(d); });
    out.textContent = text.join(count > 1 ? ", " : "");
    out.classList.toggle("readout-many", count > 1);
  });
})();
