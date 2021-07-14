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
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState(['spotify:track:4fSIb4hdOQ151TILNsSEaF']);
  const [placeDisplayType, setPlaceDisplayType] = useState('block')


  useEffect(() => {
    handleFetchSpotifyAccessToken();
  }, []);

  
  const handleFetchSpotifyAccessToken = async () => {
    const code = extractQueryParams('code');
    
    // check to see if code exists in URL, if it does not, it will be null
    if (code) {
    const token = await FetchSpotifyAccessToken(code);
    setSpotifyToken(token);
    setLoading(false)
    }
  };
  
  const handleSearchForLocation = async () => {
    const results = await FetchMapSearchResults({ searchQuery: search });
    setSearchResults(results);
    setSearch('');
  };

  const handlePlaylist = async (result) => {

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