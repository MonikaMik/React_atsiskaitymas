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
	> i {
		margin-right: 5px;
		font-size: 1.2em;
	}
	&:hover {
		background-color: orange;
		cursor: pointer;
	}
`;

const Button = ({ text, onClickF, theme, icon }) => {
	return (
		<StyledButton onClick={onClickF} $theme={theme}>
			{icon && <i className={icon}></i>}
			{text}
		</StyledButton>
	);
};
export default Button;
