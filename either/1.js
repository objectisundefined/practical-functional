var Right =
  x =>
    ({
      fold: (f, g) => g(x),
      map: f => Right(f(x)),
      inspect: () => `Right(${x})`
    })

var Left =
  x =>
    ({
      fold: (f, g) => f(x),
      map: f => Left(x),
      inspect: () => `Left(${x})`
    })

var fromNullable =
  x =>
    x != null ? Right(x) : Left(null)

var findColor =
  name =>
    ({
      red: '#ff4444',
      blue: '#3b5988',
      yellow: '#fff68f'
    }[name])

/*
var res = findColor('red')
*/

var f =
  name =>
    fromNullable(findColor(name))
    .map(x => x.slice(1))
    .fold(_ => 'no color',
      c => c.toUpperCase())

var res = f('black')

console.log(res)
