import styled from 'styled-components';

const StyledNotFountSection = styled.section`
	flex-basis: 70%;
	padding: 2rem 15% 2rem 5%;
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: center;
	gap: 2rem;
	> img {
		border-radius: 100%;
		height: 40rem;
		width: 40rem;
		box-shadow: 5px 5px 10px 1px #0000002c;
	}
	> h2 {
		font-size: 3rem;
	}
`;

const NotFound = () => {
	return (
		<StyledNotFountSection>
			<img src='/assets/errorDog.jpg' alt='Sleepy dog' />
			<h2>404 Not Found</h2>
		</StyledNotFountSection>
	);
};
export default NotFound;
