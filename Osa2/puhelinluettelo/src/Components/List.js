const Name = ({name, number, handleDelete}) => {
    return (
      <li>
        {name} {number}
        <button onClick = {handleDelete}>Delete</button>
      </li>
    )}
  
   
const List = (props) => {
    const { toShow, handleDeleteOf } = props
    return (
      <div>
        <h3>Numbers</h3>
        <ul>
        {toShow.map((x, index) => (
          <Name
            key={index}
            name={x.name}
            number={x.number}
            handleDelete={() => handleDeleteOf(x.id)}
          />
        ))}
      </ul>
      </div>
    )
  }

export default List