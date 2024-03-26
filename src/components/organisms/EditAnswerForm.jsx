import styled from 'styled-components';
import AnswersContext from '../../contexts/AnswersContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import SubmitButton from '../atoms/form/SubmitButton';
import FormErrorMessage from '../atoms/form/FormErrorMessage';
import ButtonWrapper from '../atoms/ButtonWrapper';
import Button from '../atoms/Button';

const StyledAnswerForm = styled.form`
	display: flex;
	flex-direction: column;

	button {
		align-self: center;
		width: 10rem;
		margin-top: 0;
	}
`;

const EditAnswerForm = ({ answer, hideForm }) => {
	const { editAnswer, error } = useContext(AnswersContext);

	const formik = useFormik({
		initialValues: {
			text: answer.text
		},
		validationSchema: Yup.object({
			text: Yup.string().required('Answer must not be empty').trim()
		}),
		onSubmit: values => {
			editAnswer(values, answer.id);
			formik.resetForm();
			hideForm();
		}
	});

	return (
		<StyledAnswerForm onSubmit={formik.handleSubmit}>
			<InputField
				id='text'
				type='textarea'
				onChangeF={formik.handleChange}
				onBlurF={formik.handleBlur}
				value={formik.values.text}
				placeholder='Type your wise suggestion here...'
				label={false}
				error={{
					touched: formik.touched.text,
					message: formik.errors.text
				}}
			/>
			<ButtonWrapper>
				<Button
					type='button'
					text='Cancel'
					onClickF={() => {
						formik.resetForm();
						hideForm();
					}}
				/>
				<SubmitButton text='Submit' icon={true} />
			</ButtonWrapper>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</StyledAnswerForm>
	);
};
export default EditAnswerForm;
