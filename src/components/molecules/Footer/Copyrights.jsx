import styled from 'styled-components';

const StyledCopyRight = styled.div`
	background-color: var(--accent-grey);
	display: flex;
	justify-content: space-between;
	padding-inline: var(--page-padding-sides);
	color: white;
	padding-block: 0.4rem;
`;

const Copyrights = () => {
	return (
		<StyledCopyRight>
			<p>© AskAway. Vilnius, 2024</p>
			<p>Terms & Conditions</p>
		</StyledCopyRight>
	);
};

export default Copyrights;
