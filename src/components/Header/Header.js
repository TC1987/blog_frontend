import React from 'react';
import { connect } from 'react-redux';
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
				<div className={ styles.logo }>TIL</div>
				<Filter />
				{/* <LoggedInUser /> */}
				<Burger style={{ fontSize: '8px' }} isOpen={ props.isOpen } onClick={ props.toggleSidebar } />
			</div>
		</header>
	)
}

const mapStateToProps = state => {
	return {
		isOpen: state.isSidebarOpen
	}
}

const mapDispatchToProps = {
	toggleSidebar
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);