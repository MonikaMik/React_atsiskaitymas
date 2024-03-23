import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import UsersContext from '../../contexts/UsersContext';
import QuestionCard from '../organisms/QuestionCard';
import styled from 'styled-components';
import { PrimaryTitle } from '../atoms/Typography';

const StyledQuestionsPage = styled.section`
	padding-inline: 15%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const QuestionsPage = () => {
	const { state: questionsState } = useContext(QuestionsContext);
	const { state: usersState } = useContext(UsersContext);

	return questionsState.loading && usersState.users.length === 0 ? (
		<p>Loading...</p>
	) : (
		<StyledQuestionsPage>
			<PrimaryTitle>Questions</PrimaryTitle>
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
