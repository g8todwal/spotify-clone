import React from 'react';
import '../../CSS/MusicPlayer.css';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer';
import Body from './Boody';

function Player( {spotify} ) {
	return (
		<div className="player">
			<div className="player_body">
				<Sidebar />
				<Body spotify={spotify} />
			</div>
			<Footer spotify={spotify}/>
		</div>
	)
}

export default Player