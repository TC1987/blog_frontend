import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';

import { user_logout } from '../../reducers/userReducer';

const LoggedInUser = ({ user, user_logout }) => {
	const logout = () => {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('token');
		user_logout();
	};

	return user ?
		<div>
			<h1>Logged In User: <Link to={ `/users/${user.id}` }>{ user.name }</Link></h1>
			<Button label="Logout" onClick={ logout } />
		</div>
		:
		null;
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