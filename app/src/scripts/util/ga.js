export function trackPageview() {
  if (
    process.env.NODE_ENV === 'production' &&
    window.location.origin === process.env.PRODUCTION_URL &&
    typeof ga === 'function'
  ) {
    let path = window.location.pathname
    let page =
      path.split('').pop() === '/' && path.length > 1 ? path.slice(0, -1) : path
    ga('send', 'pageview', page)
  }
}
