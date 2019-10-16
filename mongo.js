const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://joonas19:${password}@cluster0-g3oxv.mongodb.net/contact-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then( response => {
    console.log(`Added contact (name: ${person.name}, number: ${person.number}) to phonebook`)
    mongoose.connection.close()
  })

} else if (process.argv.length === 3) {
  Person.find({}).then( result => {
    console.log('Phonebook:')
    result.forEach(i => {
      console.log(i.name + ' ' + i.number)
    })
    mongoose.connection.close()
  })

} else {
  console.log('Error: Unknown command line arguments')
}