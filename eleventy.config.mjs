// Per-quote colour palette. Mirror of paintForQuote() in
// src/quotes/quotes.js — keep the two in sync. (No bundler here, so the
// algorithm necessarily lives in both the build and the browser.)
const QUOTE_GOLDEN_ANGLE = 137.508;
const QUOTE_SAT_STEPS = [50, 58, 62, 54];
const QUOTE_LIGHT_STEPS = [84, 86, 82, 87];

const quoteColorVars = (quote, i) => {
  const h =
    typeof quote.color === "number"
      ? ((quote.color % 360) + 360) % 360
      : (i * QUOTE_GOLDEN_ANGLE) % 360;
  const s = QUOTE_SAT_STEPS[i % QUOTE_SAT_STEPS.length];
  const l = QUOTE_LIGHT_STEPS[i % QUOTE_LIGHT_STEPS.length];
  return [
    `--quote-bg-light: hsl(${h}, ${s}%, ${l}%)`,
    `--quote-rule-light: hsl(${h}, ${Math.max(s - 25, 25)}%, ${l - 22}%)`,
    `--quote-bg-dark: hsl(${h}, ${Math.max(s - 30, 18)}%, 12%)`,
    `--quote-rule-dark: hsl(${h}, ${Math.max(s - 35, 15)}%, 28%)`,
  ].join("; ");
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/favicons": "/" });
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/quotes/quotes.js");
  eleventyConfig.addPassthroughCopy({ "src/_data/quotes.json": "quotes/quotes.json" });

  eleventyConfig.addFilter("byYearDesc", (items) => {
    const groups = new Map();
    for (const item of items) {
      const year = String(item.date).slice(0, 4);
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(item);
    }
    return [...groups.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([year, list]) => ({
        year,
        list: list.slice().sort((a, b) => b.date.localeCompare(a.date)),
      }));
  });

  eleventyConfig.addFilter("date", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toISOString().slice(0, 10);
  });

  // Inline CSS custom properties for a quote's colour, used to bake the first
  // quote's hue onto <body> at build time so the page paints the right colour
  // immediately — no #f0e0a0 fallback flash (incl. the iOS status-bar tint)
  // before quotes.js fetches the data and runs paintForQuote().
  eleventyConfig.addFilter("quoteColorVars", quoteColorVars);

  // Capitalize the first letter only, leaving the rest untouched. Section
  // titles are lowercase by design ("talks"); post titles are already
  // proper-cased, so this is a no-op for them.
  eleventyConfig.addFilter("titleCap", (s) =>
    typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : s
  );

  eleventyConfig.addFilter("host", (url) => {
    try {
      return new URL(url).host.replace(/^www\./, "");
    } catch {
      return url;
    }
  });

  eleventyConfig.on("eleventy.before", async ({ dir }) => {
    const path = await import("node:path");
    const fs = await import("node:fs/promises");
    const file = path.join(dir.input, "_data", "writings.json");
    const raw = JSON.parse(await fs.readFile(file, "utf8"));
    for (const [i, w] of raw.list.entries()) {
      const hasExt = typeof w.external === "string" && w.external.length > 0;
      const hasSlug = typeof w.slug === "string" && w.slug.length > 0;
      if (hasExt === hasSlug) {
        throw new Error(
          `writings.json entry ${i} ("${w.title}") must have exactly one of {external, slug}; got external=${hasExt}, slug=${hasSlug}`
        );
      }
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
