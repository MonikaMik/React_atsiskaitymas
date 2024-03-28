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
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	> i {
		margin-right: 5px;
		font-size: 1.2em;
	}
	&:hover {
		background-color: ${props =>
			props.$theme === 'primary'
				? 'var(--hover-orange)'
				: 'var(--accent-blue)'};
		cursor: pointer;
		color: white;
	}
`;

const Button = ({ type, text, onClickF, theme, icon }) => {
	return (
		<StyledButton type={type} onClick={onClickF} $theme={theme}>
			{icon && <i className={icon}></i>}
			{text}
		</StyledButton>
	);
};
export default Button;
