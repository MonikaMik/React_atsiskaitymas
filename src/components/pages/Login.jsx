import styled from 'styled-components';
import LoginForm from '../organisms/LoginForm';

const StyledLogin = styled.section`
	display: flex;
	width: 100%;
	> img {
		flex-basis: 60%;
	}
`;
const FormContainer = styled.div`
	flex-basis: 40%;
	box-sizing: border-box;
	padding-inline: 5%;
`;

const Login = () => {
	return (
		<StyledLogin>
			<FormContainer>
				<LoginForm />
			</FormContainer>
			<img
				src='https://media.istockphoto.com/id/1328411209/photo/young-bearded-man-and-his-dog-giving-high-five-to-one-another-at-camping.jpg?s=612x612&w=0&k=20&c=dbG1zH8NDN7XR-YCE54GRubKhldZsrDMcy-xPi1tPEI='
				alt='man and dog giving high five'
			/>
		</StyledLogin>
	);
};
export default Login;
