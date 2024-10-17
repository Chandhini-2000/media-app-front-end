import { serverUrl } from "./serverUrl";
import { commonAPI } from "./commonAPI";

//Addvideo Api
export const AddVideoAPI=async(reqBody)=>{
return await commonAPI('post',`${serverUrl}/allVideos`,reqBody)
}

//get all videos
export const getVideoAPI = async()=>{
    return await commonAPI('get',`${serverUrl}/allVideos`,{})
}

//delete all videos
export const deleteVideoAPI=async(id)=>{
    return await commonAPI('delete',`${serverUrl}/allVideos/${id}`,"")
}

//add watch history API
export const addWatchAPI=async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/watchhistory`,reqBody)
    }
//get watch history
export const getWatchHistoryAPI = async()=>{
    return await commonAPI('get',`${serverUrl}/watchhistory`,{})
}
//delete watch history
export const deleteWatchHistoryAPI=async(id)=>{
    return await commonAPI('delete',`${serverUrl}/watchhistory/${id}`,"")
}

//add category api
export const AddCategoryAPI=async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/category`,reqBody)
    }

//get category api
export const getCategoryAPI = async()=>{
    return await commonAPI('get',`${serverUrl}/category`,{})
}
//  delete API function
export const deleteCategoryAPI = async (id) => {
    const response = await fetch(`http://localhost:3000/category/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
    return response.json();
  };
  //get  a particular video API
  export const getAVideoDetailsAPI=async(id)=>{
    return await commonAPI('get',`${serverUrl}/allVideos/${id}`,{})
  }
  //update a particular videodetails in a category
  export const updateAVideoDetailsAPI=async(categoryId,categoryDetails)=>{
    return await commonAPI('put',`${serverUrl}/category/${categoryId}`,categoryDetails)
  }