var Either = require('../either')

var $ =
  selector =>
    Either.of({
      selector,
      height: 10
    })

var getScreenSize =
  (screen, head, foot) =>
    screen - (head.height + foot.height)

var head = $('head')
var foot = $('foot')

var wrap =
  e =>
    e.chain(x => ({ height: x.height }))

var screen = 1080

console.log(wrap(head))

var s = getScreenSize(screen, wrap(head), wrap(foot))

console.log(s)
