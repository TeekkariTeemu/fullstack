const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

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
    response.json(persons)
  })

  //Nyt app.get('/api/notes/:id', ...)käsittelee kaikki HTTP GET 
  //-pyynnöt, jotka ovat muotoa /api/notes/JOTAIN, 
  //jossa JOTAIN on mielivaltainen merkkijono.
  //Polun parametrin id arvoon päästään käsiksi pyynnön 
  //tiedot kertovan olion request kautta
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  //poistaa nimen listasta
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
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
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 9999),
      }
    
      persons = persons.concat(person)
    
      response.json(person)
    })

  app.get('/info', (request, response) => {
    const date = new Date()
    const len = persons.length
    response.send(`Phonebook has info for ${len} people<br>${date}`)
  })

  //rivit sitovat muuttujaan app sijoitetun http-palvelimen
  //kuuntelemaan porttiin 3002 tulevia HTTP-pyyntöjä
  const PORT = 3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  