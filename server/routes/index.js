const router = require('express').Router();

const spotifyController = require('../controllers/spotifyController');
const locationController = require('../controllers/locationController');
const userController = require('../controllers/userController');

// router.post('/signup', controllers.createUser);
// router.post('/token', controllers.handleToken);
// router.post('/login', controllers.verifyUser);




router.get('/user/:id', 
  userController.sendUserDetails,
  (req, res) => {
    res.status(200).json(res.locals.user);
  });

router.post('/location-search', 
  locationController.sendPotentialLocations,
  (req, res) => {
    res.status(200).json(res.locals.searchResults);
  });

router.post('/spotify-token', 
  spotifyController.sendOAuthToken,
  (req, res) => {
    return res.status(200).json(res.locals.token);
  });
  
router.post('/playlist', 
  spotifyController.sendPlaylist, 
  (req, res) => {
    return res.status(200).json(res.locals.playlist);
  });
module.exports = router;
