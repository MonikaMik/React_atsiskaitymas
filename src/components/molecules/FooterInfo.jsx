import styled from 'styled-components';
import Icon from '../atoms/Icon';
import { BoldText, ThinText } from '../atoms/Typography';
import LogoText from '../atoms/LogoText';

const StyledFooterInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-inline: 5%;
	padding-block: 0.5rem;
	gap: 2rem;
	> * {
		flex: 1;
		text-align: center;
	}
`;

const IconContainer = styled.div`
	display: flex;
	gap: 3rem;
	flex-grow: 0;
	justify-self: center;
`;

const LogoSection = styled.div`
	flex-grow: 1;
	text-align: left;
`;

const Copyrights = styled.div`
	display: flex;
	gap: 2rem;
	justify-content: flex-end;
	align-items: center;
	> p {
		margin: 0;
	}
`;

const FooterInfo = () => {
	return (
		<>
			<LogoSection>
				<LogoText />
			</LogoSection>
			<IconContainer>
				<Icon iconClass={'bi bi-facebook'} size='1.5rem' />
				<Icon iconClass={'bi bi-instagram'} size='1.5rem' />
				<Icon iconClass={'bi bi-twitter'} size='1.5rem' />
			</IconContainer>
			<Copyrights>
				<p>© AskAway. Vilnius, 2024</p>
				<p>Terms & Conditions</p>
			</Copyrights>
		</>
	);
};
export default FooterInfo;
