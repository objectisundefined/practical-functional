var { Right, Left } = require('data.either')
var { List } = require('immutable-ext')

var First =
  x =>
    ({
      fold: f => x.fold(f, f),
      concat: o => x.isLeft ? o : First(x)
    })

First.empty = First(Left())

var find =
  (xs, f) =>
    List(xs)
      .foldMap(x => First(f(x) ? Right(x) : Left()), First.empty)
      .fold(x => x)

var pluralize =
  (word, count) =>
    count > 1 ? `${word}s` : word

module.exports = { find, pluralize }
