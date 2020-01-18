import React from 'react';
import { connect } from 'react-redux';

import NavMenu from '../Header/NavMenu/NavMenu';

import styles from './sidebar.module.scss';

const Sidebar = props => {
	return (
		<div className={ `${ styles.sidebar } ${ props.isOpen ? styles.show : null }`}>
			{ props.user ? 
				<NavMenu />
				:
				<div className={ styles.loginRegister }>
					<button>Login</button>
					<button>Register</button>
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

export default connect(mapStateToProps)(Sidebar);