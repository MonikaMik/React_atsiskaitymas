import styled from 'styled-components';
import { BoldText, ThinText } from '../atoms/Typography';
import UserInfo from '../molecules/Card/UserInfo';
import { BoldTextLarge } from '../atoms/Typography';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import CardWrapper from '../atoms/CardWrapper';
import QuestionsContext from '../../contexts/QuestionsContext';
import CardActions from '../molecules/Card/CardActions';
import CardMetadata from '../molecules/Card/CardMetadata';

const StyledOneQuestionPageCard = styled(CardWrapper)`
	gap: 0;
`;

const StyledCardInfo = styled.div`
	flex-direction: column;
	gap: 0;
	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

const OneQuestionPageCard = ({ question }) => {
	const { state: usersState } = useContext(UsersContext);
	const { state: questionsState, removeQuestion } =
		useContext(QuestionsContext);

	return (
		(!usersState.loading || !questionsState.loading) && (
			<StyledOneQuestionPageCard>
				<CardMetadata question={question} user={usersState.user} />
				<StyledCardInfo>
					<div>
						<UserInfo
							creator={usersState.users.find(
								user => user.id === question.creatorId
							)}
							created={question.created}
							edited={question.edited}
						/>
						{usersState.user && question.creatorId === usersState.user.id ? (
							<CardActions
								id={question.id}
								removeItem={removeQuestion}
								navigate={true}
							/>
						) : (
							<div></div>
						)}
					</div>
					<BoldTextLarge>{question.title}</BoldTextLarge>
					<ThinText>{question.text}</ThinText>
				</StyledCardInfo>
			</StyledOneQuestionPageCard>
		)
	);
};
export default OneQuestionPageCard;
