var { Right, Left } = require('../either')
// var Box = require('../box')
var Task = require('data.task')

// nt(a.map(f) == nt(a).map(f))
/*
var eitherToTask =
  e =>
    e.fold(Task.rejected, Task.of)
*/

var fake =
  id =>
    ({
      id,
      name: 'user' + id,
      best_friend_id: id + 1
    })

var Db =
  ({
    find: id =>
      new Task((reject, resolve) =>
        setTimeout(() =>
          resolve(id > 2 ? Right(fake(id)) : Left('not found')),
        100)
      )
  })

var send =
  (code, json) =>
    console.log(`sending ${code}: ${JSON.stringify(json)}`)

Db.find(3)
  .chain(eu =>
    eu.fold(_ => Task.of(eu),
      u => Db.find(u.best_friend_id)
    )
  )
  .fork(error => send(500, { error }),
    eu => eu.fold(error => send(404, { error }),
      x => send(200, x))
  )
