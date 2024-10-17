import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaCloudUploadAlt } from "react-icons/fa";
import { AddVideoAPI } from '../Services/allAPIs';
import Swal from 'sweetalert2'

function AddVideo() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [videoDetails, setVideoDetails] = useState({
    caption: "",
    img: '',
    url: ""
  });

  const getEmbedLink = (e) => {
    const { value } = e.target;
    console.log(value);
  
    // Extract last 11 characters of the URL (video ID)
    let yCode = value.slice(-11);  // Fix this to handle various URL structures as needed
  
    // Create the YouTube embed link
    let yLink = `https://www.youtube.com/embed/${yCode}`;
  
    // Update state with the YouTube embed link
    setVideoDetails({ ...videoDetails, url: yLink });
  };

  // Function to handle the upload and log the video details
  const handleUpload = async () => {
    const { caption, url, img } = videoDetails;

    // Validate the input fields
    if (!caption || !url || !img) {
      alert("Please fill all the details");
    } else {
      const response = await AddVideoAPI(videoDetails);

      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          title: 'Success!',
          text: 'Video added successfully',
          icon: 'success',
          confirmButtonText: 'Back'
        })
        setVideoDetails({
          caption: "",
          img: "",
          url: ""
        });
        handleClose();
      } else {
        Swal.fire({
          title: 'Error!',
          text: response.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        setVideoDetails({
          caption: "",
          img: "",
          url: ""
        });
      }
    }
  };

  return (
    <div>
      <Button variant='light' className='rounded m-2' onClick={handleShow}><FaCloudUploadAlt /></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>

        <Modal.Body> 
          <h5>Please fill in the details</h5>
          <InputGroup className="mb-3">
            <Form.Control 
              onChange={e => setVideoDetails({ ...videoDetails, caption: e.target.value })}
              placeholder="Video Caption"
              aria-label="Video Caption"
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control 
              onChange={e => setVideoDetails({ ...videoDetails, img: e.target.value })}
              placeholder="Video Image URL"
              aria-label="Video Image"
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control 
              onChange={getEmbedLink}
              placeholder="YouTube Video URL"
              aria-label="Video URL"
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddVideo;
