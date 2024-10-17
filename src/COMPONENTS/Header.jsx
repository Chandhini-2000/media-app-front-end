import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaMusic } from "react-icons/fa";
function Header() {
  return (
    <Navbar className="bg-body-dark">
    <Container>
      <Navbar.Brand href="/">
        
     <h4 className='text-white fs-1 mx-3 my-2'><FaMusic /> Media Player</h4>
      </Navbar.Brand>
    </Container>
  
  </Navbar>
  )
}

export default Header