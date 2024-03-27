import styled from 'styled-components';

const Toast = styled(({ bgColor, ...props }) => <div {...props} />)`
	position: fixed;
	top: 10rem;
	right: 0;
	background-color: ${props =>
		props.bgColor === 'success' ? 'var(--toast-green)' : 'var(--toast-red)'};
	color: #fff;
	padding: 1rem 2rem;
	border-radius: 5px;
	animation: slideIn 0.5s ease, fadeOut 0.5s 2.5s ease;
	animation-fill-mode: forwards;
`;

export default Toast;
