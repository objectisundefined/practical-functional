var assert = require('assert')
var Task = require('data.task')

var posts = {
  1: {
    title: 'First'
  },
  2: {
    title: 'Second'
  }
}

var comments = {
  First: [
    {
      id: 1,
      body: 'Brilliant!'
    }
  ],
  Second: [
    {
      id: 2,
      body: 'Unforgivable'
    }
  ]
}

var getPost =
  id =>
    new Task((reject, resolve) => {
      setTimeout(() => posts[id] ? resolve(posts[id]) : reject('not found'), 200)
    })

var getComments =
  post =>
    new Task((reject, resolve) => {
      setTimeout(() => resolve(comments[post.title]), 200)
    })

var postTitle =
  id =>
    getPost(id)
      .map(v => v.title)
      .map(v => v.toUpperCase())

postTitle(1)
  .fork(
    console.error,
    t => {
      assert.deepEqual(t, 'FIRST')
    }
  )

/*
var commentsForPost =
  id =>
    new Task((reject, resolve) => resolve(
      post =>
        ({
          title: post.title,
          comments: comments[post.title]
        })
    ))
    .ap(getPost(id))
*/

/*
var commentsForPost =
  id =>
    getPost(id)
    .chain(
      post =>
        getComments(post)
          .map(
            comments => ({
              title: post.title,
              comments: comments
            })
          )
    )
*/

var commentsForPost =
  id =>
    getPost(id)
      .chain(p =>
        getComments(p)
          .map(comments =>
            Object.assign({ comments }, p)
          )
      )

commentsForPost(2)
  .fork(
    console.error,
    t => {
      assert.deepEqual(t.title, 'Second')
      assert.deepEqual(t.comments, comments['Second'])
    }
  )

var getDirname =
  new Task((reject, resolve) => resolve(__dirname))

getDirname.fork(
  console.error,
  t => {
    assert(t.match(/exercise/))
  }
)

/*
Task.prototype

Task {
  of: [Function: _of],
  rejected: [Function: _rejected],
  map: [Function: _map],
  chain: [Function: _chain],
  ap: [Function: _ap],
  concat: [Function: _concat],
  empty: [Function: _empty],
  toString: [Function: _toString],
  orElse: [Function: _orElse],
  fold: [Function: _fold],
  cata: [Function: _cata],
  swap: [Function: _swap],
  bimap: [Function: _bimap],
  rejectedMap: [Function: _rejectedMap] }
*/

/*
Task.of(v => v.title.toUpperCase()).ap(getPost).fork(
  console.error,
  console.log
)
*/

/*
Task.of(x => x).ap(getPost(1)).fork(
  console.error,
  console.log
)
*/

/*
getPost(1)
  .map(v => v.title)
  .fork(
    console.error,
    console.log
  )
*/

/*
var t1 = new Task((reject, resolve) => {
  setTimeout(resolve, 0, x => x + 2)
  // resolve(x => x + 2)
})

var t2 = new Task((reject, resolve) => {
  setTimeout(resolve, 0, 2)
  // resolve(2)
})

t1
  .ap(t2)
  .fork(
    console.error,
    console.log
  )
*/

/*
https://github.com/folktale/data.task
*/
