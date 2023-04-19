import { useState, useEffect  } from 'react'
import List from './Components/List'
import Filter from './Components/Filter'
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [toShow, setToShow] = useState(persons)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
        setToShow(response)
      })
  }, [])

  console.log('render', persons.length, 'persons')
  console.log("filter1", filter)

  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson){
      const change = window.confirm(`${newName} is already added to phonebook. Replace old number with new one?`)
      if (change){
        const updatedPerson = { ...existingPerson, number: newNumber }
        noteService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setToShow(toShow.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    }
    
    else{const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }
    noteService.create(nameObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
    const filtered = persons.concat(nameObject).filter(x => x.name.toLowerCase().includes(filter))
    setToShow(filtered)
    })}
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
    const filtered = persons.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setToShow(filtered)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleDeleteOf = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    console.log(person)
    if (window.confirm("delete " + person.name)) {
      noteService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
        setToShow(toShow.filter(n => n.id !== id))
    })
    }
    }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter}/>
      <form onSubmit={addName}>
      <h3>Add new</h3>
      <div> 
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div
        >number: 
        <input 
        value={newNumber}
        onChange={handleNumberChange}
        />
        </div>
        <div><button type="submit">save</button></div>
        
      </form> 
      <List 
      toShow={toShow}
      handleDeleteOf={handleDeleteOf}
      />
    </div>
  )

}

export default App