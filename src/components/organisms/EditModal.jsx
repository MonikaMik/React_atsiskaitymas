import QuestionForm from './QuestionForm';
import EditAnswerForm from './EditAnswerForm';
import styled from 'styled-components';
import { HeaderTitle } from '../atoms/Typography';
import AnswersContext from '../../contexts/AnswersContext';
import { useContext } from 'react';

const StyledDialog = styled.div`
	width: 50rem;
`;

const EditModal = ({ question, answer }) => {
	const {
		state: { editingAnswer }
	} = useContext(AnswersContext);
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
					<HeaderTitle>{editingAnswer ? 'Edit Answer' : 'Reply'}</HeaderTitle>
					<EditAnswerForm />
				</>
			)}
		</StyledDialog>
	);
};
export default EditModal;
