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
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import FetchMapSearchResults from '../api/FetchMapSearchResults';
import FetchPlaylist from '../api/FetchPlaylist';
import Map from './Map';
import Player from './Player';
import PlayerBar from './PlayerBar';
import SearchResults from './SearchResults';
import Footer from './Footer'
import style from './Map.css'
import VenueMap from './VenueMap'
import ConcertList from './ConcertList'
import fetchUserDetails from '../api/FetchUserDetails';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  header:{
    // boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.4) ',
    height: '100%',
    backgroundColor:'#457b9d',
    color:'#f1faee',
    fontSize:'100%',
    marginTop: '10px',
    
    
  },
  title:{
    marginLeft: '40px',
    fontSize:'120%',
    fontWeight: '500'
  },

  mapContainer:{
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.4)',
    height: '82vh',
    backgroundColor:'#f1faee',
    margin: 1,
    padding: 1,
  },
  root: {
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.4) ',
    height: '100%',
    margin: 1,
    padding: 1,
    
  }
}));

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistData, setPlaylistData] = useState([])
  const [concerts, setConcerts] = useState([])
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState(['spotify:track:4fSIb4hdOQ151TILNsSEaF']);
  const [placeDisplayType, setPlaceDisplayType] = useState('block')
  const [mapZip, setMapZip] = useState('08901')
  const [cardClicked, setCardClicked] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);

  /* state for tokens being returned from spotify auth */
  const [access_token, setAccess_token] = useState('');
  const [refresh_token, setRefresh_token] = useState('')
  const [expires_in, setExpires_in] = useState('')
  const [display_name, setDisplay_name] = useState('');

  const classes = useStyles();

  /* This function is used to parse the URL. When spotify athenticates a user or refreshes a token, an access_token, refresh_token
  and expires_in are sent to the user in the URL. This function parses the URL, sets state to the returned values, and then removes
  the URL with the user data from the browser and the browser history*/
  function getHashParams() {
    // TODO: refactor if implementing refresh token
    if (!access_token) {
      const hashParams = {};
      let e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      setAccess_token(hashParams.access_token);
      setRefresh_token(hashParams.refresh_token);
      setExpires_in(Date.now() + parseInt(hashParams.expires_in));
      history.replaceState(null, '', '/')
    }
  }
  
  /* This useEffect will invoke getHashParams*/
  useEffect(( )=> {
    getHashParams();
  }, []);

  /* Get user details */
  useEffect(async () => {
    if(access_token) {
      const userDetails = await fetchUserDetails(access_token);
      setDisplay_name(userDetails.display_name);
    }
  }, [access_token]);
 
  /* This will grab a new token if the current token is expired */
  // TODO: test this functionality
  // useEffect(() => {
  //   if (Date.now() > expires_in) {
  //     fetchRefreshToken(refresh_token);
  //   };
  //    []});

  useEffect(() => {
    handleTrack();
  }, [playlist,playlistData]);

  const handleTrack = () => {
    if(playlist[0]) setTrack(track);
    console.log(track)
  };
  
  const handleSearchForLocation = async () => {
    const results = await FetchMapSearchResults({ searchQuery: search });
    setSearchResults(results);
    setSearch('');
  };

  const handlePlaylist = async (result, access_token) => {

    setMapZip(result.structured_formatting.main_text)
    if (access_token) {
      const playlistConcert = await FetchPlaylist({ placeId: result.place_id, access_token: access_token })

      setPlaylistData(playlistConcert.playlist);
      setConcerts(playlistConcert);
  
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
  }
  };

  if (loading) return <p>Loading</p>

return (
  <div>
    <Grid container>
    <Grid item xs={12} className={classes.header}>
    <div>
      <div className='headerTitle'>
        In The Loop ∞      
        {display_name 
          ?  
          <span>
            Welcome, {display_name}
          </span> 
          :  
          <a href={"api/login"} className='login'>Log In</a>
        }
      </div>
      <div className="searchbar">
        <Input
          mt={2}
          ml={10}
          mr={7}
          bg="#f1faee"
          color="#1d3557"
          fontWeight="500"
          placeholder="Enter your Zip Code to hear artists playing near you"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {   
              await setPlaceDisplayType('block')
              await handleSearchForLocation();
            }
          }}
        />
      </div>
    </div>
    <div className="places">
      Search for concerts and events near you!
    </div>
    </Grid>
    <Grid item xs={4}>
      <ConcertList 
        playlistData={playlistData} 
        setTrack={setTrack} 
        cardClicked={cardClicked} 
        setCardClicked={setCardClicked}
        />
    </Grid>
    <Grid item xs={8} >
      <Container 
        className={classes.mapContainer}>
        <VenueMap 
          search={search} 
          mapZip ={mapZip} 
          playlistData={playlistData} 
          cardClicked={cardClicked}
          />
        </Container>   
      </Grid>
    </Grid>
    <div className="placesPanel">  
      {searchResults.length > 0 && (
        <SearchResults
          access_token={access_token}
          searchResults={searchResults} 
          handlePlaylist={handlePlaylist} 
          placeDisplayType={placeDisplayType}  
          setPlaceDisplayType={setPlaceDisplayType}  
          className="place-item" />
      )}
    </div>
      {access_token 
        ? 
        <PlayerBar 
          access_token={access_token} 
          track={track} 
          playlist={playlist}
        />
        : 
        <p>
          Log in to listen to artists
        </p>
      }
    <Footer />
  </div>
)};

export default Search;