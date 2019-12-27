import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
	height: 10rem;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Footer = () => {
	return (
		<StyledFooter>
			<p>Made with React and styled using the mixture of styled-components and CSS3.</p>
		</StyledFooter>			
	)
}

export default Footer;
