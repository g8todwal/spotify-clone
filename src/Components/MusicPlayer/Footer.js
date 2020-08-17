import React, { useEffect } from 'react';
import { useDataLayerValue } from '../../Context/DataLayer';
import '../../CSS/Footer.css';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";

const Footer = ({ spotify }) => {

	const [{ item, playing }, dispatch] = useDataLayerValue();

	useEffect(() => {
	    spotify.getMyCurrentPlaybackState().then((res) => {
	      console.log(res);

	      dispatch({
	        type: "SET_PLAYING",
	        playing: res.is_playing,
	      });

	      dispatch({
	        type: "SET_ITEM",
	        item: res.item,
	      });
	    });
	}, [spotify, dispatch]);

	const handlePlayPause = () => {
	    if (playing) {
	      spotify.pause();
	      dispatch({
	        type: "SET_PLAYING",
	        playing: false,
	      });
	    } else {
	      spotify.play();
	      dispatch({
	        type: "SET_PLAYING",
	        playing: true,
	      });
	    }
	  };

	const skipNext = () => {
		spotify.skipToNext();
		spotify.getMyCurrentPlaybackTrack().then((res) => {
			dispatch({
				type: 'SET_PLAYING',
				item: res.item
			});
			dispatch({
				type: "SET_PLAYING",
	        	playing: true,
			});
		});
	}

	const skipPrevious = () => {
	  spotify.skipToPrevious();
	  spotify.getMyCurrentPlayingTrack().then((r) => {
	    dispatch({
	      type: "SET_ITEM",
	      item: r.item,
	    });
	    dispatch({
	      type: "SET_PLAYING",
	      playing: true,
	    });
	  });
	};

	return (
		<div className="footer">
			<div className="footer_left">
				<img src={item?.album.images[0].url} alt="" className="footer_albumLogo" />
				{item ?(
					<div className="footer_songInfo">
						<h4>{item.name}</h4>
						<p>{item.artists.map((artist) => artist.name).join(", ")}</p>
					</div>
				) : (
					<div className="footer__songInfo">
			            <h4>No song is playing</h4>
			            <p>...</p>
			        </div>
				)}				
			</div>

			<div className="footer_center">
				<ShuffleIcon 
					className="footer_green" 
				/>
				<SkipPreviousIcon
					className="footer_icon"
					onClick={skipNext} 
				/>
				{playing ? (
		          <PauseCircleOutlineIcon
		            onClick={handlePlayPause}
		            fontSize="large"
		            className="footer_icon"
		          />
		        ) : (
		          <PlayCircleOutlineIcon
		            onClick={handlePlayPause}
		            fontSize="large"
		            className="footer_icon"
		          />
        		)}
          		<SkipNextIcon 
          			className="footer_icon" 
          			onClick={skipPrevious}          			
          		/>
          		<RepeatIcon 
          			className="footer_green" 
          		/>
			</div>

			<div className="footer_right">
				<Grid container spacing={2}>
		          <Grid item>
		            <PlaylistPlayIcon />
		          </Grid>
		          <Grid item>
		            <VolumeDownIcon />
		          </Grid>
		          <Grid item xs>
		            <Slider aria-labelledby="continuous-slider" />
		          </Grid>
		        </Grid>
			</div>
		</div>
	)
}

export default Footer;