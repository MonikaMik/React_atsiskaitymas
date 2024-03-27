import styled from 'styled-components';
import UsersContext from '../../contexts/UsersContext';
import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import { ThinText } from '../atoms/Typography';
import Divider from '../atoms/Divider';
import Icon from '../atoms/Icon';
import SearchInput from '../atoms/form/SearchInput';
import { NavLink } from 'react-router-dom';
import AsideLink from '../molecules/AsideLink';

const StyledAside = styled.aside`
	width: 20%;
	padding-block: 4rem;
	box-sizing: border-box;
	background-color: white;
	min-height: calc(100vh - 71px - 4rem);
	> div > img {
		border-radius: 100%;
		height: 5rem;
		width: 5rem;
	}
`;

const StyledLinks = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	::marker {
		color: var(--accent-blue);
		font-size: 1.5rem;
	}
	> ul {
		margin-block: 0;
		margin-left: 4rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;

		> li {
			> a {
				color: var(--accent-blue);
				text-decoration: none;
				&:hover {
					color: var(--accent-blue);
				}
			}
		}
	}
`;
const StyledUserInfo = styled.div`
	padding-inline: 3rem;
`;
const Aside = () => {
	const {
		state: { user }
	} = useContext(UsersContext);
	const {
		state: { originalQuestions }
	} = useContext(QuestionsContext);
	const userQuestions =
		user &&
		originalQuestions
			.filter(question => question.creatorId === user.id)
			.sort((a, b) => b.created - a.created);

	const oneWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

	const trendingQuestions =
		originalQuestions &&
		originalQuestions
			.filter(
				question =>
					new Date(question.created).getTime() >= oneWeekAgo &&
					question.likes > 0
			)
			.sort((a, b) => b.likes - a.likes)
			.slice(0, 3);

	return (
		<StyledAside>
			{user && (
				<>
					<StyledUserInfo>
						<img src={user.photoUrl} alt='user' />
						<h2>Welcome, @{user.username}</h2>
						<p>{user.email}</p>
					</StyledUserInfo>
					<Divider />
				</>
			)}
			<SearchInput />
			<Divider />
			<StyledLinks>
				<AsideLink link='/' text='Questions' icon='bi bi-list-ul' />
				<AsideLink link='/no' text='Trending' icon='bi bi-arrow-up-right' />
				<ul>
					{trendingQuestions.map(question => (
						<li key={question.id}>
							<NavLink to={`/questions/${question.id}`}>
								{question.title}
							</NavLink>
						</li>
					))}
				</ul>
			</StyledLinks>
			{user && (
				<>
					<Divider />
					<StyledLinks>
						<AsideLink link='/add' text='Ask a question' icon='bi bi-plus' />
						<AsideLink
							link={`/user/${user.id}`}
							text='Your questions'
							icon='bi bi-patch-question'
						/>
						<AsideLink link='/NotFound' text='Your likes' icon='bi bi-heart' />
					</StyledLinks>
				</>
			)}
		</StyledAside>
	);
};
export default Aside;
