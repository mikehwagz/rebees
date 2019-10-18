import { component } from '@/lib/picoapp'

export default component((node) => {
  let children = Array.from(node.children)
  let peopleEls = children.slice(0, -1)
  let ctaEl = last(children)
  let shuffledPeopleEls = shuffle(peopleEls)

  clearChildren(node)

  shuffledPeopleEls.concat(ctaEl).forEach((el) => node.append(el))
})

function clearChildren(node) {
  while (node.firstChild) node.removeChild(node.firstChild)
}

function last(arr) {
  let { length: l, [l - 1]: last } = arr
  return last
}

function shuffle(arr) {
  let array = [...arr]

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}
