import styled from 'styled-components';

const StyledLogoText = styled.div`
	display: flex;
	align-items: center;
	> span {
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--text-grey);
	}
	> p {
		font-size: 1.5rem;
		font-weight: 700;
		color: black;
		margin: 0;
	}
`;

const LogoText = () => {
	return (
		<StyledLogoText>
			<span>ask</span>
			<p>away</p>
		</StyledLogoText>
	);
};
export default LogoText;
