var assert = require('assert')

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

/*
var log =
  x => {
    console.log(x)

    return x
  }
*/

var DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i

/*
var street =
  user => {
    var address = user.address

    if (address) {
      return address.street
    } else {
      return 'no street'
    }
  }
*/

var street =
  user =>
    fromNullable(user.address)
    .fold(
      () => 'no street',
      v => v.street
    )

var user = {
  address: {
    street: {
      name: 'Willow'
    }
  }
}

assert.deepEqual(street(user), { name: 'Willow' })
assert.equal(street({}), 'no street')

/*
var streetName =
  user => {
    var address = user.address

    if (address) {
      var street = address.street

      if (street) {
        return street.name
      }
    }

    return 'no street'
  }
*/

/*
var streetName =
  user =>
    tryCatch(
      () => {
        return user.address.street.name
      }
    )
    .fold(
      () => 'no street',
      v => v
    )
*/

var streetName =
  user =>
    fromNullable(user.address)
      .map(v => v.street)
      .chain(fromNullable)
      .map(v => v.name)
      .fold(
        () => 'no street',
        v => v
      )

assert.equal(streetName(user), 'Willow')
assert.equal(streetName({}), 'no street')
assert.equal(streetName({ address: { street: null } }), 'no street')

/*
var parseDbUrl =
  cfg => {
    try {
      var c = JSON.parse(cfg)

      return c.url.match(DB_REGEX)
    } catch (e) {
      return null
    }
  }
*/

var parseDbUrl =
  cfg =>
    tryCatch(
      () => JSON.parse(cfg).url.match(DB_REGEX)
    )
    .fold(
      () => null,
      v => v
    )

var config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'

assert.equal(parseDbUrl(config)[1], 'sally')
assert.equal(parseDbUrl(), null)

/*
var startApp =
  cfg => {
    var parsed = parseDbUrl(cfg)

    if (parsed) {
      var [, user, password, db] = parsed

      return `starting ${db}, ${user}, ${password}`
    } else {
      return 'can\'t get config'
    }
  }
*/

var startApp =
  cfg =>
    fromNullable(parseDbUrl(cfg))
      .fold(
        () => 'can\'t get config',
        v => {
          var [, user, password, db] = v

          return `starting ${db}, ${user}, ${password}`
        }
      )

assert.equal(String(startApp(config)), 'starting mydb, sally, muppets')
assert.equal(String(startApp()), 'can\'t get config')
