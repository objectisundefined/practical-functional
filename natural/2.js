var { fromNullable } = require('../either')
// var Box = require('../box')
var Task = require('data.task')

var httpGet =
  (path, params) =>
    Task.of('search-result')

/*
var eitherToTask =
  e =>
    e.fold(Task.rejected, Task.of)
*/

var autoComplete =
  term =>
    fromNullable(term)
      .map(t => httpGet('/search', { term: t }))
      .fold(e => Task.of(null), x => x)

autoComplete('yo')
  .fork(
    console.error,
    x => console.log(`updated screen: ${x}`)
  )
