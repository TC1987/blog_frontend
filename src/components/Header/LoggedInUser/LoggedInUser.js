import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '@animated-burgers/burger-squeeze/dist/styles.css';
import Burger from '@animated-burgers/burger-squeeze';

import Button from '../../Button/Button';

import { user_logout } from '../../../reducers/userReducer';
import styles from './loggedinuser.module.scss';

const LoggedInUser = ({ user, user_logout }) => {
	const logout = () => {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('token');
		user_logout();
	};

	return user ?
		<div>
			<Link to={ `/users/${user.id}` } className={ styles.username }>{ user.name }</Link>
			{/* <Button label="Logout" onClick={ logout } /> */}
		</div>
		:
		<Burger style={{ fontSize: '8px' }} isOpen={false} />
};


const mapStateToProps = state => { 
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	user_logout
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInUser);