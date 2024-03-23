import styled from 'styled-components';

const StyledFaintText = styled.p`
	color: var(--text-grey);
	font-size: 5px;
`;

const FaintText = ({ text }) => {
	return <StyledFaintText>{text}</StyledFaintText>;
};
export default FaintText;
