const axios = require('axios');
const config = require('../config');
const { googleMapsApiKey } = config;

const googleMapsSearch = async (searchQuery) => {
 
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=${googleMapsApiKey}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    return response.data.predictions;
  } 
  catch (e) {
    throw new Error(e.message);
  }
};

module.exports = googleMapsSearch;
