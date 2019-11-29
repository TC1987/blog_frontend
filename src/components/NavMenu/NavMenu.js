import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => {
	return (
		<nav>
			<ul>
				<li><Link to='/'>Blogs</Link></li>
				<li><Link to='/users'>Users</Link></li>
			</ul>
		</nav>
	);
};

export default NavMenu;