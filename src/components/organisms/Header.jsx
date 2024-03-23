import styled from 'styled-components';
import Button from '../atoms/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PrimaryTitle } from '../atoms/Typography';

const StyledHeader = styled.header`
	height: 70px;
	background-color: var(--header-bg);
	border-bottom: 1px solid var(--accent-grey);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-inline: 5%;
	> div {
		height: 100%;
		display: flex;
		align-items: center;
		> img {
			height: 50%;
			padding: 0 0.2rem;
		}
		> span {
			font-size: 1.5rem;
			font-weight: 500;
			color: var(--text-grey);
		}
		> p {
			font-size: 1.5rem;
			font-weight: 700;
			color: black;
		}
		> button {
			margin-left: 1rem;
		}
	}
`;

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<StyledHeader>
			<div>
				<img src='https://i.pinimg.com/originals/ba/99/b2/ba99b205df1734df89f55927c43ad598.png' />
				<span>ask</span>
				<p>away</p>
			</div>
			<PrimaryTitle>{location.pathname === '/' && 'Questions'}</PrimaryTitle>
			<div>
				<Button
					text='Sign In'
					theme='primary'
					onClickF={() => navigate('/login')}
				/>
				<Button text='Register' theme='secondary' />
			</div>
		</StyledHeader>
	);
};
export default Header;
