import React from 'react'
import {Container} from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <Container 
      fluid={true}  
      data-bs-theme='dark' 
      style={{height: '100vh'}}
      className='w-100 d-flex flex-column'
    >
        <Header/>
        {children}
        <Footer/>
    </Container>
  )
}

export default Layout