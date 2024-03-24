import LogoText from '../atoms/LogoText';
import styled from 'styled-components';

const StyledFullLogo = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	> img {
		height: 50%;
		padding: 0 0.2rem;
	}
`;

const FullLogo = () => {
	return (
		<StyledFullLogo>
			<img src='https://i.pinimg.com/originals/ba/99/b2/ba99b205df1734df89f55927c43ad598.png' />
			<LogoText />
		</StyledFullLogo>
	);
};
export default FullLogo;
