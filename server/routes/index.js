const router = require('express').Router();
const spotifyController = require('../controllers/spotifyController');
const locationController = require('../controllers/locationController');
const userController = require('../controllers/userController');
const spotifyAuthController = require('../controllers/spotifyAuthController')
const querystring = require('querystring');

// This route handles the second step in the Spotify Authorization Process, and intercepts a call from Spotify as specified in the Spotify For Developers App dashboard
router.get('/callback', 
  spotifyAuthController.requestTokens,
  (req, res) => {
    // TODO: Redirect is currently hardcoded. This should be updated to route to our homepage or search
    res.redirect('http://localhost:8080#' +
      querystring.stringify({
        access_token: res.locals.access_token,
        refresh_token: res.locals.refresh_token,
        expires_in: res.locals.expires_in,
      })
    );
  }
)

// This route handles the initial step in the Spotify Authorization Process
router.get('/login',
  spotifyAuthController.getAuthURL,
  (req, res) => {
    res.redirect(res.locals.authURL)
  });

router.get('/user/:access_token', 
  // userController.sendUserDetails,
  userController.getUserData,
  (req, res) => {
    res.status(200).json(res.locals.user);
  });

router.post('/location-search', 
  locationController.sendPotentialLocations,
  (req, res) => {
    res.status(200).json(res.locals.searchResults);
  }
);

router.post('/playlist', spotifyController.sendPlaylist, (req, res) => {
  return res.status(200).json(res.locals);
  // return res.status(200).json(res.locals.playlist);
  //res.locals.concerts
});

router.get('/refresh-token',
  spotifyAuthController.exchangeRefreshToken,
  (req, res) => {
    // TODO: Redirect is currently hardcoded. This should be updated to route to our homepage or search
    res.redirect('http://localhost:8080#' +
      querystring.stringify({
        access_token: res.locals.access_token,
        refresh_token: res.locals.refresh_token,
        expires_in: res.locals.expires_in,
      })
    );
  }
)

module.exports = router;
