var { Right, fromNullable } = require('../either')

var { List } = require('immutable-ext')

var Sum =
  x =>
    ({
      x,
      concat: ({ x: y }) => Sum(x + y),
      inspect: () => `Sum(${x && x.inspect ? x.inspect() : x})`
    })

var stats =
  List.of(
    {
      page: 'Home',
      views: 40
    },
    {
      page: 'About',
      views: 10
    },
    {
      page: 'Blog',
      views: null
    }
  )

/*
var derived = {
  fold: function (empty) {
    return this.reduce((acc, x) => acc.concat(x), empty)
  },
  foldMap: function (f, empty) {
    return this.map(f).fold(empty)
  },
  sequence: function (point) {
    return this.traverse(point, x => x)
  }
}

List.prototype.fold = derived.fold
List.prototype.foldMap = derived.foldMap
*/

// stats.foldMap(x => fromNullable(x.views).map(Sum), Right(Sum(0))) -> Error

var eitherSumfoldMap =
  (f, empty) =>
    arr =>
      arr.map(f).reduce((acc, x) => acc.map(v => x.fold(_ => v, a => v.concat(a))), empty)

console.log(eitherSumfoldMap(x => fromNullable(x.views).map(Sum), Right(Sum(0)))(stats).chain(v => v))

/*
console.log(stats.map(x => fromNullable(x.views).map(Sum)).reduce((acc, x) => {
  // Right(Sum(0)), Right(Sum(40)) -> Right(Sum(40))
  // Right(Sum(40)), Right(Sum(10)) -> Right(Sum(50))
  // Right(Sum(50)) -> Left(null)

  // return x.fold(_ => acc, v => acc.map(s => s.concat(v)))

  return acc.map(v => v.concat(x.fold(_ => Sum(0), v => v)))

  // return acc.map(v => x.fold(v => v, v => v + x))
}, Right(Sum(0))).chain(v => v))
*/

// console.log(stats.foldMap(x => fromNullable(x.views).fold(_ => Sum(0), Sum), Sum(0)))
