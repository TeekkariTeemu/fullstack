const Name = (props) => {
    return (
      <li>{props.name} {props.number}</li>
    )}
  
   
const List = (props) => {
    const { toShow } = props
    return (
      <div>
        <h3>Numbers</h3>
        {toShow.map(x =>
            <Name key={x.id} name={x.name} number={x.number}/>
          )}
      </div>
    )
  }

export default List