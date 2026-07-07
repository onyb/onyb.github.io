// Cycles the small "now" verb under the homepage headline (a nod to Claude
// Code's spinner). The initial verb is picked at random on load (the markup
// ships verbs[0] as a no-JS fallback), and every 2.2s it swaps in another
// random verb — no back-to-back repeats. Under prefers-reduced-motion it skips
// the cycling but still shows a random verb rather than the fixed fallback.
//
// The word list is NOT defined here. It lives in src/_data/verbs.json — the
// canonical 187-word Claude Code spinner set, taken verbatim from
// https://deepakness.com/raw/claude-spinner-verbs/. To change the verbs, edit
// that JSON file. Eleventy injects it into the page as a JSON <script> block
// (id="verb-list"); this script just reads and cycles it.
(function () {
  var el = document.getElementById("ani-verb");
  var data = document.getElementById("verb-list");
  if (!el || !data) return;

  var verbs;
  try { verbs = JSON.parse(data.textContent); } catch (e) { return; }
  if (!verbs.length) return;

  var i = Math.floor(Math.random() * verbs.length);
  el.textContent = verbs[i];

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  setInterval(function () {
    var n;
    do { n = Math.floor(Math.random() * verbs.length); } while (verbs.length > 1 && n === i);
    i = n;
    el.textContent = verbs[i];
  }, 2200);
})();
