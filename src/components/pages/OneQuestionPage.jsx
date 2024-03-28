import styled from 'styled-components';
import AnswersContext from '../../contexts/AnswersContext';
import QuestionsContext from '../../contexts/QuestionsContext';
import UsersContext from '../../contexts/UsersContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import OneQuestionPageCard from '../organisms/OneQuestionPageCard';
import { HeaderTitle, ThinText } from '../atoms/Typography';
import AnswerForm from '../organisms/AnswerForm';
import CardWrapper from '../atoms/CardWrapper';
import AnswerCard from '../organisms/AnswerCard';
import EditModal from '../organisms/EditModal';
import DialogContext from '../../contexts/DialogContext';

const StyledOneQuestionPage = styled.section`
	padding: 2rem 10% 2rem 5%;
	width: 60%;
	> h1 {
		margin-block: 1.5rem;
	}
	@media (max-width: 900px) {
		width: 100%;
		padding: 2rem;
	}
`;
const StyledAnswerForm = styled(CardWrapper)`
	display: block;
`;
const StyledAnswerSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin-top: 1.5rem;
	> p {
		text-align: center;
	}
`;

const OneQuestionPage = () => {
	const {
		state: { originalQuestions: questions, loading: questionsLoading }
	} = useContext(QuestionsContext);
	const {
		state: { users, user, loading: usersLoading }
	} = useContext(UsersContext);
	const {
		state: { answers, loading: answersLoading }
	} = useContext(AnswersContext);
	const { answerEditDialogRef } = useContext(DialogContext);
	const { id } = useParams();

	if (questionsLoading || usersLoading || answersLoading) {
		return <span className='loader'></span>;
	}

	const question = questions.find(question => question.id === id);
	const answersForQuestion = answers?.filter(
		answer => answer.questionId === question.id
	);
	const repliesForAnswer = answersForQuestion?.filter(
		answer => answer.type === 'reply'
	);
	const answersWithoutReplies = answersForQuestion?.filter(
		answer => answer.type === 'answer'
	);
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
				{answersWithoutReplies?.length ? (
					answersWithoutReplies.map(answer => (
						<div key={answer.id}>
							<AnswerCard answer={answer} users={users} user={user} />
							{repliesForAnswer
								.filter(reply => reply.replyTo === answer.id)
								.map(reply => (
									<AnswerCard
										key={reply.id}
										answer={reply}
										users={users}
										user={user}
									/>
								))}
						</div>
					))
				) : (
					<ThinText>No answers yet...</ThinText>
				)}
			</StyledAnswerSection>
			<dialog ref={answerEditDialogRef}>
				<EditModal answer={{}} />
			</dialog>
		</StyledOneQuestionPage>
	);
};
export default OneQuestionPage;
