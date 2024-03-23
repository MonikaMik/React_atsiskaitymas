import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: ${props =>
		props.$theme === 'primary' ? 'var(--accent-orange)' : 'var(--accent-grey)'};
	border: none;
	border-radius: 5px;
	color: ${props =>
		props.$theme === 'primary' ? 'white' : 'var(--accent-blue)'};
	padding-block: 8px;
	padding-inline: 16px;
	&:hover {
		background-color: orange;
		cursor: pointer;
	}
`;

const Button = ({ text, onClickF, theme }) => {
	return (
		<StyledButton onClick={onClickF} $theme={theme}>
			{text}
		</StyledButton>
	);
};
export default Button;
