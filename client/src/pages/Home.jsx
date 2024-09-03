import { useState } from 'react'
import TaskList from '../componenets/TaskList'

const Home = () => {
    const [count, setCount] = useState(0)
  
    return (
      <>
        <section className='home'>
          <h1>Your To Do List</h1>
          <h2>Remember to hit save before logging out!</h2>
          <TaskList></TaskList>
        </section>
      </>
    )
  }
  
  export default Home