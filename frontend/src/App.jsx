import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import MovieDetail from './pages/MovieDetail'

function App() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/movie/:id" element={<MovieDetail/>} />
      </Routes>
      
    </>
  )
}

export default App
