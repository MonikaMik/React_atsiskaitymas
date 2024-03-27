import styled from 'styled-components';
import Button from '../atoms/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeaderTitle } from '../atoms/Typography';
import Icon from '../atoms/Icon';
import UserInfo from '../molecules/Card/UserInfo';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import FullLogo from '../molecules/FullLogo';
import ButtonWrapper from '../atoms/ButtonWrapper';

const StyledHeader = styled.header`
	height: 80px;
	background-color: var(--header-bg);
	border-bottom: 1px solid var(--accent-grey);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-inline: 5%;
	gap: 2rem;
	position: relative;
	> a {
		text-decoration: none;
	}
	> .link {
		position: absolute;
		margin-left: calc(20% - 2rem);
	}
`;

const UserActions = styled.div`
	display: flex;
	gap: 2rem;
	align-items: center;
`;

const Header = () => {
	const {
		state: { user, loading },
		logout
	} = useContext(UsersContext);
	const location = useLocation();
	const navigate = useNavigate();

	if (loading) return <span className='loader'></span>;

	return (
		<StyledHeader>
			<Link to='/'>
				<FullLogo />
			</Link>
			<Link to='/' className='link'>
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
						<Button
							text='Ask a question'
							theme='primary'
							onClickF={() => navigate('/add')}
							icon='bi bi-plus'
						/>
						<UserInfo creator={user} />
						<Icon
							iconClass='bi bi-box-arrow-right'
							size='2em'
							color='var(--text-grey)'
							onClickF={() => logout()}
						/>
					</>
				) : (
					<ButtonWrapper>
						<Button
							text='Register'
							theme='secondary'
							onClickF={() => navigate('/register')}
							icon='bi bi-person-plus'
						/>
						<Button
							text='Sign In'
							theme='primary'
							onClickF={() => navigate('/login')}
						/>
					</ButtonWrapper>
				)}
			</UserActions>
		</StyledHeader>
	);
};
export default Header;
