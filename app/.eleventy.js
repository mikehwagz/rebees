module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/images')

  eleventyConfig.addShortcode(
    'pageTitle',
    (title, color = 'slate', tag = `h2`) =>
      `<${tag} class="serif f58 lh112 pt130 pb25 ${color} bb bc-${color}">${title}</${tag}>`,
  )

  eleventyConfig.addShortcode(
    'debug',
    (value = `h2`) =>
      `<pre class="pv100">${JSON.stringify(value, null, 2)}</pre>`,
  )

  eleventyConfig.addFilter('split', (x, ch) => {
    return x ? x.split(ch) : ''
  })

  eleventyConfig.addFilter('find', (arr, key, val) => {
    return arr.find((item) => item[key] === val)
  })

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'woff', 'woff2'],
    htmlTemplateEngine: 'njk',
  }
}
