var wrap =
  x =>
    x && x.inspect ? x.inspect() : x

var Box =
  x =>
    ({
      x: x,
      map: f => Box(f(x)),
      chain: f => f(x),
      concat: o => Box(x + o.x),
      ap: x1 => Box(x(x1)),
      traverse: (of, f) => of(Box.of(x)),
      inspect: () => `Box(${wrap(x)})`
    })

Box.of = x => Box(x)

var Right =
  x =>
    x && x.isRight
    ? x
    : ({
      x,
      inspect: () => `Right(${wrap(x)})`,
      isRight: true
    })

var Left =
  x =>
    x && x.isLeft
    ? x
    : ({
      x,
      inspect: () => `Left(${wrap(x)})`,
      isLeft: true
    })

var Either = {
  of: Right
}

var fromNullable =
  x =>
    x != null
    ? Right(x)
    : Left(x)

var eitherToBox =
  e =>
    Box(e.x)

// Functor
console.assert(Box.of(20).map(x => x / 2).inspect() === 'Box(10)')
// Box(10)

// Monad
console.assert(Box.of(true).chain(x => Box.of(!x)).inspect() === 'Box(false)')
// Box(false)

// Monoid
console.assert(Box.of('small').concat(Box.of('pox')).inspect() === 'Box(smallpox)')
// Box('smallpox')
//
// Applicative
console.assert(Box.of(x => x + 1).ap(2).inspect() === 'Box(3)')
// Box(3)

// Traversable
console.assert(Box.of(3).traverse(Either.of, x => fromNullable(x)).inspect() === 'Right(Box(3))')
// Right(Box(3))

// Natural transformation
console.assert(eitherToBox(fromNullable(null)).inspect() === 'Box(null)')
// Box(null)
