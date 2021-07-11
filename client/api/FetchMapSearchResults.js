import axios from 'axios';
//populates suggested search locations from search bar
const FetchMapSearchResults = async ({ searchQuery }) => {
  try {
    return axios.post('/api/location-search', { searchQuery }).then((response) => response.data);
  } catch (e) {
    console.log(e);
  }
};

export default FetchMapSearchResults;
