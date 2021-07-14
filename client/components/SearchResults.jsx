import React, {useState} from 'react';
import { background, Center } from '@chakra-ui/react';

const SearchResults = ({ searchResults, handlePlaylist,placeDisplayType, setPlaceDisplayType}) => {

  const style = {
    display:placeDisplayType,
    // background: 'rgba(255, 255, 255, 0.6)'
    
  }
    
  
  return (
  <div className="placePanel" style={{ cursor: 'pointer'}}>
    {searchResults.map((result, i) => (
      
        <div
        style={style}
          onClick={() => { 
            setPlaceDisplayType('none')
            return handlePlaylist(result)
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
