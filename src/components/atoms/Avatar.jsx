import styled from 'styled-components';

const StyledAvatar = styled.img`
	border-radius: 50%;
	width: ${props => (props.$size === 'small' ? '3rem' : '4rem')};
	height: ${props => (props.$size === 'small' ? '3rem' : '4rem')};
`;

const Avatar = ({ src, title, size }) => {
	return <StyledAvatar src={src} alt={title} $size={size} />;
};
export default Avatar;
