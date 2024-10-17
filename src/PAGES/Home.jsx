import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddVideo from '../COMPONENTS/AddVideo'
import ViewVideo from '../COMPONENTS/ViewVideo'
import AddCategory from '../COMPONENTS/AddCategory'

function Home() {
  const [uploadVideoResponse,setUploadVideoResponse]=useState({})
  const deleteVideoResponse=useState({})
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-between align-items-center">
          <p>Upload Video</p>
          <AddVideo setUploadVideoResponse={setUploadVideoResponse}/>
        </Col>
        <Col>
          <Link to={'/WatchHistory'}>
            <p style={{ float: 'right' }}>Watch History</p>
          </Link>
        </Col>
      </Row>
      <Row className='d-flex'>
        <Col>
          <p>All Videos</p>
          <ViewVideo uploadVideoResponse={uploadVideoResponse} />
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <p>Category</p>
            <AddCategory style={{
              backgroundColor: 'yellow'
            }} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;
