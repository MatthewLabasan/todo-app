import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn></LogIn>} />
          <Route path='/login' element={<LogIn></LogIn>} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='*' element={<NoPage></NoPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
