export default {
  layout: "post.njk",
  permalink: "/writing/{{ page.fileSlug }}/",
  pageType: "article",
  eleventyComputed: {
    pageTitle: (data) => data.title,
    pageDescription: (data) => data.description || data.excerpt,
  },
};
