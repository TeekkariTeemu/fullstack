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
        {toShow.map(x =>
            <Name 
            key={x.id} 
            name={x.name} 
            number={x.number}
            handleDelete={() => handleDeleteOf(x.id)}
            />
          )}
      </div>
    )
  }

export default List