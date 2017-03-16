// var fs = require('fs')
var Task = require('data.task')
// var Either = require('../either')
// var { Right, Left, fromNullable } = Either

// var { List, Map } = require('immutable-ext')
var { List } = require('immutable-ext')

var httpGet =
  (path, params) => {
    console.log(params, ' was sent')
    // Task.of(`${path}: result`)
    return new Task((reject, resolve) =>
      setTimeout(() => {
        console.log(params, ' resolved')
        resolve(`${path}: result`)
      }, Math.random() * 1000)
    )
  }

var getUser = x => httpGet('/user', { id: x })
var getTimeline = x => httpGet(`/timeline/${x}`, {})
var getAds = () => httpGet('/ads', {})

var onError = console.error
var onSuccess = console.log

/*
getUser(1)
  .fork(
    onError,
    onSuccess
  )

getTimeline(1)
  .fork(
    onError,
    onSuccess
  )

getAds()
  .fork(
    onError,
    onSuccess
  )
*/

/*
List.prototype.traverse = function(point, f) {
  return this.reduce((ys, x) =>
    f(x).map(x => y => y.concat(x)).ap(ys), point(List()))
}
*/

// List.of(getUser(3), getTimeline(7), getAds())
//   .traverse(Task.of, t => t)
//   .fork(onError, onSuccess)

/*
var traverse =
  (point, f) =>
    arr =>
      arr.reduce((ys, x) =>
        f(x).map(x => y => y.concat(x)).ap(ys), point(List()))

traverse(Task.of, t => t)([getUser(3), getTimeline(7), getAds()])
  .fork(onError, onSuccess)
*/

// var id = x => x

/*
var arr = List()

// getUser(3).map(x => y => arr.concat(x))
// a task that can resolve a function

getAds().map(x => y => { arr = arr.push(x) })
.ap(
  getTimeline(7).map(x => y => { arr = arr.push(x) })
  .ap(
    getUser(3).map(x => y => { arr = arr.push(x) })
      .ap(Task.of(arr))
  )
)
.fork(onError, () => console.log(arr))
*/

;[getUser(3), getTimeline(7), getAds()].reduce((ys, x) => x.map(x => y => y.concat(x)).ap(ys), Task.of(List()))
.fork(onError, onSuccess)
