import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './navmenu.module.scss';

import { user_logout } from '../../../reducers/userReducer';

const NavMenu = props => {
	console.log(props.user);
	return (
		<nav className={ styles.container }>
			<div className={ styles.profile }>
				<div className={ styles.profile__image }></div>
				<div className={ styles.profile__name}>
					<h4 className={ styles.profile__name__user }>Hi, { props.user.name }</h4>
					{/* <p className={ styles.profile__name__status }>Developer</p> */}
				</div>
			</div>
			<div className={ styles.links }>
				<Link to='/blogs/new' className={ styles.links__link }>New Blog</Link>
				<Link to='/' className={ styles.links__link }>All Blogs</Link>
				<Link to='/users' className={ styles.links__link }>All Users</Link>
			</div>
			<button className={ styles.logout } onClick={ props.user_logout }>Logout</button>
		</nav>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	user_logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);