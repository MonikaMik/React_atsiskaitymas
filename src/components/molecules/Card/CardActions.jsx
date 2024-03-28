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
import UsersContext from '../../../contexts/UsersContext';

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
	creatorId,
	navigate = false
}) => {
	const { removeQuestion, dispatch } = useContext(QuestionsContext);
	const {
		state: { answers },
		removeAnswer,
		dispatch: answersDispatch
	} = useContext(AnswersContext);
	const navigateTo = useNavigate();
	const { showForm, showAnswerForm } = useContext(DialogContext);
	const {
		state: { user }
	} = useContext(UsersContext);

	const answersForDeletedQuestion = question
		? answers.filter(answer => answer.questionId === question?.id)
		: [];
	const removeQuestionWithAnswers = () => {
		removeQuestion(question.id);
		answersForDeletedQuestion.forEach(answer => removeAnswer(answer.id));
	};
	return (
		<IconContainer>
			{user && creatorId === user.id && (
				<>
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
							answer ? removeAnswer(answer.id) : removeQuestionWithAnswers();
							question && navigate && navigateTo('/');
						}}
					>
						<Icon iconClass='bi-trash' size='1.3em' color='gray' />
					</button>
				</>
			)}
			{user && answer && answer.type === 'answer' && (
				<button
					onClick={() => {
						answersDispatch({
							type: answersActionTypes.SET_REPLY,
							payload: answer
						});
						answer && showAnswerForm();
					}}
				>
					<Icon
						iconClass='bi bi-reply'
						color='var(--text-grey)'
						size='1.5rem'
					/>
				</button>
			)}
		</IconContainer>
	);
};
export default CardActions;
