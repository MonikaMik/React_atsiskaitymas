import Icon from '../../atoms/Icon';
import styled from 'styled-components';

const StyledAnswersCount = styled.div`
	display: flex;
	gap: 0.4rem;
	align-items: center;
`;

const AnswersCount = ({ answerCount }) => {
	return (
		<StyledAnswersCount>
			<Icon iconClass='bi-chat-left' size='1rem' color='gray' />
			<span>{answerCount}</span>
		</StyledAnswersCount>
	);
};
export default AnswersCount;
