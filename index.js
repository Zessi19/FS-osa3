// Imports
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

// Config Middleware
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan('tiny'))
app.use(morgan(':body',
  {skip: function (req, res) { return req.method !== 'POST' }}
))

// Routes
app.get('/api/info', (req, res) => {
  Person.find({}).then(people => {
    res.send(`<p>Phonebook has info for ${people.length} people<p>` + new Date())
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(i => i.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(searchPerson => {
      if (searchPerson) {
        res.json(searchPerson.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(removedPerson => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const updatedData = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, updatedData, {new: true, runValidators: true, context: 'query'})
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

// Unknown Endpoint Error
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

// Other Errors
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'Malformatted id' })

  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message, name: 'ValidationError' })
  }

  next(error)
}

app.use(errorHandler)

// Define ports
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})