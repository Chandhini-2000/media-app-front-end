import axios from 'axios';

export const commonAPI = async (httpMethod, url, reqBody) => {
    let reqConfig = {
        method: httpMethod,  // Make sure httpMethod is passed here
        url,
        data: reqBody
    };
    return await axios(reqConfig).then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};
