import styled from 'styled-components';
import UserInfo from '../molecules/Card/UserInfo';
import QuestionInfo from '../molecules/Card/QuestionInfo';
import CardMetadata from '../molecules/Card/CardMetadata';
import CardActions from '../molecules/Card/CardActions';
import AnswersContext from '../../contexts/AnswersContext';
import AnswersCount from '../molecules/Card/AnwersCount';
import CardWrapper from '../atoms/CardWrapper';
import QuestionsContext from '../../contexts/QuestionsContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const StyledQuestionCard = styled(CardWrapper)`
	border-left: ${props =>
		props.$answers === 0
			? '10px solid var(--accent-grey)'
			: '1px solid var(--body-bg)'};
`;
const InfoContainer = styled.div`
	flex-grow: 1;
	> a {
		text-decoration: none;
		color: black;
	}
`;

const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	> a {
		text-decoration: none;
		color: var(--text-grey);
	}
`;

const QuestionCard = ({ question, creator, user }) => {
	const { state: answersState } = useContext(AnswersContext);
	const { removeQuestion } = useContext(QuestionsContext);

	const answerCount = answersState.answers.filter(
		answer => answer.questionId === question.id
	).length;

	return (
		<StyledQuestionCard $answers={answerCount}>
			<CardMetadata question={question} user={user} />
			<InfoContainer>
				<UserInfo
					creator={creator}
					created={question.created}
					edited={question.edited}
				/>
				<Link to={`/questions/${question.id}`}>
					<QuestionInfo title={question.title} body={question.text} />
				</Link>
			</InfoContainer>
			<IconContainer>
				{user && creator.id === user.id ? (
					<CardActions id={question.id} removeItem={removeQuestion} />
				) : (
					<div></div>
				)}
				<Link to={`/questions/${question.id}`}>
					<AnswersCount answerCount={answerCount} />
				</Link>
			</IconContainer>
		</StyledQuestionCard>
	);
};
export default QuestionCard;
