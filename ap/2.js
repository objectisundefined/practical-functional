var Task = require('data.task')

// var testUser = { id: 2, name: 'user1' }

// var Db = {
//   find: _id => new Task((reject, resolve) => {
//     resolve(testUser)
//   })
// }

// Db.find(3).fork(console.log, console.log)

/*
var Db = ({
  find: (id, cb) =>
    new Task((reject, resolve) =>
      setTimeout(() =>
        resolve({ id: id, title: `Project ${id}` }), 100))
})

Db.find(3).fork(console.error, console.log)
*/

var t = new Task((reject, resolve) => {
  resolve(3)
})

console.log(t)
