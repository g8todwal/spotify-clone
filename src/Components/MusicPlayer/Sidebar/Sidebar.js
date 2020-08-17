import React from 'react';
import SidebarOpt from './SidebarOpt';
import '../../../CSS/Sidebar.css';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from "../../../Context/DataLayer";
import capture from './Capture.png';
import capture1 from './Capture1.png';

const Sidebar = () => {

	const [{playlists}] = useDataLayerValue();

	return (
		<div className="sidebar">
			<img
				className="sidebar_logo"
	      		src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
	      		alt=""
	    	/>
		    <SidebarOpt	Icon={HomeIcon} title="Home" />
		    <SidebarOpt Icon={SearchIcon} title="Search" />
		    <SidebarOpt Icon={LibraryMusicIcon} title="Your Library" />
		    <br />
		    <strong className="sidebar_title">PLAYLISTS</strong><br />
		    <img src={capture} className="sidebar_logo" alt="images" />
	    	<hr />
	    	{playlists?.items?.map((playlist) => (
        		<SidebarOpt title={playlist.name} />
      		))}<br />
      		<img src={capture1} className="sidebar_install" alt="images" />
	    	
		</div>
	)
}

export default Sidebar;