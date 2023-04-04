import { useState } from 'react'

const Name = (props) => {
  return (
    <li>{props.name}</li>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1}
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    var names = persons.map(x => x.name)
    if (names.includes(newName)){alert(`${newName} is already added to phonebook`)}
    else{const nameObject = {
      name: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
      <input
          value={newName}
          onChange={handleNameChange}
        />
        <button type="submit">save</button>
      </form> 
      <h2>Numbers</h2>
      {persons.map(x =>
          <Name key={x.id} name={x.name} />
        )}
    </div>
  )

}

export default App