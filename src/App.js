import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Chats from './pages/Chats';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import {Container} from 'react-bootstrap'

const App = () => {
  return (
    <Router>
      <Container fluid={true}>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/chats' element={<Chats/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/settings' element={<Settings/>}/>
        </Routes>
      </Container>
    </Router>
  )
}

export default App