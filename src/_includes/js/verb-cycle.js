// Cycles the small "now" verb under the homepage headline (a nod to Claude
// Code's spinner). Every 2.2s it swaps in a random verb — no back-to-back
// repeats — and stays static when the visitor prefers reduced motion.
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
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var verbs;
  try { verbs = JSON.parse(data.textContent); } catch (e) { return; }
  if (!verbs.length) return;

  var i = 0;
  setInterval(function () {
    var n;
    do { n = Math.floor(Math.random() * verbs.length); } while (verbs.length > 1 && n === i);
    i = n;
    el.textContent = verbs[i];
  }, 2200);
})();
