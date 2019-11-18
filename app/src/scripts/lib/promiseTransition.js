import Highway from '@dogstudio/highway'

class PromiseTransition extends Highway.Transition {
  constructor(...props) {
    super(...props)
  }

  in({ done, ...rest }) {
    return this._in(rest).then(() => done())
  }

  out({ done, ...rest }) {
    return this._out(rest).then(() => done())
  }
}

export default PromiseTransition
