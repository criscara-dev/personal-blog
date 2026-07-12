const pluginRss = require("@11ty/eleventy-plugin-rss").default;

module.exports = function (eleventyConfig) {
  const allowedCategories = ["tech", "practice", "art", "other"];

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({
    "node_modules/mermaid/dist/mermaid.min.js": "assets/js/mermaid.min.js",
  });

  eleventyConfig.amendLibrary("md", function (mdLib) {
    const defaultFence = mdLib.renderer.rules.fence;

    mdLib.renderer.rules.fence = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      const info = token.info ? token.info.trim() : "";

      if (info === "mermaid") {
        return `<pre class="mermaid">${token.content.trim()}\n</pre>\n`;
      }

      return defaultFence(tokens, idx, options, env, self);
    };
  });

  eleventyConfig.addPreprocessor("drafts", "md", function (data) {
    if (data.draft) {
      return false;
    }
  });

  eleventyConfig.addCollection("chronologicalPosts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").filter(function (post) {
      return !post.data.draft;
    }).map(function (post) {
      const category = post.data.category;

      if (Array.isArray(category) || !allowedCategories.includes(category)) {
        throw new Error(
          `Post "${post.inputPath}" must define one category: ${allowedCategories.join(", ")}.`,
        );
      }

      return post;
    }).sort(function (a, b) {
      return b.date - a.date;
    });
  });

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

  eleventyConfig.addFilter("readableDate", function (date) {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  });

  eleventyConfig.addFilter("htmlDateString", function (date) {
    return date.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("categoryPosts", function (posts, category) {
    return posts.filter(function (post) {
      return post.data.category === category;
    });
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
