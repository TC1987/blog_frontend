import React from 'react';

import NavMenu from './NavMenu/NavMenu';
import LoggedInUser from './LoggedInUser/LoggedInUser';
import styles from './header.module.css';

const Header = () => {
	return (
		<header className={ styles.header }>
			<div>Schmedium</div>
			<NavMenu />
			<LoggedInUser />
		</header>
	)
}

export default Header;