import React, {useState} from 'react';
import { Center } from '@chakra-ui/react';

const SearchResults = ({ searchResults, handlePlaylist, placeDisplayType, setPlaceDisplayType, access_token }) => {

  console.log(placeDisplayType, 'DISPLAY IN RESULTS')
  const style = {
    display:placeDisplayType,
    backgroundColor: 'd3d3d3'
  }
  return (
  <div className="placePanel" style={{ cursor: 'pointer'}}>
    {searchResults.map((result, i) => (
      
        <div
        style={style}
          onClick={() => { 
            handlePlaylist(result, access_token)
            setPlaceDisplayType('none')
            return handlePlaylist(result, access_token)
          }}
          key={i}
          id={result.place_id}
          // style={{ marginTop: '2em' }}
          className="place-item"
        >
          {result.description}
        </div>
      
    ))}
  </div>
)};

export default SearchResults;
