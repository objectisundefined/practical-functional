var Right =
  x =>
    ({
      chain: f => f(x),
      map: f => Right(f(x)),
      fold: (f, g) => g(x),
      inspect: () => `Right(${x})`
    })

var Left =
  x =>
    ({
      chain: f => Left(x),
      map: f => Left(x),
      fold: (f, g) => f(x),
      inspect: () => `Left(${x})`
    })

/*
var fromNullable =
  x =>
    x != null ? Right(x) : Left(null)
*/

/*
var getPort =
  () => {
    try {
      var str = json
      var obj = JSON.parse(str)

      return obj.port
    } catch (e) {
      return 3000
    }
  }
*/

var tryCatch =
  f => {
    try {
      return Right(f())
    } catch (e) {
      return Left(e)
    }
  }

var fs = require('fs')

/*
var getPort =
  () =>
    tryCatch(() => fs.readFileSync('./sample.txt', 'utf-8'))
      .chain(str => tryCatch(() => JSON.parse(str)))
      .fold(e => 3000,
        v => v.port)
*/

var getPort =
  () =>
    tryCatch(() =>
      JSON.parse(fs.readFileSync('./sample.txt', 'utf-8'))
    )
    .fold(_ => 3000,
      v => v.port)

var res = getPort()

console.log(res)
