var Sum =
  x =>
    ({
      x,
      concat: ({ x: x1 }) => Sum(x + x1),
      inspect: () => `Sum(${x})`
    })

Sum.empty = () => Sum(0)

var Product =
  x =>
   ({
     x,
     concat: ({ x: y }) => Sum(x * y),
     inspect: () => `Product(${x})`
   })

Product.empty = () => Product(1)

var Any =
  x =>
    ({
      x,
      concat: ({ x: x1 }) => Any(x || x1),
      inspect: () => `Any(${x})`
    })

Any.empty = () => Any(false)

var All =
  x =>
    ({
      x,
      concat: ({ x: x1 }) => All(x && x1),
      inspect: () => `All(${x})`
    })

All.empty = () => All(true)

var Max =
  x =>
    ({
      x,
      concat: ({ x: x1 }) => Max(x > x1 ? x : x1),
      inspect: () => `Max(${x})`
    })

Max.empty = () => Max(-Infinity)

var Min =
  x =>
    ({
      x,
      concat: ({ x: x1 }) => Min(x < x1 ? x : x1),
      inspect: () => `Min(${x})`
    })

Min.empty = () => Min(Infinity)

var Pair =
  (x, y) =>
    ({
      x,
      y,
      concat: ({ x: x1, y: y1 }) => Pair(x.concat(x1), y.concat(y1)),
      inspect: () => `Pair(${x}, ${y})`
    })

var Fn =
  f =>
    ({
      fold: f,
      concat: o => Fn(x => f(x).concat(o.fold(x))),
      inspect: () => `Fn(${f})`
    })

/*
var p0 = Pair(Sum(1), Sum(2))

var p1 = Pair(Sum(1), Sum(2))

var p2 = p0.concat(p1)

console.log(p2.x, p2.y)
*/

/*
var c = Fn(x => Sum(x)).concat(Fn(x => Product(x + 1)))

Sum(x).concat((x => Product(x + 1))(x))

x => Sum(x).concat(Product(x + 1))

x => Sum(x, x + 1)

x => { x: 2 * x + 1, concat, inspect }

console.log(c, c.fold(2))
*/

module.exports = {
  Sum,
  Product,
  Max,
  Min,
  Any,
  All,
  Pair,
  Fn
}
