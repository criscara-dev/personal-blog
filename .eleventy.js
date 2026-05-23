module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("postPermalink", function (date, slug) {
    const postDate = new Date(date);
    const year = postDate.getUTCFullYear();
    const month = String(postDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(postDate.getUTCDate()).padStart(2, "0");

    return `/${year}/${month}/${day}/${slug}/`;
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
