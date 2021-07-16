const { getPlaylist } = require('../services/getPlaylist');
// const spotifyAccessToken = require('../services/spotifyAccessToken');
// const spotifyAccessTokenOAuth = require('../services/spotifyAccessTokenOAuth');
// const { Token, User } = require('../db/index');

//THIS IS CURRENTLY NOT BEING USED
const spotifyController = {};

// spotifyController.handleToken = async (req, res, next) => {
//   let { tokenId } = req.query;
//   if (!tokenId) return next('No token!');
//   try {
//     tokenId = await spotifyAccessToken(tokenId);
//     // console.log('tokenId in handleToken', tokenId);
//     res.status(200).json(tokenId);
//     next();
//   } catch (e) {
//     console.log(e.message);
//     res.sendStatus(500) && next(e);
//   }
// };

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

// spotifyController.sendOAuthToken = async (req, res, next) => {
//   const { code } = req.body;
//   console.log('CODE ', code);

//   try {
//     let token;
//     if (code) {
//       const newSpotifyToken = await spotifyAccessTokenOAuth(code);
//       // console.log('token in sendOAuthToken', newSpotifyToken);
//       token = newSpotifyToken.access_token;
//       token && console.log('TOKEN ', token);
//     } else {
//       // if there is no auth code, I think this else statement just pulls a token from the database...a token from a different user...
//       const spotifyToken = await Token.findOne({ source: 'Spotify OAuth' })
//         .limit(1)
//         .sort({ $natural: -1 });
//       token = spotifyToken.tokenId;
//     }
//     res.locals.token = token;

//     return next();
//   } catch (err) {
//     return next({
//       log: 'sendSpotifyOAuthToken controller error',
//       message: {
//         err: `Error occurred in sendSpotifyOAuthToken. err log: ${err}`,
//       },
//     });
//   }
// };

module.exports = spotifyController;
