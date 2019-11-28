import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Users from './components/Users/Users';

import { user_login } from './reducers/userReducer';

import Home from './components/Home/Home';
import LoggedInUser from './components/LoggedInUser/LoggedInUser';

const App = props => {
	// Populating user in App instead of Home because we want to display a nav on every page with
	// the user's name.
	useEffect(() => {
		let user = window.localStorage.getItem('user');
		// let token = window.localStorage.getItem('token');

		if (user) {
			props.user_login(JSON.parse(user));
		}
	}, []);

	return (
		<BrowserRouter>
			<h1>Blog World</h1>
			<LoggedInUser />
			<Switch>
				<Route exact path='/' component={ () => props.user ? <Dashboard /> : <Login /> } />
				<Route path='/users' component={ () => props.user ? <Users /> : <NotFound /> } />
				<Route component={ NotFound } />
			</Switch>
		
		</BrowserRouter>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	user_login
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
