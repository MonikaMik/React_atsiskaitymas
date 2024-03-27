import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import QuestionsContext from '../../contexts/QuestionsContext';
import AnswersContext from '../../contexts/AnswersContext';
import QuestionCard from '../organisms/QuestionCard';
import styled from 'styled-components';
import { HeaderTitle } from '../atoms/Typography';
import Icon from '../atoms/Icon';

const StyledUserPage = styled.section`
	flex-basis: 70%;
	padding: 2rem 15% 2rem 5%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const UserInformation = styled.div`
	display: flex;
	gap: 2rem;
	> p {
		background-color: var(--accent-grey);
		color: var(--text-grey);
		border: none;
		border-radius: 100px;
		padding: 0.5rem 0.6rem;
		margin-bottom: 0;
	}
`;

const UserPage = () => {
	const {
		state: { user, users }
	} = useContext(UsersContext);
	const {
		state: { questions }
	} = useContext(QuestionsContext);
	const {
		state: { answers }
	} = useContext(AnswersContext);

	const userQuestions =
		user && questions.length
			? questions.filter(question => question.creatorId === user.id).slice(0, 3)
			: [];
	const likedQuestions =
		user && questions.length
			? user.likedQuestions?.map(likedQuestionId =>
					questions.find(question => question.id === likedQuestionId)
			  )
			: [];
	const userKarmaScore =
		questions
			.filter(question => question.creatorId === user.id)
			.reduce((total, question) => total + question.likes, 0) +
		answers
			.filter(answer => answer.creatorId === user.id)
			.reduce((total, answer) => total + answer.likes, 0);

	return (
		<StyledUserPage>
			<UserInformation>
				<p>
					Questions asked:{' '}
					{questions.filter(question => question.creatorId === user.id).length}
				</p>
				<p>
					Answers provided:{' '}
					{answers.filter(answer => answer.creatorId === user.id).length}
				</p>
				<p>Karma score: {userKarmaScore}</p>
			</UserInformation>
			<HeaderTitle>
				<Icon iconClass='bi bi-trophy' color='var(--text-gray)' size='24px' />
				&nbsp; Your top questions:
			</HeaderTitle>
			{userQuestions.map(question => (
				<QuestionCard
					key={question.id}
					question={question}
					user={user}
					creator={user}
				/>
			))}
			<HeaderTitle>
				<Icon iconClass='bi bi-heart' color='var(--text-gray)' size='24px' />
				&nbsp; You liked these questions the most:{' '}
			</HeaderTitle>
			{likedQuestions.map(question => (
				<QuestionCard
					key={question.id}
					question={question}
					user={user}
					creator={user}
				/>
			))}
		</StyledUserPage>
	);
};
export default UserPage;
