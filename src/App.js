import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import Todolist from './Todolist';
import { useState, useEffect } from "react";

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('/api').then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      {/* {(typeof backendData.users === 'undefined')(
        <p>Loading...</p>
      )
        (backendData.users.map())} */}

      <div className="App">
        <ToastContainer></ToastContainer>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Register' element={<Register />}></Route>
            <Route path='/Login' element={<Login />}></Route>
            <Route path='/Home' element={<Home />}></Route>
            <Route path='/TodoList' element={<Todolist />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
};

export default App;