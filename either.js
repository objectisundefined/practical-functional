var Right =
  x =>
    ({
      chain: f => f(x),
      ap: other => other.map(x),
      traverse: (of, f) => f(x).map(Right),
      map: f => Right(f(x)),
      fold: (f, g) => g(x),
      inspect: () => `Right(${x})`
    })

var Left =
  x =>
    ({
      chain: f => Left(x),
      ap: other => Left(x),
      traverse: (of, f) => of(Left(x)),
      map: f => Left(x),
      fold: (f, g) => f(x),
      inspect: () => `Left(${x})`
    })

var fromNullable =
  x =>
    x != null ? Right(x) : Left(x)

var tryCatch =
  f => {
    try {
      return Right(f())
    } catch (e) {
      return Left(e)
    }
  }

module.exports = {
  Right,
  Left,
  fromNullable,
  tryCatch,
  of: Right
}
