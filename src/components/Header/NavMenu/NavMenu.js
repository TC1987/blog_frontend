import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

import styles from './navmenu.module.scss';

import { user_logout } from '../../../reducers/userReducer';

const NavMenu = props => {
	const logout = () => {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('token');
		user_logout();
	};
	
	return (
		<nav className={ styles.container }>
			<div className={ styles.menuStats }>
				<div className={ styles.profile }>
					<div className={ styles.profile__image }></div>
					<div className={ styles.profile__name}>
						<h4 className={ styles.profile__name__user }><span className={ styles.profile__name__thin }>Hi, </span>{ props.user.name }</h4>
						{/* <p className={ styles.profile__name__status }>Developer</p> */}
					</div>
				</div>
				<div className={ styles.links }>
					<Link to='/blogs/new' className={ styles.links__link }>New Post</Link>
					<Link to='/' className={ styles.links__link }>Blogs</Link>
					{/* <Link to='/users' className={ styles.links__link }>Users</Link> */}
				</div>
				<div className={ styles.stats }>
					<div className={ styles.stats__item }>
						<p>Blog Count:</p>
						<p>{ props.user.blogs.length }</p>
					</div>
					<div className={ styles.stats__item }>
						<p>Liked Count:</p>
						<p>{ props.user.likedBlogs.length }</p>
					</div>
					<div className={ styles.stats__item }>
						<p>Following Count:</p>
						<p>{ props.user.followedUsers.length }</p>
					</div>
				</div>
			</div>
			<button className={ styles.logout } onClick={ logout }>Sign Out</button>
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