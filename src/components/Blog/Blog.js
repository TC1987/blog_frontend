import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { blogs_service_update, blogs_service_delete } from '../../services/blogs';
import { blogs_update, blogs_delete } from '../../reducers/blogReducer';

const Wrapper = styled.div`
	padding: 1rem;
	background-color: red;
	border: 1px solid black;
	flex: 1 1 33%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 55rem;
`

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
`

const Text = styled.span`
	font-size: ${ props => props.fontSize ? props.fontSize : '1rem' };
	text-decoration: none;
`

const Image = styled.div`
	min-height: 300px;
	background-color: black;
	background-image: url();
`

const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	& > * {
		width: 100%;
		background-color: #ccc;
		text-align: center;
		border: 1px solid black;

		&:hover {
			cursor: pointer;
		}
	}
`

const ContentWrapper = styled.div`
`

const Content = styled.p``;

const Author = styled.span`
	font-size: 1.2rem;
	text-transform: uppercase;
`;

const ReadTime = styled.span`
	font-size: 1rem;
	text-transform: uppercase;
`;

const Blog = props => {
	const { id, title, content, author, likes, tags, readTime, updatedAt } = props.blog;
	const { user } = props;

	const handleEdit = id => {
		
	};

	const handleDelete = async id => {
		try {
			const deletedBlog = await blogs_service_delete(id);
			props.blogs_delete(deletedBlog.id);
		} catch (err) {
			console.log(err);
		}
	};

	const likeBlog = async blog => {
		let updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		};

		updatedBlog = await blogs_service_update(updatedBlog);
		props.blogs_update(updatedBlog);
	}; 

	return (
		<Wrapper>
			<Image></Image>
			<TextWrapper>
				<ContentWrapper>
					<Text fontSize="3rem">
						<Link to={ `/blogs/${id}` }>{ title }</Link>
					</Text>
					<Author>{ author.name }</Author>
					<ReadTime>{ readTime } mins read</ReadTime>
					<Content>{ content }</Content>
					<p>{ tags }</p>
					<p>{ updatedAt }</p>
					<p>Likes: { likes }</p>
				</ContentWrapper>
				<ButtonsWrapper>
					<div onClick={ () => likeBlog(props.blog) }>Like</div>
					{  author.id === user.id ?
						<>
							<div onClick={ () => handleEdit(id) }>Edit</div>
							<div onClick={ () => handleDelete(id) }>Delete</div>
						</>
						:
						null
					}
				</ButtonsWrapper>
			</TextWrapper>
		</Wrapper>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	blogs_update,
	blogs_delete
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);