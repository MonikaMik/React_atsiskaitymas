import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { useNavigate } from 'react-router';
import QuestionsContext from '../../../contexts/QuestionsContext';
import AnswersContext from '../../../contexts/AnswersContext';
import { useContext } from 'react';

const IconContainer = styled.div`
	display: flex;
	gap: 1rem;
	> button {
		background: none;
		border: none;
		cursor: pointer;
	}
`;

const CardActions = ({
	question = undefined,
	answer = undefined,
	navigate = false,
	showForm
}) => {
	const { removeQuestion } = useContext(QuestionsContext);
	const { removeAnswer } = useContext(AnswersContext);
	const navigateTo = useNavigate();

	return (
		<IconContainer>
			<button
				onClick={() => {
					showForm();
				}}
			>
				<Icon iconClass='bi-pencil' size='1.3em' color='gray' />
			</button>
			<button
				onClick={() => {
					answer ? removeAnswer(answer.id) : removeQuestion(question.id);
					question && navigate && navigateTo('/');
				}}
			>
				<Icon iconClass='bi-trash' size='1.3em' color='gray' />
			</button>
		</IconContainer>
	);
};
export default CardActions;
