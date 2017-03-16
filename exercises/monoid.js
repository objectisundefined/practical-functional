var assert = require('assert')
var { List } = require('immutable-ext')

var Sum =
  x =>
    ({
      x: x,
      concat: o => Sum(x + o.x),
      inspect: () => `Sum(${x})`
    })

Sum.empty = () => Sum(0)

var Product =
  x =>
    ({
      x: x,
      concat: ({ x: x1 }) => Product(x * x1),
      inspect: () => `Product(${x})`
    })

Product.empty = () => Product(1)

var Any =
  x =>
    ({
      x: x,
      concat: o => Any(x || o.x),
      inspect: () => `Any(${x})`
    })

Any.empty = () => Any(false)

/*
var sum =
  xs =>
    List(xs)
      .reduce((acc, x) => acc + x, 0)

assert.equal(sum([1, 2, 3]), 6)
*/

/*
var sum =
  xs =>
    List(xs)
      .reduce((acc, x) => acc.concat(Sum(x)), Sum.empty())
*/

/*
var sum =
  xs =>
    List(xs)
      .map(Sum)
      .reduce((acc, x) => acc.concat(x), Sum.empty())
*/

var sum =
  xs =>
    List(xs)
      .foldMap(Sum, Sum.empty())

// what foldMap do is just like top

assert.equal(sum([1, 2, 3]).inspect(), 'Sum(6)')

/*
var anyLessThanZero =
  xs =>
    List(xs)
      .reduce((acc, x) => acc || x < 0, false)

assert.equal(anyLessThanZero([-2, 0, 4]), true)
assert.equal(anyLessThanZero([2, 0, 4]), false)
*/

/*
var anyLessThanZero =
  xs =>
    List(xs)
      .reduce((acc, x) => acc.concat(Any(x < 0)), Any.empty())
*/

var anyLessThanZero =
  xs =>
    List(xs).foldMap(x => Any(x < 0), Any.empty())

assert.equal(anyLessThanZero([-2, 0, 4]).inspect(), 'Any(true)')
assert.equal(anyLessThanZero([2, 0, 4]).inspect(), 'Any(false)')

/*
var max =
  xs =>
    List(xs)
      .reduce((acc, x) => acc > x ? acc : x, -Infinity)

assert.equal(max([-2, 0, 4]), 4)
assert.equal(max([12, 0, 4]), 12)
*/

var Max =
  x =>
    ({
      x: x,
      concat: ({ x: x1 }) => Max(x > x1 ? x : x1),
      inspect: () => `Max(${x})`
    })

Max.empty = () => Max(-Infinity)

/*
var max =
  xs =>
    List(xs)
      .reduce((acc, x) => acc.concat(Max(x)), Max.empty())
*/

var max =
  xs =>
    List(xs).foldMap(Max, Max.empty())

assert.equal(max([-2, 0, 4]).inspect(), 'Max(4)')
assert.equal(max([12, 0, 4]).inspect(), 'Max(12)')

var Tuple =
  (_1, _2) =>
    ({
      _1,
      _2,
      concat: ({ _1: x, _2: y }) => Tuple(_1.concat(x), _2.concat(y))
    })

var t1 = Tuple(Sum(1), Product(2))
var t2 = Tuple(Sum(5), Product(2))
var t3 = t1.concat(t2)

assert.equal(t3._1.inspect(), 'Sum(6)')
assert.equal(t3._2.inspect(), 'Product(4)')
