export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
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
