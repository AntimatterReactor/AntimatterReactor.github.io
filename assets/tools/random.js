// Unbiased random helpers on crypto.getRandomValues.
window.AcrossRandom = (function () {
  var buf = new Uint32Array(1);
  var SPAN = 4294967296;

  // Integer in [min, max], inclusive. Range up to 2^32.
  function int(min, max) {
    var range = max - min + 1;
    if (!(range >= 1) || range > SPAN) throw new RangeError("Range too large");
    var limit = SPAN - (SPAN % range);
    var x;
    do {
      crypto.getRandomValues(buf);
      x = buf[0];
    } while (x >= limit);
    return min + (x % range);
  }

  // Fisher–Yates, returns a new array.
  function shuffle(items) {
    var a = items.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = int(0, i);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // `count` distinct integers in [min, max].
  function uniqueInts(min, max, count) {
    var range = max - min + 1;
    if (count > range) throw new RangeError("Not enough distinct values");
    if (count * 2 > range && range <= 1e6) {
      var all = [];
      for (var v = min; v <= max; v++) all.push(v);
      for (var i = 0; i < count; i++) {
        var j = int(i, all.length - 1);
        var t = all[i]; all[i] = all[j]; all[j] = t;
      }
      return all.slice(0, count);
    }
    var seen = new Set();
    var out = [];
    while (out.length < count) {
      var n = int(min, max);
      if (!seen.has(n)) { seen.add(n); out.push(n); }
    }
    return out;
  }

  return { int: int, shuffle: shuffle, uniqueInts: uniqueInts };
})();
