const { default: axios } = require('axios');

const userController = {};

// This middleware should get user data from spotify, access_token must be passed in

userController.getUserData = async (req, res, next) => {

  const { access_token } = req.params;

  const options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': 'Bearer ' + access_token },
  };

  try {
    const response = await axios(options);
    res.locals.user = response.data;
    return next();
    }
  catch(err) {
    console.log('This is an error in spotifyAuthController.getUserData, ', err);
  }
}


module.exports = userController;
