import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
	color: var(--text-grey);
`;

const Label = ({ htmlFor }) => {
	return (
		<StyledLabel htmlFor={htmlFor}>
			{htmlFor.charAt(0).toUpperCase() + htmlFor.slice(1)}:
		</StyledLabel>
	);
};
export default Label;
