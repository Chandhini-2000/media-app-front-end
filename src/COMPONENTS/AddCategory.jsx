import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'; // Import Card component
import { AddCategoryAPI, getCategoryAPI, deleteCategoryAPI, getAVideoDetailsAPI, updateAVideoDetailsAPI } from '../Services/allAPIs'; // Ensure you have a deleteCategoryAPI function
import VideoCard from './VideoCard';


function AddCategory() {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [CategoryDetails, setCategoryDetails] = useState([]);

  const handleCategory = async () => {
    if (categoryName) {
      const body = {
        categoryName,
        allVideos: []
      };
      try {
        const result = await AddCategoryAPI(body);
        console.log(result);
        alert("Category successfully added");
        setCategoryName(''); // Clear the input field
        getCategory(); // Fetch updated category list after adding
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getCategory = async () => {
    try {
      const result = await getCategoryAPI();
      setCategoryDetails(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategoryAPI(id); // Call the delete API
      setCategoryDetails((prev) => prev.filter(item => item.id !== id)); // Remove deleted category from state
      alert("Category successfully deleted");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSave = async () => {
    await handleCategory();
    setShow(false); // Close modal after saving
  };

  const videoDropped=async(e,categoryId)=>{
    const videoId=e.dataTransfer.getData("videoId")
    console.log("Video Dropped" +categoryId, "Video Id" +videoId);
    console.log(e);
    //fetch the video details
const {data} = await getAVideoDetailsAPI(videoId)
console.log(data);
//add details to category
const selectedCategory=CategoryDetails.find(item=>item.id==categoryId)
selectedCategory.allVideos.push(data)
console.log(selectedCategory);
const updatecategory=await updateAVideoDetailsAPI(categoryId,selectedCategory)
console.log(updatecategory);
getCategory();
  }   
const dragOver=(e)=>{
  e.preventDefault();
  console.log("Video Over");
  
}
return (
  <>
    <Button variant="primary" onClick={handleShow}>
      Add Category
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategory">
            <Form.Control
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>

    <div className="row">
      {
        CategoryDetails.length > 0 ? (
          CategoryDetails.map(item => (
            <div 
              droppable="true" 
              onDragOver={dragOver} 
              onDrop={(e) => videoDropped(e, item.id)} 
              className="col-md-4 flex" 
              key={item.id}
            >
              <Card style={{ marginBottom: '20px' }}>
                <Card.Body>
                  <Card.Title>{item.categoryName}</Card.Title>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                  <div className="row">
                    {
                      item.allVideos.length > 0 ? (
                        item.allVideos.map(video => (
                          <div className="col" key={video.id}>
                            <VideoCard videoDetails={video} />
                          </div>
                        ))
                      ) : (
                        <p>No Videos</p>
                      )
                    }
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No Data</p>
        )
      }
    </div>
  </>
);
}

export default AddCategory;


  