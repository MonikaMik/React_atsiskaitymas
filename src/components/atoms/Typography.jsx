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
	font-size: 14px;
`;
const BoldText = styled.p`
	font-weight: bold;
	font-size: 1.15rem;
`;
const BoldTextLarge = styled.h3`
	font-weight: bold;
	font-size: 1.5rem;
	text-align: center;
`;
const ThinTextTwoLines = styled.p`
	font-weight: 200;
	line-height: 1.5;
	font-size: 1.05rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const ThinText = styled.p`
	font-weight: 200;
	line-height: 1.5;
	font-size: 1.05rem;
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
const LinkNoHover = styled.p`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-block: 0.8rem;
	padding-left: 3rem;
	margin-block: 0;
	color: var(--text-grey);
	> i {
		color: var(--text-grey);
	}
`;

export {
	PrimaryTitle,
	FaintText,
	BoldText,
	ThinText,
	HeaderTitle,
	SecondaryTitle,
	ThinTextTwoLines,
	BoldTextLarge,
	LinkNoHover
};
