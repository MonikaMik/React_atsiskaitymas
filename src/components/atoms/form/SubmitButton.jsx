import styled from 'styled-components';
import Icon from '../Icon';

const StyledSubmitButton = styled.button`
	width: 100%;
	background-color: var(--accent-orange);
	border: none;
	border-radius: 5px;
	color: white;
	padding-block: 9px;
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	&:hover {
		background-color: var(--hover-orange);
		cursor: pointer;
	}
`;

const SubmitButton = ({ text, icon }) => {
	return (
		<StyledSubmitButton type='submit'>
			{text}
			{icon && <Icon iconClass='bi bi-send' color='white' />}
		</StyledSubmitButton>
	);
};

export default SubmitButton;
