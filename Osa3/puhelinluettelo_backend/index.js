require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')



//tehdään tokeni, joka sisältää POST:in datan,
//jos pyyntö on tyyppiä POST
morgan.token('postData', (request) => {
    if (request.method === 'POST') {
      return JSON.stringify(request.body)
    }
    return ''
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
//mukaillaan tiny-konfiguraatiota, morgan-dokumentaation mukaisesti
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))



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


  //route määrittelee tapahtumankäsittelijän, joka hoitaa 
  //sovelluksen juureen eli polkuun / tulevia HTTP GET -pyyntöjä
  //request sisältää kaikki HTTP-pyynnön tiedot ja 
  //toisen parametrin response:n avulla määritellään, 
  //miten pyyntöön vastataan.
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  //Pyyntöön vastataan response-olion metodilla json, joka 
  //lähettää HTTP-pyynnön vastaukseksi parametrina olevaa 
  //JavaScript-olioa eli taulukkoa notes vastaavan 
  //JSON-muotoisen merkkijonon
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  //Nyt app.get('/api/notes/:id', ...)käsittelee kaikki HTTP GET 
  //-pyynnöt, jotka ovat muotoa /api/notes/JOTAIN, 
  //jossa JOTAIN on mielivaltainen merkkijono.
  //Polun parametrin id arvoon päästään käsiksi pyynnön 
  //tiedot kertovan olion request kautta
  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

  //poistaa nimen listasta
  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  

  //Postataan uusi nimi ja numero. (jos molemmat täytetty)
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const nameExists = persons.find(person => person.name === body.name)
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    if (nameExists) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }
    const person = new Person({
        name: body.name,
        number: body.number,
      })
    
      person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    })

  app.get('/info', (request, response) => {
    const date = new Date()
    const len = persons.length
    response.send(`Phonebook has info for ${len} people<br>${date}`)
  })

  app.use(unknownEndpoint)
  app.use(errorHandler)

  //rivit sitovat muuttujaan app sijoitetun http-palvelimen
  //kuuntelemaan porttiin 3002 tulevia HTTP-pyyntöjä
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  