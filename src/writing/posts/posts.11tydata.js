export default {
  layout: "post.njk",
  permalink: "/writing/{{ page.fileSlug }}/",
  eleventyComputed: {
    pageTitle: (data) => data.title,
  },
};
