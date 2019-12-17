class CustomPurgecssExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g)
  }
}

module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.njk', './src/**/*.js', '.eleventy.js'],
      whitelistPatterns: [/^is-/],
      extractors: [
        {
          extractor: CustomPurgecssExtractor,
          extensions: ['njk', 'js'],
        },
      ],
    }),
    require('autoprefixer')({
      grid: 'autoplace',
      overrideBrowserslist: ['>1%'],
    }),
    require('cssnano')({ preset: 'advanced' }),
  ],
}
