import styled from 'styled-components';

const StyledPrimaryTitle = styled.h1`
	font-size: 18px;
	color: var(--text-grey);
`;

const PrimaryTitle = ({ text }) => {
	return <StyledPrimaryTitle>{text}</StyledPrimaryTitle>;
};
export default PrimaryTitle;
