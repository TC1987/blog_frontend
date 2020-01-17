import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const NavMenu = props => {
	return (
		<nav>
			<ul>
				{props.user ? <li><Link to='/blogs/new'>New Blog</Link></li> : null}
				<li><Link to='/'>Blogs</Link></li>
				<li><Link to='/users'>Users</Link></li>
				<li><Link to='/login'>Login</Link></li>
				<li><Link to='/register'>Register</Link></li>
			</ul>
		</nav>
	);
};

const mapStateToDispatch = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToDispatch)(NavMenu);