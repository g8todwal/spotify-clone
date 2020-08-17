import React from 'react';
import Header from './Header';
import '../../CSS/Boody.css';
import { useDataLayerValue } from '../../Context/DataLayer'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from './Body/SongRow';
//0GB9chRwz1EI9MkT3BjfbO
const Body = ({spotify}) => {

	const [{ discover_weekly }, dispatch] = useDataLayerValue();
	const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:0GB9chRwz1EI9MkT3BjfbO`,
      })
      .then((res) => {
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
      });
    };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        console.log(res)
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
      });
    };

	return (
		<div className="body">
			<Header spotify={spotify} />
			<div className="body_info">
				<img src={discover_weekly?.images[0].url} alt="" />
				<div className="body_text">
					<strong>PLAYLIST</strong>
					<h2>Discover Weekly Spotify</h2>
					<p>{discover_weekly?.description}</p>
					<p>
						<strong>
              <span>{discover_weekly?.owner.display_name}</span> {" "}.{" "}
						  <span className="disc_more">{discover_weekly?.followers.total} Likes</span>  {" "}.{" "}
              <span className="disc_more">6 hr 25 min</span>
            </strong>
					</p>
				</div>
			</div>
			<div className="body_songs">
				<div className="body_icons">
		          <PlayCircleFilledIcon
		            className="body_shuffle"
		            onClick={playPlaylist}
		          />
		          <FavoriteIcon fontSize="large" />
		          <MoreHorizIcon />
		        </div>
		        {discover_weekly?.tracks.items.map(item => (
		        	<SongRow track={item.track} playSong={playSong}/>
		        ))}
			</div>
		</div>
	)
}

export default Body;