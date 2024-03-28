import styled from 'styled-components';
import AnswersContext from '../../contexts/AnswersContext';
import { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import SubmitButton from '../atoms/form/SubmitButton';
import FormErrorMessage from '../atoms/form/FormErrorMessage';
import ButtonWrapper from '../atoms/ButtonWrapper';
import Button from '../atoms/Button';
import DialogContext from '../../contexts/DialogContext';
import UsersContext from '../../contexts/UsersContext';

const StyledAnswerForm = styled.form`
	display: flex;
	flex-direction: column;

	button {
		align-self: center;
		width: 10rem;
		margin-top: 0;
	}
`;

const EditAnswerForm = () => {
	const {
		editAnswer,
		addAnswer,
		error,
		state: { editingAnswer: answer, reply }
	} = useContext(AnswersContext);
	const {
		state: { user }
	} = useContext(UsersContext);
	const { hideAnswerForm } = useContext(DialogContext);

	const formik = useFormik({
		initialValues: {
			text: answer ? answer.text : '',
			type: answer ? 'answer' : 'reply'
		},
		validationSchema: Yup.object({
			text: Yup.string()
				.required('Answer must not be empty')
				.max(1000, 'Description must be at most 1000 symbols long')
				.trim()
		}),
		onSubmit: values => {
			answer
				? editAnswer(values, answer.id)
				: addAnswer(values, reply.questionId, user.id, reply.id);
			formik.resetForm();
			hideAnswerForm();
		},
		enableReinitialize: true
	});

	return (
		<StyledAnswerForm onSubmit={formik.handleSubmit}>
			<InputField
				id='text'
				type='textarea'
				onChangeF={formik.handleChange}
				onBlurF={formik.handleBlur}
				value={formik.values.text}
				placeholder={
					answer
						? 'Type your wise suggestion here...'
						: 'Type your reply here...'
				}
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
						hideAnswerForm();
					}}
				/>
				<SubmitButton text='Submit' icon={true} />
			</ButtonWrapper>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</StyledAnswerForm>
	);
};
export default EditAnswerForm;
