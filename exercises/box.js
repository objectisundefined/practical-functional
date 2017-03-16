var assert = require('assert')

var Box =
  x =>
    ({
      map: f => Box(f(x)),
      fold: f => f(x),
      inspect: () => `Box(${x})`
    })

/*
var moneyToFloat =
  str =>
    parseFloat(str.replace(/\$/, ''))
*/

var replace =
  (match, target) =>
    str =>
      str.replace(match, target)

var moneyToFloat =
  str =>
    Box(str)
      .map(replace(/\$/, ''))
      .fold(parseFloat)

assert.equal(String(moneyToFloat('$5.00')), 5)

/*
var percentToFloat =
  str => {
    var float = parseFloat(str.replace(/%/, ''))
    return float * 0.0100
  }
*/

var percentToFloat =
  str =>
    Box(str)
      .map(replace(/%/, ''))
      .fold(x => x * 0.0100)

assert.equal(String(percentToFloat('20%')), 0.2)

/*
var applyDiscount =
  (price, discount) => {
    var cents = moneyToFloat(price)
    var savings = percentToFloat(discount)

    return cents * (1 - savings)
  }
*/

/*
var applyDiscount =
  (price, discount) =>
    Box(price)
      .map(moneyToFloat)
      .fold(
        v =>
          v * (
            Box(discount)
              .map(percentToFloat)
              .fold(v => 1 - v)
          )
      )
*/

/*
var applyDiscount =
  (price, discount) =>
    Box(price)
      .map(moneyToFloat)
      .fold(
        v =>
          v * (
            1 - (
              Box(discount)
                .fold(percentToFloat)
            )
          )
      )
*/

/*
var applyDiscount =
  (price, discount) =>
    Box(moneyToFloat(price))
      .fold(cents =>
        Box(percentToFloat(discount))
          .fold(savings =>
            cents * (1 - savings)
          )
      )
*/

var applyDiscount =
  (price, discount) =>
    Box(price)
      .map(moneyToFloat)
        .fold(cents =>
          Box(discount)
            .map(percentToFloat)
            .fold(savings =>
              cents * (1 - savings)
            )
        )

assert.equal(String(applyDiscount('$5.00', '20%')), 4)
