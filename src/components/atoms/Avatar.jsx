import styled from 'styled-components';

const StyledAvatar = styled.img`
	border-radius: 50%;
	width: 4rem;
	height: 4rem;
`;

const Avatar = ({ src, title }) => {
	return <StyledAvatar src={src} alt={title} />;
};
export default Avatar;
