import styled from 'styled-components';
import AnswersContext from '../../contexts/AnswersContext';
import QuestionsContext from '../../contexts/QuestionsContext';
import UsersContext from '../../contexts/UsersContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import OneQuestionPageCard from '../organisms/OneQuestionPageCard';
import { HeaderTitle } from '../atoms/Typography';
import AnswerForm from '../organisms/AnswerForm';
import CardWrapper from '../atoms/CardWrapper';
import AnswerCard from '../organisms/AnswerCard';

const StyledOneQuestionPage = styled.section`
	padding: 2rem 15%;
`;
const StyledAnswerForm = styled(CardWrapper)`
	display: block;
`;
const StyledAnswerSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin-top: 1.5rem;
`;

const OneQuestionPage = () => {
	const {
		state: { questions, loading: questionsLoading }
	} = useContext(QuestionsContext);
	const {
		state: { users, user, loading: usersLoading }
	} = useContext(UsersContext);
	const {
		state: { answers, loading: answersLoading }
	} = useContext(AnswersContext);
	const { id } = useParams();

	if (questionsLoading || usersLoading || answersLoading) {
		return <div>Loading...</div>;
	}
	const question = questions.find(question => question.id === id);
	console.log(answers);
	return (
		<StyledOneQuestionPage>
			<OneQuestionPageCard question={question} />
			<HeaderTitle>Suggestions</HeaderTitle>
			{user && (
				<StyledAnswerForm>
					<AnswerForm questionId={question.id} user={user} />
				</StyledAnswerForm>
			)}
			<StyledAnswerSection>
				{answers
					.filter(answer => answer.questionId === question.id)
					.map(answer => (
						<AnswerCard key={answer.id} answer={answer} users={users} />
					))}
			</StyledAnswerSection>
		</StyledOneQuestionPage>
	);
};
export default OneQuestionPage;