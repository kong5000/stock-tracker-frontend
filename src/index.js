import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
  <h1>{course}</h1>
)
const Part = ({ part }) => (
  <div>
    <p>{part.name} {part.exercises}</p>
  </div>
)

const getExerciseTotal = (total, part) => {
  return total + part.exercises
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part part={part}></Part>)}
      <Total total={
        parts.reduce(getExerciseTotal, 0)
      }
        // parts.reduce((total, part) => {
        //   return total + part.exercises
        // }), 0}
        >
      </Total>

    </div>
  )
}

const Total = ({ total }) => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))