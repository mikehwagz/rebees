module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/images')

  eleventyConfig.addShortcode(
    'pageTitle',
    (title, tag = `h2`) =>
      `<${tag} class="serif f58 lh112 pb25 mb40 bb bc-slate">${title}</${tag}>`,
  )

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'woff', 'woff2'],
    htmlTemplateEngine: 'njk',
  }
}
