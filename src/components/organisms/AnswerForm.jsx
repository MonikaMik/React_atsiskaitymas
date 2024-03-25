import styled from 'styled-components';
import AnswersContext from '../../contexts/AnswersContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import SubmitButton from '../atoms/form/SubmitButton';
import FormErrorMessage from '../atoms/form/FormErrorMessage';
import { v4 as uuidv4 } from 'uuid';

const StyledAnswerForm = styled.form``;

const AnswerForm = ({ questionId, user }) => {
	const { addAnswer, error } = useContext(AnswersContext);

	const formik = useFormik({
		initialValues: {
			answer: ''
		},
		validationSchema: Yup.object({
			answer: Yup.string().required('Answer must not be empty').trim()
		}),
		onSubmit: values => {
			const newAnswer = {
				id: uuidv4(),
				creatorId: user.id,
				questionId: questionId,
				text: values.answer,
				likes: 0,
				edited: false,
				created: new Date().toISOString()
			};
			addAnswer(newAnswer);
		}
	});

	return (
		<StyledAnswerForm onSubmit={formik.handleSubmit}>
			<InputField
				id='answer'
				type='textarea'
				onChangeF={formik.handleChange}
				onBlurF={formik.handleBlur}
				value={formik.values.answer}
				placeholder='Type your wise suggestion here...'
				label={false}
				error={{
					touched: formik.touched.answer,
					message: formik.errors.answer
				}}
			/>
			<SubmitButton type='submit'>Submit</SubmitButton>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</StyledAnswerForm>
	);
};
export default AnswerForm;
