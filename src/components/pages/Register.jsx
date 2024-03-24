import styled from 'styled-components';
import RegisterForm from '../organisms/RegisterForm';
import { PrimaryTitle, SecondaryTitle } from '../atoms/Typography';

const StyledRegister = styled.section`
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
`;

const Register = () => {
	return (
		<StyledRegister>
			<FormContainer>
				<PrimaryTitle>Join AskAway Community</PrimaryTitle>
				<SecondaryTitle>
					Get more features and privileges by joining our most helpful community
				</SecondaryTitle>
				<RegisterForm />
			</FormContainer>
			<img
				src='/assets/register_photo.jpg'
				alt='5 people putting hands together'
			/>
		</StyledRegister>
	);
};
export default Register;
