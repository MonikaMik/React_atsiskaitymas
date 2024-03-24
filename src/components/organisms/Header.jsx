import styled from 'styled-components';
import Button from '../atoms/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeaderTitle } from '../atoms/Typography';
import LogoText from '../atoms/LogoText';
import Icon from '../atoms/Icon';
import UserInfo from '../molecules/Card/UserInfo';
import { useContext, useState } from 'react';
import UsersContext from '../../contexts/UsersContext';
import FullLogo from '../molecules/FullLogo';

const StyledHeader = styled.header`
	height: 70px;
	background-color: var(--header-bg);
	border-bottom: 1px solid var(--accent-grey);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-inline: 5%;
	gap: 2rem;
	> a {
		text-decoration: none;
	}
`;

const UserActions = styled.div`
	display: flex;
	gap: 2rem;
	align-items: center;
`;

const Header = () => {
	const {
		state: { user, logout }
	} = useContext(UsersContext);
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<StyledHeader>
			<FullLogo />
			<Link to='/'>
				<HeaderTitle>
					{location.pathname === '/' ? (
						'Questions'
					) : (
						<>
							<Icon iconClass='bi bi-arrow-left' color='var(--text-grey)' />
							{' back to Questions'}
						</>
					)}
				</HeaderTitle>
			</Link>
			<UserActions>
				{user ? (
					<>
						<UserInfo creator={user} />
						<button onClick={logout()}>
							<Icon
								iconClass='bi bi-box-arrow-right'
								size='2em'
								color='var(--text-grey)'
							/>
						</button>
					</>
				) : (
					<>
						<Button
							text='Sign In'
							theme='primary'
							onClickF={() => navigate('/login')}
						/>
						<Button
							text='Register'
							theme='secondary'
							onClickF={() => navigate('/register')}
						/>
					</>
				)}
			</UserActions>
		</StyledHeader>
	);
};
export default Header;
