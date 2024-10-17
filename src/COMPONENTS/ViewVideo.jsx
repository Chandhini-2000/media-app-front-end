import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import VideoCard from './VideoCard';
import { getVideoAPI } from '../Services/allAPIs';

function ViewVideo() {
  const [Video, setVideo] = useState([]);

  // Function to fetch video data from the API
  const getVideo = async () => {
    const response = await getVideoAPI();
    console.log(response.data);
    setVideo(response.data); // Update the state with the fetched video data
  };

  console.log(Video); // Log the video array to check the response

  useEffect(() => {
    getVideo(); // Fetch the video data when the component mounts
  }, []);

  return (
    <div>
      <Row className="border border-white">
        {
          Video.length !== 0 ? Video.map((item, index) => (
            <Col key={index}>
              <VideoCard videoDetails={item} />
            </Col>
          )) : null
        }
      </Row>
    </div>
  );
}

export default ViewVideo;
