import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Input,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
} from '@chakra-ui/react';
import { Box, Card, Grid } from '@material-ui/core';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import FetchMapSearchResults from '../api/FetchMapSearchResults';
import FetchPlaylist from '../api/FetchPlaylist';
import Profile from '/client/components/Profile.jsx';
// import FetchSpotifyAccessToken from '../api/FetchSpotifyAccessToken';
import extractQueryParams from '../utils/extractQueryParams.js';
import Map from './Map';
import Player from './Player';
import PlayerBar from './PlayerBar';
import SearchResults from './SearchResults';
import Footer from './Footer'
import style from './Map.css'
import VenueMap from './VenueMap'
import ConcertList from './ConcertList'
// import { ContactSupportOutlined } from '@material-ui/icons';
// import { has } from 'lodash';
import fetchUserDetails from '../api/FetchUserDetails';
const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistData, setPlaylistData] = useState([])
  const [concerts, setConcerts] = useState([])
  const [spotifyToken, setSpotifyToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState(['spotify:track:4fSIb4hdOQ151TILNsSEaF']);
  const [placeDisplayType, setPlaceDisplayType] = useState('block')

  // new state for tokens being returned from backend auth
  // const [access_token, setAccess_token] = useState('');
  const [refresh_token, setRefresh_token] = useState('')
  const [expires_in, setExpires_in] = useState('')

  // state for username
  const [display_name, setDisplay_name] = useState('');

  /* This function is used to parse the URL. When spotify athenticates a user or refreshes a token, an access_token, refresh_token
  and expires_in are sent to the user in the URL. This function parses the URL, sets state to the returned values, and then removes
  the URL with the user data from the browser and the browser history*/
  function getHashParams() {
    // added this conditional to prevent possible render wiping the existing access_token state. 
    // TODO: refactor if implementing refresh token
    if (!access_token) {
      const hashParams = {};
      let e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      setAccess_token(hashParams.access_token);
      // setSpotifyToken(hashParams.access_token);
      setRefresh_token(hashParams.refresh_token);
      setExpires_in(Date.now() + parseInt(hashParams.expires_in));
      history.replaceState(null, '', '/')
    }
  }
  
  const access_token = 'BQDO1-A5RkMrSD7HkE3VVW8WhzuAch743QU5_chWMIEsj5vsY2C4LGCI0sBvl3hisxoWHZ0Jnc-uCMlLnSloGqU14nLBgBFErniYqc4vvbVCMbbKKEB7f8MOMEHPqlJQO9WnLPE3SMynWt3qP_VN556xRKhk9CT4O5rlwtzhwvLME7TjHRKgUhlkRAPZha7rb9CMOVlj5L6C2NqH4ly0OggPU3nJtE7dcRlY4ds'
  
  /* This useEffect will invoke getHashParams*/
  // useEffect(( )=> {
  //   getHashParams();
  // }, []);

  // Get user details
  useEffect(async () => {
      const userDetails = await fetchUserDetails(access_token);
      setDisplay_name(userDetails.display_name);
  }, []);
 
  /* This will grab a new token if the current token is expired */
  // TODO: test this functionality
  // useEffect(() => {
  //   if (Date.now() > expires_in) {
  //     fetchRefreshToken(refresh_token);
  //   };
  //    []});

  // useEffect(() => {
  //   handleFetchSpotifyAccessToken();
  // }, []);

  // comment this in? Or, out?
  useEffect(() => {
    handleTrack();
  }, [playlist,playlistData]);

  const handleTrack = () => {
    if(playlist[0]) setTrack(track);
    console.log(track)
  };
  
// const handleFetchSpotifyAccessToken = async () => {
//   const code = extractQueryParams('code');
//   // console.log('code in search.jsx: ', code);
//   // check to see if code exists in URL, if it does not, it will be null
//   if (code) {
//   const token = await FetchSpotifyAccessToken(code);
//   // console.log("Token: ", token);
//   setSpotifyToken(token);
//   setLoading(false)
//   }
// };
  
  const handleSearchForLocation = async () => {
    const results = await FetchMapSearchResults({ searchQuery: search });
    setSearchResults(results);
  };

  const handlePlaylist = async (result, access_token) => {
    const playlistConcert = await FetchPlaylist({ placeId: result.place_id, access_token: access_token })
    .then((data)=>{
      console.log(data)
      setPlaylistData(data.playlist);
      setConcerts(data.concerts)
    })
 
    const artistList = [];
    const showList = [];
    const trackList = [];
    
    //remove duplicates from api call result
    for(const entry of playlistData){
      if(artistList.includes(entry.artist.name)) continue;
      artistList.push(entry.artist.name);
      showList.push(entry);
      trackList.push(entry.track.uri)
    };
    
    setPlaylist(showList);
    setTrack(trackList);
  };
  if (loading) return <p>Loading</p>
searchResults && console.log('SEARCH RESULTS ', searchResults)
  return (
    <div>
      <Grid container>
      <Grid item xs={12}>
      <div >
        { display_name &&
        <div>
          Welcome, {display_name}
        </div>
        }
        <div className='title'>In The Loop ∞
        <InfoOutlineIcon 
        onClick={onOpen} 
        mt={2} 
        ml={5} 
        mr={5}
        mb={2} 
        cursor="pointer" 
        w={5} 
        h={5}
        />
        </div>
        <div className="searchbar">
        <Input
          mt={2}
          ml={10}
          mr={7}
          bg="white"
          placeholder="Enter your Zip Code to hear artists playing near you"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              
              setPlaceDisplayType('block')
              handleSearchForLocation();
            }
          }}
        />
        </div>
        </div>
        <div className="places">Search for concerts and events near you!
          </div>
        </Grid>
        <Grid item xs={4}>
          <ConcertList playlistData={playlistData} setTrack={setTrack}/>
        </Grid>
        <Grid item xs={8}>
      <VenueMap/>
      </Grid>
      </Grid>
      {/* <Map /> */}


        <Drawer placement="right" onClose={onClose} isOpen={isOpen} w={'25%'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Your Profile</DrawerHeader>
            <DrawerBody>
              {/*<Profile spotifyToken={spotifyToken} />*/}
              <Profile />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <div className="placesPanel">
          
          
      {searchResults.length > 0 && playlist.length === 0 && (
        <SearchResults
          access_token={access_token}
          searchResults={searchResults} 
          handlePlaylist={handlePlaylist} 
          placeDisplayType={placeDisplayType}  
          setPlaceDisplayType={setPlaceDisplayType}  
          className="place-item" />
      )}
      
      </div>

       <PlayerBar 
          access_token={access_token} 
          track={track} 
          playlist={playlist}
       />
       
      <Footer />
    </div>
  );
};

export default Search;