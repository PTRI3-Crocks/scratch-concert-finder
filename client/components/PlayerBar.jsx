import React, { useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ access_token, track, playlist }) => {

  const playerStyle = {
    activeColor: '#e63946',
    bgColor: '#333',
    color: '#f1faee', 
    loaderColor: '#fff',
    sliderColor: '#e63946',
    trackArtistColor: '#333',
    trackNameColor: '#333',
    altColor: '#e63946',
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: '18px',
    
  };

  const style={ 
    width: '100%', 
    marginBottom: '4px', 
    position: 'fixed', 
    bottom:'3vh', 
    left:'0', 
    zindex: '2'
  };

 

  return (
    
      <div className="spotify" style={style}>
      <SpotifyPlayer 
          token={access_token} 
          uris={track} 
          styles={playerStyle} 
          showSaveIcon={true}/>
      </div>
    
  );
};

export default Player;
