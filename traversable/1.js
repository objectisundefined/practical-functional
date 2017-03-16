// var fs = require('fs')
// var Task = require('data.task')
var Either = require('../either')

// var { Right, Left, fromNullable } = Either
var { Right, Left } = Either

// var { List, Map } = require('immutable-ext')

var greaterThan5 =
  x =>
    x.length > 5 ? Right(x) : Left('not greater than 5')

var looksLikeEmail =
  x =>
    x.match(/@/ig) ? Right(x) : Left('not an email')

var email = 'blahh@yadda.com'
var res = [greaterThan5, looksLikeEmail].map(v => v(email))

console.log(res)
