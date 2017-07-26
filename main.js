const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.get('/', function(request, response) {
  let html =
    '<form action="/" method="post">' +
    '<h1>Welcome to the form!</h1>' +
    "<p>What's your name?</p>" +
    '<input type="text" name="name" placeholder="Name" />' +
    '<p>Enter your email</p>' +
    '<input type="text" name="email" placeholder="Email Address" />' +
    '<p>Enter a password</p>' +
    '<input type="password" name="password" />' +
    '<button type="submit">Submit</button>'
  ;('</form>')
  response.send(html)
})

app.post('/', function(request, response) {
  request.checkBody('name', 'You must enter a name!').notEmpty()
  request.checkBody('email', 'You must enter a email!').notEmpty()
  request.checkBody('password', 'You must enter a password!').notEmpty()

  let errors = request.validationErrors()
  if (errors) {
    let html = errors
    response.send(html)
  } else {
    let name = request.body.name
    let email = request.body.email
    let password = request.body.password
    let html =
      '<p>Your name is: </p>' + name + '<p>Your email is: </p>' + email + '<p>Your password is: </p>' + password
    response.send(html)
  }
})

app.listen(3000)
