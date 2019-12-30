import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 40%;
	margin: 4rem auto 0;
	text-align: center;
`

const MainHeader = styled.h1`

`

const Submit = styled.input`
	height: 40px;
	width: 100%;
	border: none;
	background-color: red;
`

const Input = styled.input`
	display: block;
	width: 100%;
	border: none;
	background-color: transparent;
	margin: 2rem auto;	
	padding: 1rem;
	outline: none;
	font-size: 1.6rem;
`

const TitleInput = styled(Input)`
	height: 30px;
	border-bottom: 1px solid black;
`

const ContentInput = styled(Input)`
	border: 1px solid black;
`

const NewBlog = () => {
	return (
		<Wrapper>
			<MainHeader>
				Create New Blog
			</MainHeader>
			<form action="/" method="POST">
				<TitleInput type="text" placeholder="Title"></TitleInput>
				<ContentInput type="textarea" placeholder="Content" rows="1"></ContentInput>
				<textarea rows="20"></textarea>
				<Submit type="submit" value="Create Blog"></Submit>
			</form>
		</Wrapper>
	)
}

export default NewBlog;