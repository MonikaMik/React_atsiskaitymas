import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import UsersContext from '../../contexts/UsersContext';
import QuestionCard from '../organisms/QuestionCard';
import styled from 'styled-components';
import FilterButton from '../atoms/FilterButton';

const StyledQuestionsPage = styled.section`
	padding: 2rem 15%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const QuestionsPage = () => {
	const { state: questionsState } = useContext(QuestionsContext);
	const { state: usersState } = useContext(UsersContext);
	console.log(usersState.user);
	return questionsState.loading && usersState.users.length === 0 ? (
		<p>Loading...</p>
	) : (
		<StyledQuestionsPage>
			<div>
				<FilterButton />
			</div>

			{questionsState.questions.map(question => (
				<QuestionCard
					key={question.id}
					question={question}
					creator={usersState.users.find(
						user => user.id === question.creatorId
					)}
				/>
			))}
		</StyledQuestionsPage>
	);
};
export default QuestionsPage;
