const { default: axios } = require('axios');

const userController = {};

// This middleware should get user data from spotify, access_token must be passed in
userController.getUserData = (req, res, next) => {
  console.log('This is req.params', req.params);
  const { access_token } = req.params;
    // use the access token to access the Spotify Web API
    const options = {
      method: 'GET',
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
    };
    // use the access token to access the Spotify Web API
    axios(options)
    .then((response) => {
      // console.log('getUserData from Spotify response: ', response);
      res.locals.user = response.data;
      console.log('User data: ', res.locals.user);
      return next();
    })
    .catch ((err) => console.log('This is an error in spotifyAuthController.getUserData, ', err));
}


module.exports = userController;
