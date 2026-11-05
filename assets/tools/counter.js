(function () {
  var text = document.getElementById("count-text");
  var $ = function (id) { return document.getElementById(id); };
  var seg = window.Intl && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
  var wordSeg = window.Intl && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: "word" }) : null;

  function graphemes(s) {
    if (!seg) return Array.from(s).length;
    var n = 0;
    for (var _ of seg.segment(s)) n++;
    return n;
  }

  function words(s) {
    if (!wordSeg) return (s.match(/\S+/g) || []).length;
    var n = 0;
    for (var w of wordSeg.segment(s)) if (w.isWordLike) n++;
    return n;
  }

  function update() {
    var s = text.value;
    var lines = s.split("\n").filter(function (l) { return l.trim(); });
    var stanzas = s.split(/\n\s*\n/).filter(function (b) { return b.trim(); });
    $("c-words").textContent = words(s);
    $("c-chars").textContent = graphemes(s);
    $("c-nospace").textContent = graphemes(s.replace(/\s+/g, ""));
    $("c-lines").textContent = lines.length;
    $("c-stanzas").textContent = stanzas.length;
  }

  text.addEventListener("input", update);
  update();
})();
