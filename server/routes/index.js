const router = require('express').Router();
const controllers = require('../controllers');


router.post('/signup', controllers.createUser);
router.post('/token', controllers.handleToken);
// router.post('/login', controllers.verifyUser);
router.post('/playlist', 
  controllers.sendPlaylist, 
  (req, res) => {
    return res.status(200).json(res.locals.playlist);
  });

router.post('/location-search', 
  controllers.sendPotentialLocations,
  (req, res) => {
    res.status(200).json(res.locals.searchResults);
  });

router.get('/user/:id', 
  controllers.sendUserDetails,
  (req, res) => {
    res.status(200).json(res.locals.user);
  });

router.post('/spotify-token', 
  controllers.sendSpotifyOAuthToken,
  (req, res) => {
    return res.status(200).json(res.locals.token);
  });

module.exports = router;
