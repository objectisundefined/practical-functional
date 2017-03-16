var React = require('react')
// var Todo = require('./todo')
var TodoList = require('./todolist')
// var Task = require('data.task')
var classNames = require('classnames')
// var Either = require('data.either')
// var { Right, Left, fromNullable } = Either
var { pluralize } = require('./utils')

var TodoItem =
  ({ todo, onDestroy, onToggle }) =>
    React.createElement(
      'li',
      {
        className: classNames({ completed: todo.completed_at })
      },
      [
        React.createElement(
          'div',
          {
            key: 0,
            className: 'view'
          },
          [
            React.createElement(
              'input',
              {
                key: 0,
                className: 'toggle',
                type: 'checkbox',
                checked: todo.completed_at,
                onChange: () => onToggle(todo)
              }
            ),
            React.createElement(
              'label',
              {
                key: 1
              },
              todo.name
            ),
            React.createElement(
              'button',
              {
                key: 2,
                className: 'destroy',
                onClick: () => onDestroy(todo)
              }
            )
          ]
        )
      ]
    )

var App =
  React.createClass({
    displayName: 'App',
    getInitialState () {
      return {
        error: '',
        list: new TodoList(),
        filter: 'all'
      }
    },
    destroy (todo) {
      this.state.list.destroy(todo, (err, list) => {
        if (err) {
          return console.error(err)
        }

        this.setState({ list })
      })
    },
    toggle (todo) {
      this.state.list.toggle(todo, (err, list) => {
        if (err) {
          return console.error(err)
        }

        this.setState({ list })
      })
    },
    save (input) {
      this.state.list.save(input.value, (err, list) => {
        if (err) {
          return console.error(err)
        }

        this.setState({ list })

        input.value = ''
      })
    },
    saveOnEnter (e) {
      if (e.key === 'Enter') {
        this.save(e.currentTarget)
      }
    },
    setFilter (filter) {
      this.setState({ filter })
    },
    clearCompleted () {
      this.state.list.clearCompleted((err, list) => {
        if (err) {
          return console.error(err)
        }

        this.setState({ list })
      })
    },
    incompleteCount () {
      return this.state.list.incomplete().length
    },
    renderMain (list) {
      var todos = list[this.state.filter]()

      return React.createElement(
        'section',
        {
          className: 'main'
        },
        [
          React.createElement(
            'input',
            {
              key: 0,
              className: 'toggle-all',
              type: 'checkbox'
            }
          ),
          React.createElement(
            'ul',
            {
              key: 1,
              className: 'todo-list'
            },
            todos.map(t => React.createElement(
              TodoItem,
              {
                key: t.name,
                todo: t,
                onDestroy: this.destroy,
                onToggle: this.toggle
              }
            ))
          )
        ]
      )
    },
    renderFooter () {
      return React.createElement(
        'footer',
        {
          className: 'footer'
        },
        [
          React.createElement(
            'span',
            {
              key: 0,
              className: 'todo-count'
            },
            [
              React.createElement(
                'strong',
                {
                  key: 0
                },
                this.incompleteCount() + ' '
              ),
              pluralize('todo', this.incompleteCount()) + ' left'
            ]
          ),
          React.createElement(
            'ul',
            {
              key: 1,
              className: 'filters'
            },
            [
              React.createElement(
                'li',
                {
                  key: 0
                },
                [
                  React.createElement(
                    'a',
                    {
                      key: 0,
                      href: '#',
                      onClick: () => this.setFilter('all'),
                      className: classNames({ selected: this.state.filter === 'all' })
                    },
                    'All'
                  ),
                  ' '
                ]
              ),
              React.createElement(
                'li',
                {
                  key: 1
                },
                [

                  React.createElement(
                    'a',
                    {
                      key: 0,
                      href: '#incomplete',
                      onClick: () => this.setFilter('incomplete'),
                      className: classNames({ selected: this.state.filter === 'incomplete' })
                    },
                    'Active'
                  ),
                  ' '
                ]
              ),
              React.createElement(
                'li',
                {
                  key: 2
                },
                [
                  React.createElement(
                    'a',
                    {
                      key: 0,
                      href: '#complete',
                      onClick: () => this.setFilter('complete'),
                      className: classNames({ selected: this.state.filter === 'complete' })
                    },
                    'Completed'
                  )
                ]
              )
            ]
          ),
          React.createElement(
            'button',
            {
              key: 2,
              className: 'clear-completed',
              onClick: this.clearCompleted
            },
            'Clear completed'
          )
        ]
      )
    },
    render () {
      return React.createElement(
        'div',
        null,
        [
          React.createElement(
            'header',
            {
              key: 0,
              className: 'header'
            },
            [
              React.createElement(
                'h1',
                {
                  key: 0
                },
                'todos'
              ),
              React.createElement(
                'input',
                {
                  key: 1,
                  className: 'new-todo',
                  placeholder: 'What needs to be done?',
                  onKeyDown: this.saveOnEnter,
                  autoFocus: true
                }
              )
            ]
          ),
          this.state.list.todos.length ? this.renderMain(this.state.list) : null,
          this.renderFooter()
        ]
      )
    }
  })

module.exports = App
