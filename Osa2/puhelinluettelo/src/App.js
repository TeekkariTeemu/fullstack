import { useState } from 'react'

const Name = (props) => {
  return (
    <li>{props.name} {props.number}</li>
  )}

  function filterNames(arr, query) {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
  }
 
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState('')

  console.log("filter", filter)
  const addName = (event) => {
    event.preventDefault()
    var names = persons.map(x => x.name)
    if (names.includes(newName)){alert(`${newName} is already added to phonebook`)}
    else{const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }
    setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  
  console.log(filterNames(persons.map(x => x.name), filter))
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter:
        <input
          value={filter}
          onChange={handleFilter}
        />
        </div>
      <form onSubmit={addName}>
      <h2>Add new</h2>
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
      <h2>Numbers</h2>
      {persons.map(x =>
          <Name key={x.id} name={x.name} number={x.number}/>
        )}
    </div>
  )

}

export default App