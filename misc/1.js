var Box = require('../box')
var Either = require('../either')
var { List } = require('immutable-ext')
var Task = require('data.task')

Box.of = x => Box(x)
// List.of = x => List(x)

console.log(Box.of(1).map(x => x + 1))

console.log(Either.of(1).map(x => x + 1))

Task.of(1).map(x => x + 1).fork(console.error, console.log)

console.log(List.of(1, 3, 5).map(v => v + 1))

console.log(Box.of(1).chain(x => x + 1))

console.log(Either.of(1).chain(x => x + 1))

Task.of(1).chain(x => Task.of(x + 1)).fork(console.error, console.log)

// console.log(List.of(1).chain) // the same as bottom
// console.log(List.of(1).flatMap)

console.log(List.of(1).chain(x => List.of(x + 1))) // List(2)
