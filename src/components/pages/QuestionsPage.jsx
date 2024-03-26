import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import UsersContext from '../../contexts/UsersContext';
import QuestionCard from '../organisms/QuestionCard';
import styled from 'styled-components';
import FilterButton from '../atoms/FilterButton';
import AnswersContext from '../../contexts/AnswersContext';

const StyledQuestionsPage = styled.section`
	padding: 2rem 15%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const FilterButtons = styled.div`
	display: flex;
	gap: 1rem;
`;

const QuestionsPage = () => {
	const {
		state: { questions, isSortedByDate, isSortedByAnswers, isFiltered },
		dispatch
	} = useContext(QuestionsContext);
	const {
		state: { user, users }
	} = useContext(UsersContext);
	const {
		state: { answers }
	} = useContext(AnswersContext);

	return (
		questions.length &&
		users.length && (
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
						user={user}
						creator={users.find(user => user.id === question.creatorId)}
					/>
				))}
			</StyledQuestionsPage>
		)
	);
};
export default QuestionsPage;
