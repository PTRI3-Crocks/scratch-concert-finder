
import axios from 'axios';

// This fetch request should return user details from the current user spotify API
const fetchUserDetails = async (access_token) => {
  try {
    const response = await axios.get(`/api/user/${access_token}`);
    // IF enabled this console.log will display the access_token, which can be copied from the console and hardcoded into search.jsx for dev purposes
    // console.log('This is the response with user data', response.data);
    return response.data;
  }
  catch(error) {
    console.log('Error in fetchUserDetails: ', error);
  }
};

export default fetchUserDetails;
