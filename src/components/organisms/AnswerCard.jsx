import styled from 'styled-components';
import UserInfo from '../molecules/Card/UserInfo';
import CardActions from '../molecules/Card/CardActions';
import CardWrapper from '../atoms/CardWrapper';
import { FaintText, ThinText } from '../atoms/Typography';
import Icon from '../atoms/Icon';
import Divider from '../atoms/Divider';

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
	> div {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
`;

const AnswerCard = ({ answer, users }) => {
	const creator = users.find(user => user.id === answer.creatorId);

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
				<div>
					<Icon iconClass='bi-hand-thumbs-up' size='1rem' color='gray' />
					<ThinText>{answer.likes}</ThinText>
					<Icon iconClass='bi-hand-thumbs-down' size='1rem' color='gray' />
				</div>
				<CardActions />
			</IconContainer>
		</StyledAnswerCard>
	);
};
export default AnswerCard;
