import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import InputField from '../molecules/InputField';
import SubmitButton from '../atoms/form/SubmitButton';
import FormErrorMessage from '../atoms/form/FormErrorMessage';

const RegisterForm = () => {
	const {
		register,
		state: { error }
	} = useContext(UsersContext);

	const formik = useFormik({
		initialValues: {
			id: '',
			username: '',
			email: '',
			password: '',
			passwordRepeat: '',
			photoUrl: ''
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.min(4, 'Username must be at least 4 symbols long')
				.max(20, 'Username must be at most 20 symbols long')
				.required('Username is required')
				.trim(),
			email: Yup.string()
				.email('Field be must be a valid email')
				.required('Required')
				.trim(),
			password: Yup.string()
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
					'Password must be at least: one lower case, one upper case, one number, one special symbol and length to be between 8 and 25 symbols'
				)
				.required('Password is required')
				.trim(),
			passwordRepeat: Yup.string()
				.required('Password repeat is required')
				.oneOf([Yup.ref('password')], 'Passwords must match'),
			avatarURL: Yup.string().url('Field must be a valid url').trim()
		}),
		onSubmit: values => {
			const newUser = {
				id: uuidv4(),
				username: values.username,
				email: values.email,
				password: bcrypt.hashSync(values.password, 10),
				photoUrl: values.photoUrl
			};
			register(newUser);
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
					id='email'
					type='email'
					onChangeF={formik.handleChange}
					onBlurF={formik.handleBlur}
					value={formik.values.email}
					error={{
						touched: formik.touched.email,
						message: formik.errors.email
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
				<InputField
					id='passwordRepeat'
					type='password'
					onChangeF={formik.handleChange}
					onBlurF={formik.handleBlur}
					value={formik.values.passwordRepeat}
					error={{
						touched: formik.touched.passwordRepeat,
						message: formik.errors.passwordRepeat
					}}
				/>
				<InputField
					id='photoUrl'
					type='url'
					onChangeF={formik.handleChange}
					onBlurF={formik.handleBlur}
					value={formik.values.photoUrl}
					error={{
						touched: formik.touched.photoUrl,
						message: formik.errors.photoUrl
					}}
				/>
				<SubmitButton text='Register' />
			</form>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</>
	);
};
export default RegisterForm;
