import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <div>  
    <p>{props.text} {props.value}</p>
  </div>

)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad)
  const positive = good / (good + neutral + bad) + ' %'
  //ei kovin kaunis ratkaisu, mutta toimii nyt
  if (good + bad + neutral === 0) {
    return(
    <div>
      <p>No feedback given </p>
    </div>
    )
  }
return (
  <div>
    <StatisticLine text="good" value ={good} />
    <StatisticLine text="neutral" value ={neutral} />
    <StatisticLine text="bad" value ={bad} />
    <StatisticLine text="all" value ={all} />
    <StatisticLine text="average" value ={average} />
    <StatisticLine text="positive" value ={positive} /> 
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2> statistics </h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
