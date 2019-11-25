import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

import { user_login } from './reducers/userReducer';

const App = props => {
	useEffect(() => {
		let user = window.localStorage.getItem('user');

		if (user) {
			props.user_login(JSON.parse(user));
		}
	}, []);

	return (
		<div>
			<h1>Blog World</h1>
			{ props.user ?
				<Dashboard></Dashboard>
				:
				<Login></Login>
			}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	user_login
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
