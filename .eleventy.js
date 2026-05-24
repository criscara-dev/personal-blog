module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addFilter("postPermalink", function (date, slug) {
    const postDate = new Date(date);
    const year = postDate.getUTCFullYear();
    const month = String(postDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(postDate.getUTCDate()).padStart(2, "0");

    return `/${year}/${month}/${day}/${slug}/`;
  });

  eleventyConfig.addFilter("assetPath", function (assetPath, pageUrl) {
    const cleanAssetPath = assetPath.replace(/^\/+/, "");
    const pageDepth = (pageUrl || "/").split("/").filter(Boolean).length;
    const prefix = pageDepth === 0 ? "./" : "../".repeat(pageDepth);

    return `${prefix}${cleanAssetPath}`;
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
