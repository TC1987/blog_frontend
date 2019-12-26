import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
	display: flex;
	list-style: none;
`

const ListItem = styled.li`
	&:not(:last-child) {
		margin-right: 2rem;
	}
`

const NavMenu = () => {
	return (
		<nav>
			<NavList>
				<ListItem><Link to='/'>Blogs</Link></ListItem>
				<ListItem><Link to='/users'>Users</Link></ListItem>
			</NavList>
		</nav>
	);
};

export default NavMenu;