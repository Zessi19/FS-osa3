const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

let persons = [
  { 
    name: "Arto Hellas", 
    number: "040-123456",
    id: 1
  },
  { 
    name: "Ada Lovelace", 
    number: "39-44-5323523",
    id: 2
  },
  { 
    name: "Dan Abramov", 
    number: "12-43-234345",
    id: 3
  },
  { 
    name: "Mary Poppendieck", 
    number: "39-23-6423122",
    id: 4
  }
]

// Config
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) { 
  return JSON.stringify(req.body) 
});

app.use(morgan('tiny'))
app.use(morgan(':body',
  {skip: function (req, res) { return req.method !== "POST" }}
))

// Routes
app.get('/api/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people<p>` +
    new Date()
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(i => i.id === id)  

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(i => i.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  // 3.6 Tests
  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'Contact must have two fields: name, number'
    })
  }

  const searchIdx = persons.findIndex(i => 
    i.name.toLowerCase() === body.name.toLowerCase()
  )

  if (searchIdx !== -1) {
    return res.status(400).json({ 
      error: 'Contact name already in use, name must be unique'
    })
  }

  // Add new person
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000) 
  }
  
  persons = persons.concat(person)
  res.json(person)
})

// Define ports
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})