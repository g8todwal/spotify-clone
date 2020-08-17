import React, { useEffect } from 'react';
import './App.css';
import Login from './Components/Login';
import Player from './Components/MusicPlayer/MusicPlayer';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from './Context/DataLayer';

// ======== Creating instance of spotify ========
const spotify = new SpotifyWebApi();
 
function App() {
    
	// const [token, setToken] = useState();
	const [{ token }, dispatch] = useDataLayerValue();

	useEffect(() => {
		const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
      	type: 'SET_TOKEN',
      	token: _token,
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
      	dispatch({
	        type: "SET_USER",
	        user: user,
	      });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });

      spotify.getPlaylist('0GB9chRwz1EI9MkT3BjfbO').then((response) => {
        dispatch({
          type: 'SET_DISCOVERWEEKLY',
          discover_weekly: response
        });
      })

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

    } 
	}, [token, dispatch]);

  return (
    <div className="app">
    		{!token && <Login />}
      	{token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
