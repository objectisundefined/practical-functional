var { List } = require('immutable-ext')

var Suc =
  x =>
    ({
      x,
      concat: other =>
        other.msg ? other : Suc(x)
    })

var Fail =
  msg =>
    ({
      msg,
      concat: other =>
        other.msg ? Fail(msg.concat(other.msg)) : Fail(msg)
    })

var Validation =
  (f, msg) =>
    ({
      f,
      msg,
      run: x =>
        f(x) ? Suc(x) : Fail(msg),
      concat: other =>
        Validation(x => f(x) && other.f(x), other.msg.concat(msg))
    })

var notNull = Validation(x => x, ['can\'t be null'])
var allDigits = Validation(x => x.match(/^\d+$/ig), ['must be digits'])
// var hasLength = n => Validation(x => x.length >= n, ['must have length ' + n])
// var isEmail = Validation(x => x.match(/@/ig), ['must look like email'])

var isPhone = notNull.concat(allDigits)

var email = '2.34'

var res = List.of(isPhone).foldMap(v => v.run(email), Suc(email))

console.log(res)
