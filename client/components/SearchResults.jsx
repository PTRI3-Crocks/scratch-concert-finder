import React, {useState} from 'react';
import { background, Center } from '@chakra-ui/react';

const SearchResults = ({ searchResults, handlePlaylist,placeDisplayType, setPlaceDisplayType}) => {

  const style = {
    display:placeDisplayType,
    backgroundColor: 'rgba(69, 123, 157, .7)',
  }
    
  
  return (
  <div className="placePanel" style={{ cursor: 'pointer'}}>
    {searchResults.map((result, i) => (
      
        <div
        style={style}
          onClick={() => { 
            handlePlaylist(result)
            setPlaceDisplayType('none')
          }}
          key={i}
          id={result.place_id}
          className="place-item"
        >
          {result.description}
        </div>
      
    ))}
  </div>
)};

export default SearchResults;
