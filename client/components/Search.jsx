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



const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  // intialize spotifyToken to null to make checking it's value more simple
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState(['spotify:track:4fSIb4hdOQ151TILNsSEaF']);
  

  useEffect(() => {
    handleFetchSpotifyAccessToken();
  }, []);

  useEffect(() => {
    handleTrack();
  }, []);

  const handleTrack = () => {
    if(playlist[0]) setTrack(track);
    console.log(track)
  };
  
  const handleFetchSpotifyAccessToken = async () => {
    const code = extractQueryParams('code');
    console.log('code in search.jsx: ', code);
    // check to see if code exists in URL, if it does not, it will be null
    if (code) {
    const token = await FetchSpotifyAccessToken(code);
    console.log("Token: ", token);
    setSpotifyToken(token);
    setLoading(false)
    }
  };
  
  const handleSearchForLocation = async () => {
    const results = await FetchMapSearchResults({ searchQuery: search });
    setSearchResults(results);
  };

  const handlePlaylist = async (result) => {
    const playlistData = await FetchPlaylist({ placeId: result.place_id });
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
      <Map />
      <div className='box overlay'>
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
              handleSearchForLocation();
            }
          }}
        />
        </div>
        </div>

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
          <div className="places">Search for concerts and events near you!
          </div>
          
      {searchResults.length > 0 && playlist.length === 0 && (
        <SearchResults searchResults={searchResults} handlePlaylist={handlePlaylist} className="place-item"/>
      )}
      {playlist.length > 0 && <Player playlist={playlist}/>}
      </div>
       {spotifyToken !== '' && <PlayerBar spotifyToken={spotifyToken} track={track} />}
      <Footer />
    </div>
  );
};

export default Search;