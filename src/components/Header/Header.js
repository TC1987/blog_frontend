import React from 'react';
import styled from 'styled-components';

import NavMenu from '../NavMenu/NavMenu';
import LoggedInUser from '../LoggedInUser/LoggedInUser';

const Wrapper = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #333;
	padding: 3rem 0;

	& > * {
		&:not(:first-child) {
			margin-left: 2rem;
		}
	}
`

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
`

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
`


const Name = styled.h1`
	text-transform: uppercase;
`

const SearchBox = styled.input`
	flex: 1;
	padding: 1rem 2rem;
	font-size: 2rem;
`

const Logo = styled.div`
	width: 50px;
	height: 50px;
	background-color: red;
	margin-right: 1rem;
`

const Header = () => (
	<Wrapper>
		<HeaderLeft>
			<Logo />
			<Name>Schmedium</Name>
		</HeaderLeft>
		<SearchBox></SearchBox>
		<HeaderRight>
			<NavMenu />
			<LoggedInUser />
		</HeaderRight>
	</Wrapper>
)

export default Header;
