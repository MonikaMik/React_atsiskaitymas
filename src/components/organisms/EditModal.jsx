import QuestionForm from './QuestionForm';
import EditAnswerForm from './EditAnswerForm';
import styled from 'styled-components';
import { HeaderTitle } from '../atoms/Typography';

const StyledDialog = styled.div`
	width: 50rem;
`;

const EditModal = ({ question, answer }) => {
	return (
		<StyledDialog>
			{question && (
				<>
					<HeaderTitle>Edit Question</HeaderTitle>
					<QuestionForm />
				</>
			)}
			{answer && (
				<>
					<HeaderTitle>Edit Answer</HeaderTitle>
					<EditAnswerForm />
				</>
			)}
		</StyledDialog>
	);
};
export default EditModal;
