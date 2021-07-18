import axios from 'axios';
//populates suggested search locations from search bar
const FetchMapSearchResults = async ({ searchQuery }) => {
  try {
    const response = await axios.post('/api/location-search', { searchQuery });
    return response.data;
  }
  catch (e) {
    console.log(e);
  }
};

export default FetchMapSearchResults;
