import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.i`
	font-size: ${props => props.size};
	color: ${props => props.color};
	&:hover {
		color: var(--accent-orange);
		cursor: pointer;
		transform: scale(1.1);
	}
`;

const Icon = ({ iconClass, size = '1em', color = 'black' }) => {
	return <StyledIcon className={`${iconClass}`} size={size} color={color} />;
};

export default Icon;
