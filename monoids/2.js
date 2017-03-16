// var { Map, List } = require('immutable-ext')
var { Sum } = require('../monoid')

var res =
  [Sum(1), Sum(2), Sum(3)]
    .reduce((acc, x) => acc.concat(x), Sum.empty())

console.log(res)
