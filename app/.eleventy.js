module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/images')

  eleventyConfig.addShortcode(
    'pageTitle',
    (title, tag = `h2`) =>
      `<${tag} class="serif f58 lh112 pt130 pb25 mb40 bb bc-slate">${title}</${tag}>`,
  )

  eleventyConfig.addShortcode(
    'debug',
    (value = `h2`) =>
      `<pre class="pv100">${JSON.stringify(value, null, 2)}</pre>`,
  )

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'woff', 'woff2'],
    htmlTemplateEngine: 'njk',
  }
}
