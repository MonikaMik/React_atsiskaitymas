import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { useQuestionHandlers } from '../../../hooks/useQuestionHandlers';

const StyledCardMetadata = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-inline: 1rem;
	align-self: center;
	> p {
		font-size: 1.1rem;
		margin-block: 0.8rem;
	}
`;

const ButtonWrapper = styled.button`
	background: none;
	border: none;
`;

const CardMetadata = ({ question, user }) => {
	const { handleLike, handleDislike } = useQuestionHandlers(question);

	return (
		<StyledCardMetadata>
			<ButtonWrapper onClick={() => handleLike()}>
				{user ? (
					user.likedQuestions.includes(question.id) ? (
						<Icon
							iconClass='bi-hand-thumbs-up'
							size='1.5em'
							color='var(--accent-orange-faint)'
						/>
					) : (
						<Icon iconClass='bi-hand-thumbs-up' size='1.5em' color='gray' />
					)
				) : (
					<Icon iconClass='bi-hand-thumbs-up' size='1.5em' color='grey' />
				)}
			</ButtonWrapper>
			<p>{question.likes}</p>
			<ButtonWrapper onClick={() => handleDislike()}>
				{user ? (
					user.dislikedQuestions.includes(question.id) ? (
						<Icon
							iconClass='bi-hand-thumbs-down'
							size='1.5em'
							color='var(--accent-blue-faint)'
						/>
					) : (
						<Icon iconClass='bi-hand-thumbs-down' size='1.5em' color='gray' />
					)
				) : (
					<Icon iconClass='bi-hand-thumbs-down' size='1.5em' color='grey' />
				)}
			</ButtonWrapper>
		</StyledCardMetadata>
	);
};
export default CardMetadata;
