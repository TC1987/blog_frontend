import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

import styles from './navmenu.module.scss';

import { user_logout } from '../../../reducers/userReducer';

const NavMenu = props => {
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
				<Link to='/blogs/new' className={ styles.links__link }>New Post</Link>
				<Link to='/' className={ styles.links__link }>Blogs</Link>
				{/* <Link to='/users' className={ styles.links__link }>Users</Link> */}
			</div>
			<button className={ styles.logout } onClick={ props.user_logout }>Sign Out</button>
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