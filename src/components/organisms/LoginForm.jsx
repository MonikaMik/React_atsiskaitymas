import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import SubmitButton from '../atoms/form/SubmitButton';
import FormErrorMessage from '../atoms/form/FormErrorMessage';

const LoginForm = () => {
	const {
		login,
		state: { error }
	} = useContext(UsersContext);

	const formik = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Username is required').trim(),
			password: Yup.string().required('Password is required').trim()
		}),
		onSubmit: values => {
			login(values.username, values.password);
		}
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<InputField
					id='username'
					onChangeF={formik.handleChange}
					onBlurF={formik.handleBlur}
					value={formik.values.username}
					error={{
						touched: formik.touched.username,
						message: formik.errors.username
					}}
				/>
				<InputField
					id='password'
					type='password'
					onChangeF={formik.handleChange}
					onBlurF={formik.handleBlur}
					value={formik.values.password}
					error={{
						touched: formik.touched.password,
						message: formik.errors.password
					}}
				/>

				<SubmitButton text='Sign In' />
			</form>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</>
	);
};
export default LoginForm;
