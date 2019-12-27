import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../Button/Button';
import Login from '../Login/Login';

import { user_logout } from '../../reducers/userReducer';

const StyledList = styled.ul`
	display: flex;
	list-style: none;
`

const StyledNav = styled.nav`
	display: flex;
	justify-content: space-between;
	height: 40px;
`

const NavList = styled(StyledList)``

const ListItem = styled.li`
	&:not(:last-child) {
		margin-right: 2rem;
	}
`

const NavMenu = props => {
	const logout = () => {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('token');
		props.user_logout();
	};

	return (
		<StyledNav>
			<NavList>
				<ListItem><Link to='/'>New Blog</Link></ListItem>
				<ListItem><Link to='/'>All Blogs</Link></ListItem>
				<ListItem><Link to='/users'>All Users</Link></ListItem>
			</NavList>
			{ !props.user && <Login />}
			{ props.user && <Button label="Logout" onClick={ logout } /> }
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