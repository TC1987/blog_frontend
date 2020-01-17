import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, withRouter, Redirect, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Users from './components/Users/Users';
import User from './components/User/User';
import Blog from './components/Blog/Blog';
import SingleBlog from './components/SingleBlog/SingleBlog';
import NewBlog from './components/Blog/NewBlog';
import Register from './components/Register/Register';

import { user_login } from './reducers/userReducer';
import { blogs_init } from './reducers/blogReducer';

import { blogs_getAll } from './services/blogs';

import NavMenu from './components/NavMenu/NavMenu';
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

		blogs_getAll().then(blogs => {
			props.blogs_init(blogs);
		});
	}, []);

	//
	//
	// GREAT SUGGESTION FOR NAMING AND ORGANIZING FILES
	// Depending on size and complexity, I'd either put all the components in the same file or create a `tab` directory with `index.js` doing all the exports and `list.js`, `list-item.js`, and `panel.js` containing the subcomponent src. What do you think you'll do?
	//
	//
	
	return (
		<BrowserRouter>
			<h1>Blog World</h1>
			<LoggedInUser />
			<NavMenu />
			<Switch>
				<Route exact path='/' component={ Dashboard } />
				<Route exact path='/users' component={ Users } />
				<Route exact path='/blogs' component={ Dashboard } />
				<Route exact path='/register' component={ Register } />
				<Route path='/login' render={ () => props.user ? <Redirect to='/' /> : <Login /> } />
				<Route path='/blogs/new' render={ routeProps => props.user ? <NewBlog { ...routeProps } /> : <Redirect to='/' /> } />
				<Route path='/users/:id' component={ User } />
				<Route path='/blogs/:id' component={ SingleBlog } />
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
	user_login,
	blogs_init
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
