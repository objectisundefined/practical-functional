/*
var nextCharForNumberString =
  str => {
    var trimmed = str.trim()
    var number = parseInt(trimmed)
    var nextNumber = number + 1

    return String.fromCharCode(nextNumber)
  }
*/

var Box = require('../box')

var nextCharForNumberString =
  str =>
    Box(str)
      .map(x => x.trim())
      .map(Number)
      .map(x => x + 1)
      .fold(String.fromCharCode)

var res = nextCharForNumberString('   64 ')

console.log(res)

