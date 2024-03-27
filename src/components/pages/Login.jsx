import styled from 'styled-components';
import LoginForm from '../organisms/LoginForm';
import { PrimaryTitle, SecondaryTitle } from '../atoms/Typography';
import { useEffect } from 'react';
import { usersActionTypes } from '../../contexts/UsersContext';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';

const StyledLogin = styled.section`
	display: flex;
	flex: 1;
	height: calc(100vh - 71px - 4rem);
	> img {
		width: 60%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 10%;
	}
`;
const FormContainer = styled.div`
	width: 40%;
	min-width: 500px;
	box-sizing: border-box;
	padding-inline: 10%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	> form > .loggedIn {
		margin-block: 1.3rem;
		input[type='checkbox'] {
			-webkit-appearance: none;
			appearance: none;
			width: 16px;
			height: 16px;
			background-color: white;
			border: 1px solid #ddd;
			border-radius: 3px;
			position: relative;
		}

		input[type='checkbox']:checked {
			background-color: var(--accent-orange);
			border: none;
		}

		input[type='checkbox']:checked::after {
			content: '';
			position: absolute;
			width: 5px;
			height: 10px;
			border: solid white;
			border-width: 0 2px 2px 0;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(45deg);
		}
	}
`;

const Login = () => {
	const { dispatch } = useContext(UsersContext);
	useEffect(() => {
		return () => {
			dispatch({
				type: usersActionTypes.CLEAR_ERROR
			});
		};
	}, []);
	return (
		<StyledLogin>
			<FormContainer>
				<PrimaryTitle>We've Missed you!</PrimaryTitle>
				<SecondaryTitle>
					Many questions are waiting for your wise suggestions!
				</SecondaryTitle>
				<LoginForm />
			</FormContainer>
			<img src='/assets/login_photo.jpg' alt='man and dog giving high five' />
		</StyledLogin>
	);
};
export default Login;
