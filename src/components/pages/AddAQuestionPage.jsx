import styled from 'styled-components';
import QuestionForm from '../organisms/QuestionForm';
import CardWrapper from '../atoms/CardWrapper';
import { HeaderTitle } from '../atoms/Typography';

const StyledAddAQuestionPage = styled.section`
	padding: 2rem 15% 2rem 5%;
	width: 70%;
`;
const FormWrapper = styled(CardWrapper)`
	flex-direction: column;
	padding: 2rem 4rem 3rem;
`;

const AddAQuestionPage = () => {
	return (
		<StyledAddAQuestionPage>
			<FormWrapper>
				<HeaderTitle>Add a question</HeaderTitle>
				<QuestionForm />
			</FormWrapper>
		</StyledAddAQuestionPage>
	);
};
export default AddAQuestionPage;
