import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogInForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [authToken, setAuthToken] = useState('')
    const [authorized, setAuthorized] = useState('')
    const [taskList, setTaskList] = useState([])

    
     // Handle redirection based on auth and token
    useEffect(() => {
      if (authorized && authToken) {
        console.log(taskList)
        navigate('/home', { state: { authToken, taskList } }) // call top level
      }
    }, [status, authToken, taskList])

   
    const handleSubmit = async (e) => { // e = event object to be modified
        e.preventDefault() // prevent refresh on submit
        const user = { username, password } // create json 
        
        try {
            const userResponse = await fetch('http://localhost:3000/users/auth', {  
                method: 'POST',
                headers: { "Content-Type": "application/json" }, // tells format of body
                body: JSON.stringify(user) // turn object into string. payload
            })
            const userJson = await userResponse.json()
            setStatus(userJson.message)
            setAuthorized(userJson.authorized)
            setAuthToken(userJson.authToken)

            if (authorized) { // SOMETHING WRONG HERE
              const taskResponse = await fetch('http://localhost:3000/tasks/list', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" }, 
                  body: JSON.stringify({ authToken })
              })
      
              const taskJson = await taskResponse.json()
              console.log(taskJson)
              setTaskList(taskJson.tasks)
    
            }

        } catch (error) {
            console.log(error.userMessage)
            setStatus(`An error occurred. ${error}`)
        }
    }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            /> */}
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 py-3">
              Sign in to your account
            </h2>
            <form action="#" method="GET" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    className="p-2 bg-gray-100 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2"> 
                  <input
                    type="password"
                    className="p-2 bg-gray-100 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              <h6 className="mt-1 text-center tracking-tight text-red-500">
                {status}
               </h6>
              </div>
            </form>
  
          </div>
        </div>
      </>
    )
  
}

export default LogInForm
