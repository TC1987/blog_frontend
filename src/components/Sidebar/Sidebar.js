import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NavMenu from '../Header/NavMenu/NavMenu';

import { toggleSidebar } from '../../reducers/sidebarReducer';

import styles from './sidebar.module.scss';

const Sidebar = props => {
	return (
		<div className={ `${ styles.sidebar } ${ props.isOpen ? styles.show : null } ${ props.user ? styles.reducedWidth : null }`}>
			{ props.user ? 
				<NavMenu />
				:
				<div className={ styles.container }>
					<div className={ styles.text }>
						<h4 className={ styles.text__title }>Welcome to TIL</h4>
						<p className={ styles.text__content }>We're a community of aspiring developers sharing our knowledge and experience hoping that someone will walk away learning something new.</p>
					</div>
					<div className={ styles.buttons } onClick={ props.toggleSidebar }>
						<button className={ `${styles.button} ${styles.button___green}` }><Link to={'/login'} className={ styles.button__link }>Login</Link></button>
						<button className={ `${styles.button} ${styles.button___light}`}><Link to={'/register'} className={ styles.button__link }>Register</Link></button>
					</div>
				</div>
			}
		</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);