import styled from 'styled-components';

const HeaderTitle = styled.h1`
	font-size: 24px;
	color: var(--text-grey);
	&:hover {
		color: black;
	}
`;
const FaintText = styled.p`
	color: var(--text-grey);
	font-size: 12px;
`;
const BoldText = styled.p`
	font-weight: bold;
	font-size: 1.05rem;
`;
const ThinText = styled.p`
	font-weight: 200;
`;
const PrimaryTitle = styled.p`
	font-weight: 700;
	font-size: 2.5rem;
	margin: 0;
`;
const SecondaryTitle = styled.p`
	font-weight: 200;
	font-size: 1.3rem;
	line-height: 1.5;
`;

export {
	PrimaryTitle,
	FaintText,
	BoldText,
	ThinText,
	HeaderTitle,
	SecondaryTitle
};
