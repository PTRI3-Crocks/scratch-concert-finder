const googleMapsSearch = require('./googleMapsSearch');

const getLocationSearchResults = async (searchQuery) => {
  try {
    const locations = await googleMapsSearch(searchQuery);
    return locations;
  } catch (e) {
    throw new Error(`getLocationSearchResults error: ${e.message}`);
  }
};

module.exports = {
  getLocationSearchResults,
};
