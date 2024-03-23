import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: var(--accent-orange);
	border: none;
	border-radius: 5px;
	color: white;
	padding-block: 8px;
	padding-inline: 16px;
	&:hover {
		background-color: orange;
		cursor: pointer;
	}
`;

const Button = ({ text, onClickF }) => {
	return <StyledButton onClick={onClickF}>{text}</StyledButton>;
};
export default Button;
