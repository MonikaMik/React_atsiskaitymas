import styled from 'styled-components';
import UserInfo from '../molecules/Card/UserInfo';
import CardActions from '../molecules/Card/CardActions';
import CardWrapper from '../atoms/CardWrapper';
import { FaintText, ThinText } from '../atoms/Typography';
import Divider from '../atoms/Divider';
import AnswerCardMetadata from '../molecules/Card/AnswerCardMetadata';
import AnswersContext from '../../contexts/AnswersContext';
import { useContext } from 'react';
import Icon from '../atoms/Icon';

const StyledAnswerCard = styled(CardWrapper)`
	border-radius: 0;
	flex-direction: column;
	gap: 0;
	padding-bottom: 0;
	margin-left: ${props => props.$type === 'reply' && '2rem'};
	margin-top: ${props => props.$type === 'reply' && '1.5rem'};
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
			: '7px solid var(--body-bg)'};
	> .bi-arrow-return-right {
		margin-left: -3.4rem;
		margin-top: -1.7rem;
		&:hover {
			cursor: default;
			transform: none;
		}
	}
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

const CardDivider = styled(Divider)`
	margin: 0;
`;

const AnswerCard = ({ answer, users, user }) => {
	const creator = users.find(user => user.id === answer.creatorId);
	const {
		state: { answers }
	} = useContext(AnswersContext);

	return (
		<StyledAnswerCard $likes={answer.likes} $type={answer.type}>
			{answer.type === 'reply' && (
				<Icon
					iconClass='bi bi-arrow-return-right'
					size='1.6rem'
					color='var(--accent-orange)'
				/>
			)}
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
			<ThinText>
				{answer.type === 'reply' &&
					answers.map(a => {
						if (a.id === answer.replyTo) {
							const user = users.find(user => user.id === a.creatorId);
							return user ? <b key={a.id}>@{user.username} </b> : null;
						}
						return null;
					})}
				{answer.text}
			</ThinText>
			<CardDivider />
			<IconContainer>
				<AnswerCardMetadata answer={answer} user={user} />
				<CardActions answer={answer} creatorId={creator.id} />
			</IconContainer>
		</StyledAnswerCard>
	);
};
export default AnswerCard;
