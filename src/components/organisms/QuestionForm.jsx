import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import SubmitButton from '../atoms/form/SubmitButton';
import FormErrorMessage from '../atoms/form/FormErrorMessage';
import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import UsersContext from '../../contexts/UsersContext';
import styled from 'styled-components';
import Button from '../atoms/Button';
import ButtonWrapper from '../atoms/ButtonWrapper';
import { useNavigate } from 'react-router';
import DialogContext from '../../contexts/DialogContext';

const StyledForm = styled.form`
	textarea {
		height: 12lh;
	}
`;

const QuestionForm = () => {
	const {
		addQuestion,
		editQuestion,
		state: { editingQuestion: question, error }
	} = useContext(QuestionsContext);
	const {
		state: { user }
	} = useContext(UsersContext);
	const { hideForm } = useContext(DialogContext);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			text: question ? question.text : '',
			title: question ? question.title : '',
			photo: question ? question.photo : ''
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.min(4, 'Title must be at least 4 symbols long')
				.max(50, 'Title must be at most 50 symbols long')
				.required('Title is required')
				.trim(),
			text: Yup.string()
				.min(10, 'Description must be at least 10 symbols long')
				.max(1000, 'Description must be at most 1000 symbols long')
				.required('Description is required')
				.trim(),
			photo: Yup.string()
				.url('Invalid URL')
				.test('fileFormat', 'Image must end in .png or .jpg', value =>
					['.png', '.jpg'].some(extension => (value || '').endsWith(extension))
				)
		}),
		onSubmit: values => {
			question ? editQuestion(values, question.id) : addQuestion(values);
			formik.resetForm();
			question ? hideForm() : navigate('/');
		},
		enableReinitialize: true
	});

	return (
		<>
			<StyledForm onSubmit={formik.handleSubmit}>
				<InputField
					id='title'
					onChangeF={formik.handleChange}
					onBlurF={formik.handleBlur}
					value={formik.values.title}
					placeholder={'Eye catching title...'}
					error={{
						touched: formik.touched.title,
						message: formik.errors.title
					}}
				/>
				<InputField
					id='text'
					type='textarea'
					onChangeF={formik.handleChange}
					onBlurF={formik.handleBlur}
					placeholder={'Describe your question...'}
					value={formik.values.text}
					error={{
						touched: formik.touched.text,
						message: formik.errors.text
					}}
				/>
				<InputField
					id='photo'
					type='url'
					onChangeF={formik.handleChange}
					onBlurF={formik.handleBlur}
					value={formik.values.photo}
					placeholder={'Attach optional photo...'}
					error={{
						touched: formik.touched.photo,
						message: formik.errors.photo
					}}
				/>
				<ButtonWrapper>
					<Button
						type='button'
						text='Cancel'
						onClickF={() => {
							formik.resetForm();
							question ? hideForm() : navigate('/');
						}}
					/>
					<SubmitButton text='Publish' icon={true} />
				</ButtonWrapper>
			</StyledForm>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</>
	);
};
export default QuestionForm;
