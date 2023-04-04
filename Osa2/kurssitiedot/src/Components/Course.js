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
        <h2>{props.name}</h2>
      </div>
    )
  }
  

const Content = (props) => {
    const { content } = props
    console.log("Content props:", props)
    console.log("Content content:", content)
    return (
      <div>
        {content.map(x => 
        <Part key={x.id} part={x} />
        )}
      </div>
    )
  }

const Total = (props) => {
    const { course } = props
    console.log("Total props:", course)
    var total = course.reduce(function(sum, part) {
      console.log("reduce",sum,part)
      return sum + part.exercises
    }, 0)
    console.log("total total:", total)
    return (
      <div>
        <b>Number of exercises {total}</b>
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

export default Course