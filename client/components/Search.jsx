import React, { useState, useEffect } from 'react';
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
import { InfoOutlineIcon } from '@chakra-ui/icons';
import FetchMapSearchResults from '../api/FetchMapSearchResults';
import FetchPlaylist from '../api/FetchPlaylist';
import Profile from '/client/components/Profile.jsx';
import FetchSpotifyAccessToken from '../api/FetchSpotifyAccessToken';
import extractQueryParams from '../utils/extractQueryParams.js';
import Map from './Map';
import Player from './Player';
import PlayerBar from './PlayerBar';
import SearchResults from './SearchResults';
import Footer from './Footer'
import style from './Map.css'
import VenueMap from './VenueMap'
import ConcertList from './ConcertList'


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
    height: '78vh',
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
  const [spotifyToken, setSpotifyToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('')
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState(['spotify:track:4fSIb4hdOQ151TILNsSEaF']);
  const [placeDisplayType, setPlaceDisplayType] = useState('block')
  const [mapZip, setMapZip] = useState('08901')
  const [cardClicked, setCardClicked] = useState(null)


  const classes = useStyles();

  function getHashParams() {
    const hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    let access_token = hashParams.access_token;
    let refresh_token = hashParams.refresh_token;
    
    console.log('access_token in search.jsx ', access_token);
    console.log('refresh_token in search.jsx ', refresh_token);

    setSpotifyToken(access_token);
    setRefreshToken(refresh_token);

    history.replaceState(null, '', '/')
  }

  // useEffect(( )=> {
  //   getHashParams();
  // }, [])
 
  useEffect(() => {
    handleFetchSpotifyAccessToken();
  }, []);

  
  const handleFetchSpotifyAccessToken = async () => {
    const code = extractQueryParams('code');
    
    // check to see if code exists in URL, if it does not, it will be null
    if (code) {
    const token = await FetchSpotifyAccessToken(code);
    setSpotifyToken(token);
    setLoading(false);
    }
  };
  
  const handleSearchForLocation = async () => {
    const results = await FetchMapSearchResults({ searchQuery: search });
    setSearchResults(results);
    setSearch('');
  };

  const handlePlaylist = async (result) => {
     
    setMapZip(result.structured_formatting.main_text);
    const playlistConcert =  FetchPlaylist({ placeId: result.place_id })
    .then((data)=>{
      setPlaylistData(data.playlist);
      setConcerts(data.concerts)
    });
 
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
  return (
    <div>
      <Grid container>
      <Grid item xs={12} className={classes.header}>
      <div>
        <div className={classes.title}>In The Loop ∞
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
          bg="#f1faee"
          color="#1d3557"
          fontWeight="500"
          placeholder="Enter your Zip Code to hear artists playing near you"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              
              await setPlaceDisplayType('block')
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
      

        <Drawer placement="right" onClose={onClose} isOpen={isOpen} w={'25%'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Your Profile</DrawerHeader>
            <DrawerBody>
              <Profile spotifyToken={spotifyToken} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <div className="placesPanel">
          
          
      {searchResults.length > 0 && (
        <SearchResults 
          searchResults={searchResults} 
          handlePlaylist={handlePlaylist} 
          placeDisplayType={placeDisplayType}  
          setPlaceDisplayType={setPlaceDisplayType}  
          className="place-item" />
      )}
      
      </div>
       {spotifyToken !== '' && 
       <PlayerBar 
          spotifyToken={spotifyToken} 
          track={track} 
          playlist={playlist}
       />}
       
      <Footer />
    </div>
  );
};

export default Search;