import axios from 'axios';

const FetchUserDetails = async ({ id }) => {
  try {
    return axios.get(`/api/user/${id}`).then((response) => response.data);
  } catch (e) {
    console.log(e);
  }
};

export default FetchUserDetails;
