const { getPlaylist } = require('../services/getPlaylist');
const spotifyAccessToken = require('../services/spotifyAccessToken');
const spotifyAccessTokenOAuth = require('../services/spotifyAccessTokenOAuth');
const { Token, User } = require('../db/index');


//THIS IS CURRENTLY NOT BEING USED
const spotifyController = {};

spotifyController.handleToken = async (req, res, next) => {
  let { tokenId } = req.query;
  if (!tokenId) return next('No token!');
  try {
    tokenId = await spotifyAccessToken(tokenId);
    res.status(200).json(tokenId);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};


spotifyController.sendPlaylist = async (req, res, next) => {
  try {
    const playlist = await getPlaylist(req.body);
    res.locals.playlist = playlist;
    
    return next();
  } catch(err){
    return next({
        log: 'spotifyController.sendPlaylist error',
        message: { err: `Error occurred in spotifyController.sendPlaylist. err log: ${err}` },
      });
  }
};


spotifyController.sendOAuthToken = async (req, res, next) => {
  const { code } = req.body;
  
  try {
    let token;
    if (code) {
      const newSpotifyToken = await spotifyAccessTokenOAuth(code);
      token = newSpotifyToken.access_token;
    } else {
      const spotifyToken = await Token.findOne({ source: 'Spotify OAuth' })
        .limit(1)
        .sort({ $natural: -1 });
      token = spotifyToken.tokenId;
    }
    res.locals.token = token;
    
    return next();
  } catch(err){
    return next({
        log: 'sendSpotifyOAuthToken controller error',
        message: { err: `Error occurred in sendSpotifyOAuthToken. err log: ${err}` },
      });
  }
};

module.exports = spotifyController;
