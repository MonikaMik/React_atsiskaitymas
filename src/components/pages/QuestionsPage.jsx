import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import UsersContext from '../../contexts/UsersContext';
import QuestionCard from '../organisms/QuestionCard';
import styled from 'styled-components';
import FilterButton from '../atoms/FilterButton';
import AnswersContext from '../../contexts/AnswersContext';
import Skeleton from '../atoms/Skeleton';
import EditModal from '../organisms/EditModal';
import DialogContext from '../../contexts/DialogContext';

const StyledQuestionsPage = styled.section`
	flex-basis: 70%;
	padding: 2rem 5% 2rem 5%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	@media (max-width: 900px) {
		padding: 1rem;
		flex-basis: 100%;
	}
`;
const FilterButtons = styled.div`
	display: flex;
	gap: 1rem;
`;

const QuestionsPage = () => {
	const { editDialogRef, showForm } = useContext(DialogContext);

	const {
		state: {
			questions,
			isSortedByDate,
			isSortedByAnswers,
			isFiltered,
			editingQuestion,
			loading: questionsLoading
		},
		dispatch
	} = useContext(QuestionsContext);
	const {
		state: { user, users, loading: usersLoading }
	} = useContext(UsersContext);
	const {
		state: { answers, loading: answersLoading }
	} = useContext(AnswersContext);

	return questions.length && users.length ? (
		<StyledQuestionsPage>
			<FilterButtons>
				<FilterButton
					onClickF={() => {
						dispatch({
							type: 'SORT',
							payload: { answers: answers, sortType: 'created' }
						});
					}}
					icon='bi bi-clock'
					text='Latest'
					isSorted={isSortedByDate}
				/>
				<FilterButton
					onClickF={() => {
						dispatch({
							type: 'SORT',
							payload: { answers: answers, sortType: 'answerCount' }
						});
					}}
					icon='bi bi-sort-up'
					text='Most answers'
					isSorted={isSortedByAnswers}
				/>
				<FilterButton
					onClickF={() => {
						dispatch({
							type: 'FILTER',
							payload: { answers: answers }
						});
					}}
					icon='bi bi-funnel'
					text='Not answered'
					isSorted={isFiltered}
				/>
			</FilterButtons>
			{questions.map(question => (
				<QuestionCard
					key={question.id}
					question={question}
					showForm={showForm}
					user={user}
					creator={users.find(user => user.id === question.creatorId)}
				/>
			))}
			<dialog ref={editDialogRef}>
				<EditModal question={editingQuestion} />
			</dialog>
		</StyledQuestionsPage>
	) : questionsLoading || usersLoading || answersLoading ? (
		<>
			<Skeleton />
		</>
	) : (
		<h2>&nbsp; No questions found...</h2>
	);
};
export default QuestionsPage;
