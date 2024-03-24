import styled from 'styled-components';

const StyledFormErrorMessage = styled.p`
	color: var(--accent-red);
	text-align: center;
`;

const FormErrorMessage = ({ children }) => {
	return <StyledFormErrorMessage>{children}</StyledFormErrorMessage>;
};

export default FormErrorMessage;
