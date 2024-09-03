import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const TaskList = () => {
    const location = useLocation()
    const state = location.state
    const taskList = location.taskList
    const authToken = location.authToken

    const [newTaskList, setTasks] = useState('')


    console.log(state)

    const handleAddTask = (e) => {
        e.preventDefault() // prevent refresh on submit
        const task = { task } // create json 
        console.log(user)
    }

    const taskList2 = [
        {
            id: 1,
            task: 'Alice Johnson',
            completed: true
        },
        {
            id: 1,
            task: 'Alice Johnson',
            completed: true
        }]

    return (
      <>
        <div className="overflow-x-auto">
            <table className="table mt-5">
                {/* head */}
                <thead>
                <tr>
                    <th>Complete?</th>
                    <th>Task</th>
                </tr>
                </thead>
                <tbody>
                {taskList2.map(task => (
                    <tr key={task._id}>
                    <th>
                        <button className="btn btn-square btn-outline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </th>
                    <td>{task.task}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <label className="form-control w-full">
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
                <input
                type="text"
                placeholder="Type here"
                className="input input-bordered text-white w-64" 
                />
                <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddTask} // Replace with your actual handler function
                >
                Add Task
                </button>
            </div>
        </div>
        </label>
        <button
                type="button"
                className="btn btn-primary mt-10"
                onClick={handleAddTask} // Replace with your actual handler function
                >
                Click here to save!
        </button>
      </>
    )
}

export default TaskList
