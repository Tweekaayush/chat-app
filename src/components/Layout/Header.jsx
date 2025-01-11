import React from 'react'
import {Navbar, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <Navbar >
      <Container fluid = {true} className='p-0'>
        <Navbar.Brand as={Link} to='/' className='fs-3 text-1'>
          Chat App
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header