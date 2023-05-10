import { useState, useEffect  } from 'react'
import List from './Components/List'
import Filter from './Components/Filter'
import noteService from './services/notes'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="alert">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [toShow, setToShow] = useState(persons)
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
          setAlertMessage(
            `${existingPerson.name}'s number changed`
          )
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${existingPerson.name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }
    
    else{const nameObject = {
      name: newName,
      number: newNumber
    }
    noteService.create(nameObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
    const filtered = persons.concat(nameObject).filter(x => x.name.toLowerCase().includes(filter))
    setToShow(filtered)
    setAlertMessage(
      `added ${newName}`
    )
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
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
    const person = persons.find(n => n.id === id)
    console.log(person)
    if (window.confirm("delete " + person.name)) {
      noteService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
        setToShow(toShow.filter(n => n.id !== id))
        setAlertMessage(
          `deleted ${person.name}`
        )
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
    })
    }
    }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} />
      <ErrorMessage message={errorMessage} />
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