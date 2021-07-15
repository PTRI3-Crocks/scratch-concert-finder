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
import { Box, Card, Grid } from '@material-ui/core';
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

  useEffect(( )=> {
    getHashParams();
  }, [])
 



  useEffect(() => {
    handleFetchSpotifyAccessToken();
  }, []);

  // comment this in? Or, out?
  useEffect(() => {
    handleTrack();
  }, [playlist,playlistData]);

  const handleTrack = () => {
    if(playlist[0]) setTrack(track);
    console.log(track)
  };
  
  const handleFetchSpotifyAccessToken = async () => {
    const code = extractQueryParams('code');
    // console.log('code in search.jsx: ', code);
    // check to see if code exists in URL, if it does not, it will be null
    if (code) {
    const token = await FetchSpotifyAccessToken(code);
    // console.log("Token: ", token);
    setSpotifyToken(token);
    setLoading(false)
    }
  };
  
  const handleSearchForLocation = async () => {
    // search && console.log(search,'SEARCH CLICKED')
    const results = await FetchMapSearchResults({ searchQuery: search });
    setSearchResults(results);
  };

  const handlePlaylist = async (result) => {
     console.log('HANDLE PLAYLIST ',result.structured_formatting.main_text)
     setMapZip(result.structured_formatting.main_text)
    console.log('MAPZIP ',mapZip)
    const playlistConcert =  FetchPlaylist({ placeId: result.place_id })
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
playlistData && console.log('PLAYLIST DATA ', playlistData['0']?.location)
  return (
    <div>
      <Grid container>
      <Grid item xs={12}>
      <div >
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
          <ConcertList playlistData={playlistData} setTrack={setTrack} cardClicked={cardClicked} setCardClicked ={setCardClicked}/>
        </Grid>
        <Grid item xs={8}>
      <VenueMap search={search} mapZip ={mapZip} playlistData={playlistData} cardClicked={cardClicked}/>
      </Grid>
      </Grid>
      {/* <Map /> */}


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
          
          
      {searchResults.length > 0 && playlist.length === 0 && (
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