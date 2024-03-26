import styled from 'styled-components';

const StyledButtonWrapper = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: flex-end;
	align-items: center;
	> button,
	input {
		flex-basis: 10rem;
		margin: 0;
	}
`;

const ButtonWrapper = ({ children }) => {
	return <StyledButtonWrapper>{children}</StyledButtonWrapper>;
};
export default ButtonWrapper;
