import { useState } from 'react'
import LogInForm from '../componenets/LogInForm'
// import logo from '/logo.png'


const LogIn = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <h1>To Do App</h1>
        <LogInForm></LogInForm>
      </section>
    </>
  )
}

export default LogIn
