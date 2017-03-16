var Box = require('../box')

var first =
  xs =>
    xs[0]

/*
var halfTheFirstLargeNumber =
  xs => {
    var found = xs.filter(x => x >= 20)
    var answer = first(found) / 2

    return `The answer is ${answer}`
  }
*/

var halfTheFirstLargeNumber =
  xs =>
    Box(xs)
      .map(arr => arr.filter(x => x >= 20))
      .map(first)
      .map(v => v / 2)
      .fold(v => `The answer is ${v}`)

/*
var halfTheFirstLargeNumber =
  xs => {
    var answer = Math.max.apply(null, xs) / 2

    return `The answer is ${answer}`
  }
*/

const res = halfTheFirstLargeNumber([1, 4, 50])

console.log(res)

