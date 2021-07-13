const router = require('express').Router();
const spotifyController = require('../controllers/spotifyController');
const locationController = require('../controllers/locationController');
const userController = require('../controllers/userController');
const spotifyAuthController = require('../controllers/spotifyAuthController')

// router.post('/signup', controllers.createUser);
// router.post('/token', controllers.handleToken);
// router.post('/login', controllers.verifyUser);

// This route handles the second step in the Spotify Authorization Process, and intercepts a call from Spotify as specified in the Spotify For Developers App dashboard
router.get('/callback', 
  spotifyAuthController.requestTokens,
  spotifyAuthController.getUserData,
  (req, res) => {
    // TODO: Redirect is currently hardcoded. This should be updated to route to our homepage or search
    res.redirect('http://localhost:8080');
  }
)

// This route handles the initial step in the Spotify Authorization Process
router.get('/login',
  spotifyAuthController.getAuthURL,
  (req, res) => {
    res.redirect(res.locals.authURL)
  });

router.get('/user/:id', 
  userController.sendUserDetails,
  (req, res) => {
    res.status(200).json(res.locals.user);
  });

router.post('/location-search', 
  locationController.sendPotentialLocations,
  (req, res) => {
    res.status(200).json(res.locals.searchResults);
  }
);

router.post('/spotify-token', spotifyController.sendOAuthToken, (req, res) => {
  return res.status(200).json(res.locals.token);
});

router.post('/playlist', spotifyController.sendPlaylist, (req, res) => {
  return res.status(200).json(res.locals);
  // return res.status(200).json(res.locals.playlist);
  //res.locals.concerts
});
module.exports = router;
