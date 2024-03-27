import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { useNavigate } from 'react-router';
import QuestionsContext, {
	questionsActionTypes
} from '../../../contexts/QuestionsContext';
import AnswersContext, {
	answersActionTypes
} from '../../../contexts/AnswersContext';
import DialogContext from '../../../contexts/DialogContext';
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
	navigate = false
}) => {
	const { removeQuestion, dispatch } = useContext(QuestionsContext);
	const { removeAnswer, dispatch: answersDispatch } =
		useContext(AnswersContext);
	const navigateTo = useNavigate();
	const { showForm, showAnswerForm } = useContext(DialogContext);

	return (
		<IconContainer>
			<button
				onClick={() => {
					if (question) {
						dispatch({
							type: questionsActionTypes.SET_EDITING_QUESTION,
							payload: question
						});
						question && showForm();
					} else if (answer) {
						answersDispatch({
							type: answersActionTypes.SET_EDITING_ANSWER,
							payload: answer
						});
						answer && showAnswerForm();
					}
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
