import styled from 'styled-components';
import { BoldText, ThinTextTwoLines } from '../../atoms/Typography';

const StyledQuestionInfo = styled.div`
	&:hover {
		.bold-text {
			color: var(--accent-blue);
		}
	}
`;

const QuestionInfo = ({ title, body }) => {
	return (
		<StyledQuestionInfo>
			<BoldText className='bold-text'>{title}</BoldText>
			<ThinTextTwoLines>{body}</ThinTextTwoLines>
		</StyledQuestionInfo>
	);
};
export default QuestionInfo;
