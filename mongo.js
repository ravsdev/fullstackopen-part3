const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]
//8OQcoK7S8f5vQGqwxNrY
const url = `mongodb://mongo:${password}@containers-us-west-148.railway.app:5672`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const getAll = () =>{
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

const add = () =>{
  const person = new Person({
    name: newName,
    number: newNumber,
  })
  person.save().then((result) => {
    console.log(`Added ${result.name} to the phonebook`)
    mongoose.connection.close()
  })
}

//Execute one function depend on num of arguments
const arguments = {
  3: getAll,
  5: add
}

arguments[process.argv.length]()

/*
if (process.argv.length === 3) {
    getAll();
} else {
    add();
}*/
