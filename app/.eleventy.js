module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy({ 'src/scripts/sw.js': '/sw.js' })

  eleventyConfig.addShortcode(
    'pageTitle',
    (title, color = 'slate', tag = `h2`) =>
      `<${tag} class="serif f30 s:f46 l:f58 lh106 l:lh112 pt110 s:pt120 l:pt130 pb15 s:pb20 l:pb25 ${color} bc-${color} rel a-title">
        ${title}
        <span class="rule abs bottom fill-x bg-${color} db a-rule"></span>
      </${tag}>`,
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
    templateFormats: ['njk'],
    htmlTemplateEngine: 'njk',
  }
}
