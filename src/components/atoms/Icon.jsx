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

const Icon = ({ iconClass, size = '1em', color = 'black', onClickF }) => {
	return (
		<StyledIcon
			className={`${iconClass}`}
			size={size}
			color={color}
			onClick={onClickF}
		/>
	);
};

export default Icon;
