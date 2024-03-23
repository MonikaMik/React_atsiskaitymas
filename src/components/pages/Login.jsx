import styled from 'styled-components';
import LoginForm from '../organisms/LoginForm';

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
	box-sizing: border-box;
	padding-inline: 5%;
`;

const Login = () => {
	return (
		<StyledLogin>
			<FormContainer>
				<LoginForm />
			</FormContainer>
			<img src='/assets/login_photo.jpg' alt='man and dog giving high five' />
		</StyledLogin>
	);
};
export default Login;
