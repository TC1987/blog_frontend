import React from 'react';
import styled from 'styled-components';

import Blog from '../Blog/Blog';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const BlogList = ({ blogs }) => {
	return (
		<Wrapper>
			{ blogs.map(blog => (
				<Blog key={ blog.id } blog={ blog } />
			)) }	
		</Wrapper>
	)
}

export default BlogList;