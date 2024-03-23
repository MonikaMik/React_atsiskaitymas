import styled from 'styled-components';
import { BoldText, ThinText } from '../../atoms/Typography';

const StyledQuestionInfo = styled.div``;

const QuestionInfo = ({ title, body }) => {
	return (
		<StyledQuestionInfo>
			<BoldText>{title}</BoldText>
			<ThinText>{body}</ThinText>
		</StyledQuestionInfo>
	);
};
export default QuestionInfo;
