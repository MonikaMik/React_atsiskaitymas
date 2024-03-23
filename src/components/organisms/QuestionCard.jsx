import styled from 'styled-components';
import UserInfo from '../molecules/Card/UserInfo';
import QuestionInfo from '../molecules/Card/QuestionInfo';
import CardMetadata from '../molecules/Card/CardMetadata';
import CardActions from '../molecules/Card/CardActions';
import AnswersContext from '../../contexts/AnswesContext';
import AnswersCount from '../molecules/Card/AnwersCount';
import { useContext } from 'react';

const StyledQuestionCard = styled.div`
	box-shadow: var(--card-shadow);
	padding: 1rem;
	border-radius: 5px;
	background-color: white;
	display: flex;
	gap: 1rem;
	border: 1px solid var(--body-bg);
	border-left: ${props =>
		props.$answers === 0
			? '7px solid var(--accent-orange-faint)'
			: '1px solid var(--body-bg)'};
`;
const InfoContainer = styled.div`
	flex-grow: 1;
`;

const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const QuestionCard = ({ question, creator }) => {
	const { state: answersState } = useContext(AnswersContext);
	const answerCount = answersState.answers.filter(
		answer => answer.questionId === question.id
	).length;

	return (
		<StyledQuestionCard $answers={answerCount}>
			<CardMetadata likes={question.likes} />
			<InfoContainer>
				<UserInfo creator={creator} created={question.created} />
				<QuestionInfo title={question.title} body={question.text} />
			</InfoContainer>
			<IconContainer>
				<CardActions />
				<AnswersCount answerCount={answerCount} />
			</IconContainer>
		</StyledQuestionCard>
	);
};
export default QuestionCard;
