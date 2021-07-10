const axios = require('axios');
const config = require('../config');
const { googleMapsApiKey } = config;

const googleMapsSearch = async (searchQuery) => {
  
  try {
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=${googleMapsApiKey}`,
      headers: {},
    };

    return await axios(config).then((response) => response.data.predictions);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = googleMapsSearch;
