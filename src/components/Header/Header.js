import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '@animated-burgers/burger-squeeze/dist/styles.css';
import Burger from '@animated-burgers/burger-squeeze';

import NavMenu from './NavMenu/NavMenu';
import LoggedInUser from './LoggedInUser/LoggedInUser';
import Filter from './Filter/Filter';

import { toggleSidebar } from '../../reducers/sidebarReducer';

import styles from './header.module.scss';

const Header = props => {
	return (
		<header className={ styles.header }>
			<div className={ styles.container }>
				<div className={ styles.logo }><Link to='/' className={ styles.link }>TIL</Link></div>
				<Filter />
				<div className={ styles.menu }>
					<Burger className={ styles.menu__burger } isOpen={ props.isOpen } onClick={ props.toggleSidebar } />
				</div>
				{/* { props.user ? 
					<React.Fragement>
						<Filter />
						<div className={ styles.menu }>
							<Burger className={ styles.menu__burger } isOpen={ props.isOpen } onClick={ props.toggleSidebar } />
						</div>
					</React.Fragement>
					:
					<button className={ styles.getStarted }>Get Started</button>
				} */}
			</div>
		</header>
	)
}

const mapStateToProps = state => {
	return {
		isOpen: state.isSidebarOpen,
		user: state.user
	}
}

const mapDispatchToProps = {
	toggleSidebar
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);