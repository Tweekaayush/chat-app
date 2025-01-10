import React from 'react'
import {Navbar, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <Navbar >
      <Container fluid = {true}>
        <Navbar.Brand as={Link} to='/' className='fs-3'>
          Chat App
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header