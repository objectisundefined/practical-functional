var { List } = require('immutable-ext')

var Sum =
  x =>
    ({
      x,
      concat: ({ x: y }) => Sum(x + y),
      inspect: () => `Sum(${x})`
    })

Sum.empty = () => Sum(0)

var All =
  x =>
    ({
      x,
      concat: ({ x: y }) => All(x && y),
      inspect: () => `All(${x})`
    })

var First =
  x =>
    ({
      x,
      concat: _ => First(x),
      inspect: () => `First(${x})`
    })

/*
var acct1 = {
  name: 'Nico',
  isPaid: true,
  points: 10,
  friends: ['Franklin']
}

var acct2 = {
  name: 'Nico',
  isPaid: false,
  points: 2,
  friends: ['Gatsby']
}
*/

console.log(Sum(1).concat(Sum(2)))

console.log(All(true).concat(Sum(false)))

console.log(First(1).concat().x)

var res = List.of(1, 2, 3, 4).foldMap(Sum, Sum.empty())

console.log(res)
