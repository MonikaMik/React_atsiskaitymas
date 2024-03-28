import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { useAnswerHandlers } from '../../../hooks/useAnswerHandlers';
import { ThinText } from '../../atoms/Typography';

const StyledAnswerMetadata = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const ButtonWrapper = styled.button`
	background: none;
	border: none;
`;

const AnswerCardMetadata = ({ answer, user }) => {
	const { handleLike, handleDislike } = useAnswerHandlers(answer);

	return (
		<StyledAnswerMetadata>
			<ButtonWrapper onClick={() => handleLike()}>
				{user ? (
					user.likedAnswers.includes(answer.id) ? (
						<Icon
							iconClass='bi-hand-thumbs-up'
							size='1rem'
							color='var(--accent-orange-faint)'
						/>
					) : (
						<Icon iconClass='bi-hand-thumbs-up' size='1rem' color='gray' />
					)
				) : (
					<Icon iconClass='bi-hand-thumbs-up' size='1rem' color='gray' />
				)}
			</ButtonWrapper>
			<ThinText>{answer.likes}</ThinText>
			<ButtonWrapper onClick={() => handleDislike()}>
				{user ? (
					user.dislikedAnswers.includes(answer.id) ? (
						<Icon
							iconClass='bi-hand-thumbs-down'
							size='1rem'
							color='var(--accent-blue-faint)'
						/>
					) : (
						<Icon iconClass='bi-hand-thumbs-down' size='1rem' color='gray' />
					)
				) : (
					<Icon iconClass='bi-hand-thumbs-down' size='1rem' color='grey' />
				)}
			</ButtonWrapper>
		</StyledAnswerMetadata>
	);
};
export default AnswerCardMetadata;
