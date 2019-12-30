import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../Button/Button';
import Login from '../Login/Login';

import { user_logout } from '../../reducers/userReducer';

const StyledNav = styled.nav`
	display: flex;
	height: 40px;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid black;
`

const NavLeft = styled.div`
`

const NavRight = styled.div`
`

const StyledLink = styled(Link)`
	text-decoration: none;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 1.2rem;
	background-color: red;
	padding: 1rem 2rem;
`

const NavMenu = props => {
	const logout = () => {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('token');
		props.user_logout();
	};

	return (
		<StyledNav>
			<NavLeft>
				<StyledLink to='/blogs/new'>New Blog</StyledLink>
				<StyledLink to='/'>All Blogs</StyledLink>
				<StyledLink to='/users'>All Users</StyledLink>
			</NavLeft>
			<NavRight>
				{ !props.user && <Login />}
				{ props.user && <Button label="Logout" onClick={ logout } /> }
			</NavRight>
		</StyledNav>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	user_logout
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);