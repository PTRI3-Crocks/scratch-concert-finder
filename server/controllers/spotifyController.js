const { getPlaylist } = require('../services/getPlaylist');

const spotifyController = {};

spotifyController.sendPlaylist = async (req, res, next) => {
  try {
    const results = await getPlaylist(req.body);
    res.locals.playlist = results.playlist
    res.locals.concerts = results.concerts;
    return next();
  } 
  catch (err) {
    return next({
      log: 'spotifyController.sendPlaylist error',
      message: {
        err: `Error occurred in spotifyController.sendPlaylist. err log: ${err}`,
      },
    });
  }
};

module.exports = spotifyController;
