import styled from 'styled-components';
import AnswersContext from '../../contexts/AnswersContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import SubmitButton from '../atoms/form/SubmitButton';
import FormErrorMessage from '../atoms/form/FormErrorMessage';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const StyledAnswerForm = styled.form`
	display: flex;
	flex-direction: column;
	> textarea {
		height: 3lh;
	}
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
			text: '',
			type: 'answer'
		},
		validationSchema: Yup.object({
			text: Yup.string()
				.required('Answer must not be empty')
				.min(10, 'Description must be at least 10 symbols long')
				.max(1000, 'Description must be at most 1000 symbols long')
				.trim()
		}),
		onSubmit: values => {
			addAnswer(values, questionId, user.id);
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
			<SubmitButton text='Submit' icon={true} />
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</StyledAnswerForm>
	);
};
export default AnswerForm;
