import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addWatchAPI, deleteVideoAPI } from '../Services/allAPIs';

function VideoCard({ videoDetails, onDropHandler }) {
  const [show, setShow] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteVideoAPI(id); 
      window.location.reload(); // Reload after deletion
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    setShow(true);
    const { caption, url } = videoDetails;

    let today = new Date();
    let timestamp = new Intl.DateTimeFormat('en-US', {
      year: "numeric", month: "numeric", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    }).format(today);

    let details = { caption, url, timestamp };
    const response = await addWatchAPI(details);
    console.log(response);
  };

  const dragStarted = (e, videoId) => {
    console.log("Video drag started: " + videoId);
    e.dataTransfer.setData("videoId", videoId); // Store video ID in the dataTransfer object
  };

  return (
    <div>
      <Row>
        <Col style={{ display: 'inline-block' }}>
          <Card
            draggable={true} // Ensure the draggable attribute is on the Card
            onDragStart={(e) => dragStarted(e, videoDetails.id)} // Handle drag start
            style={{ width: '10rem', display: 'inline-block' }}
          >
            <Card.Img
              variant="top"
              src={videoDetails.img}
              style={{ cursor: 'pointer' }}
              onClick={handleShow} 
            />
            <Card.Body>
              <Card.Text className="d-flex justify-content-between align-items-center">
                <p>{videoDetails.caption}</p>
                <MdOutlineDeleteOutline
                  onClick={() => handleDelete(videoDetails.id)}
                  className='fs-3 fw-bolder'
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for video */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{videoDetails.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="315"
            src={videoDetails.url}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VideoCard;
