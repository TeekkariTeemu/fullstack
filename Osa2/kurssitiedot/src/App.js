const Part = (props) => {
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Header = (props) => {
  console.log("Header props:", props.name)
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  const { content } = props
  console.log("Content props:", content)
  return (
    <div>
      {content.map(x => 
      <Part key={x.id} part={x} />
      )}
    </div>
  )
}

const Total = (props) => {
  const { content } = {props}
  console.log("Total props:", content)
  var total = content.reduce(function(sum, part) {
    console.log("reduce",sum,part)
    return sum + part.exercises
  }, 0)
  console.log("total total:", total)
  return (
    <div>
      <p>Number of exercises</p>
    </div>
  )
}

const Course = (props) => {
  console.log("Course props:", props)
  return (
    <div>
      <Header name={props.course.name}/>
      <Content content={props.course.parts}/>
      <Total course={props.course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
