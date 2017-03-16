var Task = require('data.task')
var fs = require('fs')

// chain

var read =
  name =>
    new Task((reject, resolve) => {
      fs.readFile(name, 'utf-8', (err, res) => {
        err ? reject(err) : resolve(res)
      })
    })

var decode =
  buffer =>
    buffer.map(a => a.toString('utf-8'))

var intro = decode(read('./intro.txt'))
var outro = decode(read('./outro.txt'))

var concatenated =
  intro.chain(a => outro.map(b => a + '\n' + b))

concatenated.fork(
  console.error,
  console.log
)

Task.of(x => x + 1).ap(Task.of(1)).fork(
  console.error,
  console.log
)

new Task((reject, resolve) => reject(1))
.ap(
  new Task((reject, resolve) => reject(2))
)
.fork(
  console.error,
  () => {}
)

new Task((reject, resolve) => resolve(4))
.map(
  x => x + 2
)
.ap(
  // new Task((reject, resolve) => reject(2))
  new Task((reject, resolve) => setTimeout(() => reject(2), 1000))
)
.fork(
  console.error,
  console.log
)

// ap

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

var write =
  (name, contents) =>
    new Task((reject, resolve) =>
      fs.writeFile(name, contents, (err, _) =>
        err ? reject(err) : resolve(contents)))

var app =
  () =>
    read('./intro.txt')
      .map(contents =>
        contents.replace(/intro\.txt/g, 'intro.txt -- changed')
      )
      .chain(replaced => write('./intro-1.txt', replaced))

app()
  .fork(console.error,
    () => console.log('success~'))
