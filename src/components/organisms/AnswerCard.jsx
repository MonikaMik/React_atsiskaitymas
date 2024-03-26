import styled from 'styled-components';
import UserInfo from '../molecules/Card/UserInfo';
import CardActions from '../molecules/Card/CardActions';
import CardWrapper from '../atoms/CardWrapper';
import { FaintText, ThinText } from '../atoms/Typography';
import { useRef } from 'react';
import Divider from '../atoms/Divider';
import AnswerCardMetadata from '../molecules/Card/AnswerCardMetadata';
import EditQuestionModal from './EditQuestionModal';

const StyledAnswerCard = styled(CardWrapper)`
	flex-direction: column;
	gap: 0;
	padding-bottom: 0;
	&:hover {
		.bold-text {
			color: var(--accent-blue);
		}
	}
	border-left: ${props =>
		props.$likes > 0
			? '7px solid var(--accent-orange-faint)'
			: props.$likes < 0
			? '7px solid var(--accent-blue-faint)'
			: '1px solid var(--body-bg)'};
`;
const InfoContainer = styled.div`
	flex-grow: 1;
	display: flex;
	gap: 0.5rem;
	> a {
		text-decoration: none;
		color: black;
	}
`;

const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const AnswerCard = ({ answer, users, user }) => {
	const creator = users.find(user => user.id === answer.creatorId);

	const editDialogRef = useRef(null);

	const showForm = () => {
		editDialogRef.current.showModal();
	};

	const hideForm = () => {
		editDialogRef.current.close();
	};

	return (
		<StyledAnswerCard $likes={answer.likes}>
			<InfoContainer>
				<UserInfo creator={creator} created={answer.created} />
				{answer.edited && (
					<i>
						<FaintText>
							- edited {new Date(answer.edited).toLocaleDateString()},{' '}
							{new Date(answer.edited).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit'
							})}
						</FaintText>
					</i>
				)}
			</InfoContainer>
			<ThinText>{answer.text}</ThinText>
			<Divider />
			<IconContainer>
				<AnswerCardMetadata answer={answer} user={user} />
				{user && creator.id === user.id ? (
					<CardActions showForm={showForm} answer={answer} />
				) : (
					<div></div>
				)}
			</IconContainer>
			<dialog ref={editDialogRef}>
				<EditQuestionModal answer={answer} hideForm={hideForm} />
			</dialog>
		</StyledAnswerCard>
	);
};
export default AnswerCard;
