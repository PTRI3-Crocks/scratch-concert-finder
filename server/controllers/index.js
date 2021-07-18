const { getPlaylist } = require('../services/getPlaylist');
const { getLocationSearchResults } = require('../services/getLocationSearchResults');

const sendPlaylist = async (req, res, next) => {
  try {
    const playlist = await getPlaylist(req.body);
    res.locals.playlist = playlist;
    
    return next();
  } catch(err){
    return next({
        log: 'sendPlaylist controller error',
        message: { err: `Error occurred in sendPlaylist. err log: ${err}` },
      });
  }
};

const sendPotentialLocations = async (req, res, next) => {
  const { searchQuery } = req.body;
  try {
    const searchResults = await getLocationSearchResults(searchQuery);
    res.locals.searchResults = searchResults;

    return next();
  } catch(err){
    return next({
        log: 'sendPotentialLocations controller error',
        message: { err: `Error occurred in sendPotentialLocations. err log: ${err}` },
      });
  }
};

module.exports = {
  sendPlaylist,
  sendPotentialLocations,
};
