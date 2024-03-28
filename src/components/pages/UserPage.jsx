import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import QuestionsContext from '../../contexts/QuestionsContext';
import AnswersContext from '../../contexts/AnswersContext';
import QuestionCard from '../organisms/QuestionCard';
import styled from 'styled-components';
import { HeaderTitle } from '../atoms/Typography';
import Icon from '../atoms/Icon';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
		state: { user, users, loading: usersLoading }
	} = useContext(UsersContext);
	const {
		state: { originalQuestions: questions, loading: questionsLoading }
	} = useContext(QuestionsContext);
	const {
		state: { answers, loading: answersLoading }
	} = useContext(AnswersContext);
	const location = useLocation();
	useEffect(() => {
		if (location.hash) {
			let elem = document.getElementById(location.hash.slice(1));
			if (elem) elem.scrollIntoView({ behavior: 'smooth' });
		}
	}, [location]);

	if (questionsLoading || usersLoading || answersLoading) {
		return <span className='loader'></span>;
	}
	const userQuestions = questions?.length
		? questions.filter(question => question.creatorId === user.id).slice(0, 5)
		: [];
	const likedQuestions = questions?.length
		? user.likedQuestions
				.map(likedQuestionId =>
					questions.find(question => question.id === likedQuestionId)
				)
				.filter(Boolean)
				.slice(0, 5)
		: [];
	const userKarmaScore =
		questions
			?.filter(question => question.creatorId === user.id)
			.reduce((total, question) => total + question.likes, 0) +
		answers
			?.filter(answer => answer.creatorId === user.id)
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
			{userQuestions.length ? (
				userQuestions.map(question => (
					<QuestionCard
						key={question.id}
						question={question}
						user={user}
						creator={user}
						noEdit={true}
					/>
				))
			) : (
				<p>You haven't asked any questions yet...</p>
			)}
			<HeaderTitle id='liked'>
				<Icon iconClass='bi bi-heart' color='var(--text-gray)' size='24px' />
				&nbsp; You liked these questions the most:{' '}
			</HeaderTitle>
			{likedQuestions.length ? (
				likedQuestions.map(question => (
					<QuestionCard
						key={question.id}
						question={question}
						user={user}
						creator={users.find(user => user.id === question.creatorId)}
						noEdit={true}
					/>
				))
			) : (
				<p>You haven't liked any questions yet...</p>
			)}
		</StyledUserPage>
	);
};
export default UserPage;
