import styled from 'styled-components';
import { ThinText } from '../atoms/Typography';
import UserInfo from '../molecules/Card/UserInfo';
import { BoldTextLarge } from '../atoms/Typography';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import CardWrapper from '../atoms/CardWrapper';
import QuestionsContext from '../../contexts/QuestionsContext';
import CardActions from '../molecules/Card/CardActions';
import CardMetadata from '../molecules/Card/CardMetadata';
import DialogContext from '../../contexts/DialogContext';
import EditModal from './EditModal';

const StyledOneQuestionPageCard = styled(CardWrapper)`
	gap: 0;
`;
const StyledCardInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0;
	flex-grow: 1;
	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	> img {
		max-height: 25rem;
		width: 60%;
		object-fit: cover;
		object-position: center;
		border-radius: 0.5rem;
		margin: 1rem auto;
	}
`;

const OneQuestionPageCard = ({ question }) => {
	const { state: usersState } = useContext(UsersContext);
	const { state: questionsState } = useContext(QuestionsContext);
	const { editDialogRef } = useContext(DialogContext);

	return (
		(!usersState.loading || !questionsState.loading) && (
			<>
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
							<CardActions
								question={question}
								navigate={true}
								creatorId={question.creatorId}
							/>
						</div>
						<BoldTextLarge>{question.title}</BoldTextLarge>
						<ThinText>{question.text}</ThinText>
						{question.photo && (
							<img src={question.photo} alt={question.title} />
						)}
					</StyledCardInfo>
				</StyledOneQuestionPageCard>
				<dialog ref={editDialogRef}>
					<EditModal question={question} />
				</dialog>
			</>
		)
	);
};
export default OneQuestionPageCard;
