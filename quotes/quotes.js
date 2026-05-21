(async () => {
  const card = document.getElementById("quote-card");
  const controls = document.getElementById("qc-controls");
  const textEl = document.getElementById("qc-text");
  const authorEl = document.getElementById("qc-author");
  const metaEl = document.getElementById("qc-meta");
  const numberEl = document.getElementById("qc-number");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnRandom = document.getElementById("btn-random");

  let quotes = [];
  let index = 0;

  try {
    const res = await fetch("./quotes.json", { cache: "no-cache" });
    const data = await res.json();
    quotes = data.list || [];
  } catch (e) {
    textEl.textContent = "couldn't load quotes.json. how embarrassing.";
    card.hidden = false;
    return;
  }

  if (quotes.length === 0) {
    textEl.textContent = "no quotes here yet. check back later.";
    authorEl.textContent = "";
    {
      const t = numberEl.querySelector("text");
      if (t) t.textContent = "—";
    }
    [btnPrev, btnNext, btnRandom].forEach((b) => (b.disabled = true));
    card.hidden = false;
    controls.hidden = false;
    return;
  }

  const parseHash = () => {
    const n = parseInt((location.hash || "").slice(1), 10);
    return Number.isFinite(n) && n >= 1 && n <= quotes.length ? n - 1 : 0;
  };

  const pad = (n) => String(n).padStart(3, "0");

  // Per-quote background colors. Hue walks the color wheel via the golden
  // angle (137.508°), guaranteeing visually distinct neighbours for as many
  // quotes as you throw at it. Saturation + lightness also vary slightly per
  // index for extra texture. Override on a single quote with `color: <hue>`
  // in quotes.json (a 0-360 number).
  const GOLDEN_ANGLE = 137.508;
  const SAT_STEPS = [50, 58, 62, 54];
  const LIGHT_STEPS = [84, 86, 82, 87];

  const paintForQuote = (q, i) => {
    const h =
      typeof q.color === "number"
        ? ((q.color % 360) + 360) % 360
        : (i * GOLDEN_ANGLE) % 360;
    const s = SAT_STEPS[i % SAT_STEPS.length];
    const l = LIGHT_STEPS[i % LIGHT_STEPS.length];
    const body = document.body;
    body.style.setProperty("--quote-bg-light", `hsl(${h}, ${s}%, ${l}%)`);
    body.style.setProperty(
      "--quote-rule-light",
      `hsl(${h}, ${Math.max(s - 25, 25)}%, ${l - 22}%)`
    );
    body.style.setProperty("--quote-bg-dark", `hsl(${h}, ${Math.max(s - 30, 18)}%, 12%)`);
    body.style.setProperty(
      "--quote-rule-dark",
      `hsl(${h}, ${Math.max(s - 35, 15)}%, 28%)`
    );
  };

  const setMeta = (q) => {
    metaEl.textContent = "";
    if (q.work) {
      const w = document.createElement("div");
      w.textContent = q.work;
      metaEl.appendChild(w);
    }
    const dateText = q.date || (q.year != null ? String(q.year) : "");
    if (dateText) {
      const d = document.createElement("div");
      d.textContent = dateText;
      metaEl.appendChild(d);
    }
  };

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let swapTimer = null;

  const apply = (i, updateHash) => {
    index = ((i % quotes.length) + quotes.length) % quotes.length;
    const q = quotes[index];
    textEl.textContent = q.text;
    authorEl.textContent = q.author || q.source || "—";
    setMeta(q);
    {
      const t = numberEl.querySelector("text");
      if (t) t.textContent = pad(index + 1);
    }
    paintForQuote(q, index);
    if (updateHash) {
      history.replaceState(null, "", `#${index + 1}`);
    }
    const single = quotes.length < 2;
    btnPrev.disabled = single;
    btnNext.disabled = single;
    btnRandom.disabled = single;
  };

  // Flip between quotes with a quick crossfade: fade the contents out, swap,
  // fade back in. Reduced-motion users (and the first paint) get it instantly.
  const render = (i, { updateHash = true, animate = true } = {}) => {
    if (!animate || prefersReduced) {
      apply(i, updateHash);
      return;
    }
    if (swapTimer) clearTimeout(swapTimer);
    card.classList.add("qc-out");
    swapTimer = setTimeout(() => {
      apply(i, updateHash);
      card.classList.remove("qc-out");
      swapTimer = null;
    }, 150);
  };

  const random = () => {
    if (quotes.length < 2) return render(0);
    let next;
    do {
      next = Math.floor(Math.random() * quotes.length);
    } while (next === index);
    render(next);
  };

  btnPrev.addEventListener("click", () => render(index - 1));
  btnNext.addEventListener("click", () => render(index + 1));
  btnRandom.addEventListener("click", random);
  window.addEventListener("hashchange", () =>
    render(parseHash(), { updateHash: false })
  );
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      render(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      render(index + 1);
    } else if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      random();
    }
  });

  // The whole card is a control: click / tap to advance, swipe to navigate.
  let suppressClick = false;
  card.addEventListener("click", () => {
    if (suppressClick || quotes.length < 2) return;
    if (window.getSelection && String(window.getSelection())) return;
    render(index + 1);
  });

  let touchX = null;
  let touchY = null;
  card.addEventListener(
    "touchstart",
    (e) => {
      const t = e.changedTouches[0];
      touchX = t.clientX;
      touchY = t.clientY;
    },
    { passive: true }
  );
  card.addEventListener(
    "touchend",
    (e) => {
      if (touchX === null || quotes.length < 2) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchX;
      const dy = t.clientY - touchY;
      touchX = touchY = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        suppressClick = true;
        setTimeout(() => (suppressClick = false), 350);
        render(dx < 0 ? index + 1 : index - 1);
      }
    },
    { passive: true }
  );

  card.hidden = false;
  controls.hidden = false;
  render(parseHash(), { updateHash: false, animate: false });
})();
