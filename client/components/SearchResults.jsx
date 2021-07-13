import React, {useState} from 'react';
import { Center } from '@chakra-ui/react';

const SearchResults = ({ searchResults, handlePlaylist,placeDisplayType, setPlaceDisplayType}) => {

  console.log(placeDisplayType, 'DISPLAY IN RESULTS')
  const style = {
    display:placeDisplayType
  }
  return (
  <div className="placePanel" style={{ cursor: 'pointer'}}>
    {searchResults.map((result, i) => (
      
        <div
        style={style}
          onClick={() => { 
            console.log('ONCLICK', placeDisplayType)
            setPlaceDisplayType('none')
            console.log(placeDisplayType)
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
