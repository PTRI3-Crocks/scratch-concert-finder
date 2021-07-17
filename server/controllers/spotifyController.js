const { getPlaylist } = require('../services/getPlaylist');

//THIS IS CURRENTLY NOT BEING USED
const spotifyController = {};

spotifyController.sendPlaylist = async (req, res, next) => {
  try {
    const results = await getPlaylist(req.body);
    // const playlist = await getPlaylist(req.body);
    const { concerts } = results;
    const { playlist } = results;
    res.locals.playlist = playlist;
    res.locals.concerts = concerts;
    // results && console.log('PLAYLIST SPOT CTRLR ', concerts);

    return next();
  } catch (err) {
    return next({
      log: 'spotifyController.sendPlaylist error',
      message: {
        err: `Error occurred in spotifyController.sendPlaylist. err log: ${err}`,
      },
    });
  }
};

module.exports = spotifyController;
