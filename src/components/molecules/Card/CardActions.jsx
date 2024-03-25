import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { useNavigate } from 'react-router';

const IconContainer = styled.div`
	display: flex;
	gap: 1rem;
	> button {
		background: none;
		border: none;
		cursor: pointer;
	}
`;

const CardActions = ({ id, removeItem, navigate = false }) => {
	const navigateTo = useNavigate();
	return (
		<IconContainer>
			<Icon iconClass='bi-pencil' size='1.3em' color='gray' />
			<button
				onClick={() => {
					removeItem(id);
					navigate && navigateTo('/');
				}}
			>
				<Icon iconClass='bi-trash' size='1.3em' color='gray' />
			</button>
		</IconContainer>
	);
};
export default CardActions;
