import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../Button/Button';

import { user_logout } from '../../reducers/userReducer';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
`

const ProfilePic = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: red;
	margin-left: 3rem;
`

const Username = styled.span`
	margin-left: 1rem;
`

const LoggedInUser = props => {
	const logout = () => {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('token');
		props.user_logout();
	};

	return props.user ?
		<Wrapper>
			<ProfilePic></ProfilePic>
			<Username>{ props.user.name }</Username>
			<Button label="Logout" onClick={ logout } />
		</Wrapper>
		:
		null;
};


const mapStateToProps = state => { 
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	user_logout
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInUser);