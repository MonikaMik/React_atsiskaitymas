import styled from 'styled-components';
import Icon from '../../atoms/Icon';

const IconContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const CardActions = () => {
	return (
		<IconContainer>
			<Icon iconClass='bi-pencil' size='1.3em' color='gray' />
			<Icon iconClass='bi-trash' size='1.3em' color='gray' />
		</IconContainer>
	);
};
export default CardActions;
