import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
return (
  <p>
    has {props.votes} votes
  </p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))

  let maximum = -Infinity
  for(let vote of votes){
    if(vote>maximum)
    maximum = vote
  }
  
  const voteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Statistics votes={votes[selected]}/>
      <p>
        <Button handleClick={() => setSelected(Math.floor((Math.random() * 8)))} text="next anecdote" />
        <Button handleClick={voteClick} text="vote" />
      </p>
      <h2>The anecdote with the most votes</h2>
      <p>{anecdotes[votes.indexOf(maximum)]}</p>
      <Statistics votes={votes[votes.indexOf(maximum)]}/>
    </div>
  )
}

export default App