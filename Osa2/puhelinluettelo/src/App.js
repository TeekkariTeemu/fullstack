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
    console.log('effect')
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      setToShow(response.data)
    }
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  console.log('render', persons.length, 'persons')
  console.log("filter1", filter)

  const addName = (event) => {
    event.preventDefault()
    var names = persons.map(x => x.name)
    if (names.includes(newName)){alert(`${newName} is already added to phonebook`)}
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
      <List toShow={toShow}/>
    </div>
  )

}

export default App