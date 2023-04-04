import { useState } from 'react'

const Name = (props) => {
  console.log(props)
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
    const nameObject = {
      name: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  console.log(persons)
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