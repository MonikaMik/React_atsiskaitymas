import QuestionForm from './QuestionForm';
import EditAnswerForm from './EditAnswerForm';
import styled from 'styled-components';
import { HeaderTitle } from '../atoms/Typography';

const StyledDialog = styled.div`
	width: 50rem;
`;

const EditQuestionModal = ({ question, hideForm, answer }) => {
	return (
		<StyledDialog>
			{question && (
				<>
					<HeaderTitle>Edit Question</HeaderTitle>
					<QuestionForm question={question} hideForm={hideForm} />
				</>
			)}
			{answer && (
				<>
					<HeaderTitle>Edit Answer</HeaderTitle>
					<EditAnswerForm answer={answer} hideForm={hideForm} />
				</>
			)}
		</StyledDialog>
	);
};
export default EditQuestionModal;
