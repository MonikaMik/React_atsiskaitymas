import styled from 'styled-components';
import FooterInfo from '../molecules/Footer/FooterInfo';

const StyledFooter = styled.footer`
	background-color: white;
	height: 4rem;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-inline: 5%;
	gap: 2rem;
	> * {
		flex: 1;
		text-align: center;
	}
	@media (max-width: 900px) {
		flex-direction: column;
		gap: 0;
		width: 100%;
		height: 10rem;
	}
`;

const Footer = () => {
	return (
		<StyledFooter>
			<FooterInfo />
		</StyledFooter>
	);
};
export default Footer;
