const Filter = (props) => {
    const { value, onChange } = props
    console.log(props)
    console.log({value})
    console.log({onChange})
    return (
      <div>
          filter:
          <input
            value={value}
            onChange={onChange}
          />
        </div>
    )}

export default Filter