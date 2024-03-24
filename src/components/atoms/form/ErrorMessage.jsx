import styled from 'styled-components';

const StyledErrorMessage = styled.span`
	color: var(--accent-red);
`;

const ErrorMessage = ({ error }) => {
	return error.touched && error.message ? (
		<StyledErrorMessage>{error.message}</StyledErrorMessage>
	) : null;
};
export default ErrorMessage;
