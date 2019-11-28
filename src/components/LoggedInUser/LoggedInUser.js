import React from 'react';
import { connect } from 'react-redux';

import Button from '../Button/Button';

import { user_logout } from '../../reducers/userReducer';

const LoggedInUser = props => {
	const logout = () => {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('token');
		props.user_logout();
	};

	return props.user ?
		<div>
			<h1>Logged In User: { props.user.name }</h1>
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