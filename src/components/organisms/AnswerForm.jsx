import styled from 'styled-components';
import AnswersContext from '../../contexts/AnswersContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import SubmitButton from '../atoms/form/SubmitButton';
import FormErrorMessage from '../atoms/form/FormErrorMessage';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const StyledAnswerForm = styled.form`
	display: flex;
	flex-direction: column;

	button {
		align-self: center;
		width: 10rem;
		margin-top: 0;
	}
`;

const AnswerForm = ({ questionId, user }) => {
	const { addAnswer, error } = useContext(AnswersContext);
	const location = useLocation();

	const formik = useFormik({
		initialValues: {
			answer: ''
		},
		validationSchema: Yup.object({
			answer: Yup.string()
				.required('Answer must not be empty')
				.min(10, 'Description must be at least 10 symbols long')
				.max(1000, 'Description must be at most 1000 symbols long')
				.trim()
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
			formik.resetForm();
		}
	});
	useEffect(() => {
		return () => {
			formik.resetForm();
		};
	}, [location]);

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
			<SubmitButton text='Submit' icon={true} />
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</StyledAnswerForm>
	);
};
export default AnswerForm;
