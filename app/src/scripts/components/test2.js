import { component } from '../lib/picoapp'
import choozy from 'choozy'
import { on } from '../util/dom'

export default component((node, ctx) => {
  console.log('test2:mount')

  const { count, dec, inc } = choozy(node)

  let counter = parseInt(count.textContent, 10)

  let offDec = on(dec, 'click', () => {
    counter = counter - 2
    count.textContent = counter
  })

  let offInc = on(inc, 'click', () => {
    counter = counter + 2
    count.textContent = counter
  })

  return () => {
    console.log('test2:unmount')
    offDec()
    offInc()
  }
})
