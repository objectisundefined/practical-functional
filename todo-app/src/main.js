var React = require('react')
var DOM = require('react-dom')
var App = require('./app')

DOM.render(React.createElement(App), document.querySelector('#root'))
