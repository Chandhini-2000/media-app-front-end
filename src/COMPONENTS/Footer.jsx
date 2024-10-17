import React from 'react'
import Container from 'react-bootstrap/Container';
import { Row,Col } from 'react-bootstrap';
function Footer() {
  return (
    <div>
        <Container>
        <Row className="d-flex justify-content-center align-items-center">
  <p className="text-white">All rights under media app @mediaapp.com</p>
</Row>

            <Row className='d flex justify-content-center mx-1 text-white'>
                <Col>Media Player</Col>
                <Col>About</Col>
                <Col>Address</Col>
            </Row>
        </Container>
    </div>
  )
}

export default Footer