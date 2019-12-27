import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
`

const ProfilePic = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: red;
`

const Username = styled.span``

const LoggedInUser = props => {
	return props.user ?
		<Wrapper>
			<ProfilePic></ProfilePic>
			<Username>{ props.user.name }</Username>
		</Wrapper>
		:
		null;
};


const mapStateToProps = state => { 
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, null)(LoggedInUser);