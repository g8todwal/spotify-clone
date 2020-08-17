import React from 'react';
import '../../../CSS/SidebarOpt.css';

const SidebarOpt = ({title, Icon}) => {
	return (
		<div className="sidebarOpt">
			{Icon && <Icon className="sidebarOpt_Icon" />}
			{ Icon ? <h4>{title}</h4> : <h5>{title}</h5> }
		</div>
	)
}

export default SidebarOpt;