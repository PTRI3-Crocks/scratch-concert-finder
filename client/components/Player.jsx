import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';


const Player = ({ playlist }) => {
  const playerStyle = {
    bgColor: '#000000',
    color: '#dbdbdb',
    sliderHandleColor: '#dbdbdb',
    sliderColor: 'yellowgreen',
    sliderTrackColor: '#000000',
    trackNameColor: '#dbdbdb',
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: '20px',
    fontSize: '18px',
  };

  const shows = playlist.map( (ele, index) =>{
    const year = ele.start.slice(0, 4)
    const month = ele.start.slice(5, 7)
    const day = ele.start.slice(8,10)
    const date = month + '/' + day + '/' + year

    return(
      <>
    <Box h="40px" style={{fontSize: '18px'}} >
      {ele.artist.name}
    </Box>
    <Box h="40px" style={{ fontSize: '18px', textDecorationLine: 'underline', fontWeight: 400 }} >
      {ele.venue} 
    </Box>
    <Box h="40px" style={{ fontSize: '16px', fontWeight: 400}} >
      {date} 
    </Box>
    </>
    )
  })
  
  
  return (
    <div className="searchResults">

    <SimpleGrid
      columns={3} 
      spacing={2}
    >
      {shows}
    </SimpleGrid>
    
    </div>
  );
};

export default Player;
