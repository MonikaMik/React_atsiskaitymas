import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { useContext } from 'react';
import QuestionsContext from '../../../contexts/QuestionsContext';

const IconContainer = styled.div`
	display: flex;
	gap: 1rem;
	> button {
		background: none;
		border: none;
		cursor: pointer;
	}
`;

const CardActions = ({ id }) => {
	const { removeQuestion } = useContext(QuestionsContext);

	return (
		<IconContainer>
			<Icon iconClass='bi-pencil' size='1.3em' color='gray' />
			<button onClick={() => removeQuestion(id)}>
				<Icon iconClass='bi-trash' size='1.3em' color='gray' />
			</button>
		</IconContainer>
	);
};
export default CardActions;
