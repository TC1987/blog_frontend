import React, { useEffect } from 'react';
import styles from './app.module.scss';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Users from './components/Users/Users';
import User from './components/User/User';
import SingleBlog from './components/SingleBlog/SingleBlog';
import BlogNew from './components/BlogNew/BlogNew';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

import { user_login } from './reducers/userReducer';
import { blogs_init } from './reducers/blogReducer';

import { blogs_getAll } from './services/blogs';

const App = props => {
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
		<div className={ styles.container }>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path='/' component={Dashboard} />
					<Route exact path='/users' component={Users} />
					<Route exact path='/blogs' component={Dashboard} />
					<Route exact path='/register' component={Register} />
					<Route path='/login' render={() => props.user ? <Redirect to='/' /> : <Login />} />
					<Route path='/blogs/new' render={routeProps => props.user ? <BlogNew {...routeProps} /> : <Redirect to='/' />} />
					<Route path='/users/:id' component={User} />
					<Route path='/blogs/:id' component={SingleBlog} />
					<Route component={NotFound} />
				</Switch>
				<Sidebar />
				<Footer />
			</BrowserRouter>
		</div>
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
