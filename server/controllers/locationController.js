const { getLocationSearchResults } = require('../services/getLocationSearchResults');

const locationController = {};

locationController.sendPotentialLocations = async (req, res, next) => {
  const { searchQuery } = req.body;
  try {
    const searchResults = await getLocationSearchResults(searchQuery);
    res.locals.searchResults = searchResults;

    return next();
  } catch(err){
    return next({
        log: 'locationController.sendPotentialLocations error',
        message: { err: `Error occurred in locationController.sendPotentialLocations. err log: ${err}` },
      });
  }
};

module.exports = locationController;