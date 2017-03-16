// var Task = require('data.task')
var Todo = require('./todo')
// var Either = require('data.either')
// var { Right, Left, fromNullable } = Either
var { find } = require('./utils')

var localStorage = window.localStorage

/*
var findTodo =
  (todos, todo) =>
    todos.filter(t => t.name === todo.name)[0]
*/

class TodoList {
  constructor () {
    this.getTodos((err, ts) => {
      if (err) {
        this.todos = []
      } else {
        this.todos = ts
      }
    })
  }

  getTodos (callback) {
    var item = localStorage.getItem('todos')

    try {
      var todoData = JSON.parse(item)
      var todos = todoData.map(t => new Todo(t))
      callback(null, todos)
    } catch (e) {
      callback(e)
    }
  }

  setTodos (callback) {
    localStorage.setItem('todos', JSON.stringify(this.todos))
    callback(null, this)
  }

  createTodo (name) {
    return new Todo({
      name: name,
      createdAt: new Date()
    })
  }

  save (name, callback) {
    var todo = this.createTodo(name)

    if (name.trim()) {
      if (find(this.todos, t => t.name === todo.name)) {
        return callback('duplicate todo')
      } else {
        this.todos.unshift(todo)
        this.setTodos(callback)
      }
    } else {
      return callback('name can\'t be empty')
    }
  }

  toggle (todo, callback) {
    todo.toggleComplete()
    this.setTodos(callback)
  }

  destroy (todo, callback) {
    var names = this.todos.map(t => t.name)
    var index = names.indexOf(todo.name)

    if (index >= 0) {
      this.todos.splice(index, 1)
      this.setTodos(callback)
    }
  }

  clearCompleted (callback) {
    this.todos = this.incomplete()
    this.setTodos(callback)
  }

  newestFirst () {
    return this.todos.sort((a, b) =>
      Number(a.created_at < b.created_at)
    )
  }

  all () {
    return this.newestFirst()
  }

  complete () {
    return this.newestFirst().filter(t => t.completed_at)
  }

  incomplete () {
    return this.newestFirst().filter(t => !t.completed_at)
  }
}

module.exports = TodoList
