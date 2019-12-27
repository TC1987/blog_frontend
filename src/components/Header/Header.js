import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import NavMenu from '../NavMenu/NavMenu';
import LoggedInUser from '../LoggedInUser/LoggedInUser';

const Wrapper = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #333;
	padding: 3rem 0;

	& * {
		&:not(:last-child) {
			margin-right: 1rem;
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

const Name = styled.span`
	font-size: 3rem;
	font-weight: 700;
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
`

const Header = props => (
	<Wrapper>
		<HeaderLeft>
			<Logo />
			<Name>Schmedium</Name>
		</HeaderLeft>
		<SearchBox></SearchBox>
		{ props.user && <HeaderRight>
			<LoggedInUser />
		</HeaderRight> }
	</Wrapper>
)

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Header);