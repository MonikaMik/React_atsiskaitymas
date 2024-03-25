import styled from 'styled-components';
import { BoldText, ThinText } from '../atoms/Typography';
import UserInfo from '../molecules/Card/UserInfo';
import { BoldTextLarge } from '../atoms/Typography';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import CardWrapper from '../atoms/CardWrapper';

const StyledOneQuestionPageCard = styled(CardWrapper)`
	flex-direction: column;
	gap: 0;
	padding: 2rem;
`;

const OneQuestionPageCard = ({ question }) => {
	const { state: usersState } = useContext(UsersContext);

	return usersState.loading ? (
		<p>Loading...</p>
	) : (
		<StyledOneQuestionPageCard>
			<UserInfo
				creator={usersState.users.find(user => user.id === question.creatorId)}
				created={question.created}
			/>
			<BoldTextLarge>{question.title}</BoldTextLarge>

			<ThinText>{question.text}</ThinText>
		</StyledOneQuestionPageCard>
	);
};
export default OneQuestionPageCard;
