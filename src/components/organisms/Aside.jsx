import styled from 'styled-components';
import UsersContext from '../../contexts/UsersContext';
import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import Divider from '../atoms/Divider';
import SearchInput from '../atoms/form/SearchInput';
import { NavLink } from 'react-router-dom';
import AsideLink from '../molecules/AsideLink';
import Icon from '../atoms/Icon';
import { LinkNoHover } from '../atoms/Typography';

const StyledAside = styled.aside`
	width: max(20%, 22rem);
	min-width: 20rem;
	padding-block: 4rem;
	box-sizing: border-box;
	background-color: white;
	min-height: calc(100vh - 146px);
	> div > img {
		border-radius: 100%;
		height: 5rem;
		width: 5rem;
	}
	@media (max-width: 900px) {
		display: none;
	}
`;
const StyledLinks = styled.nav`
	display: flex;
	flex-direction: column;
	/* margin-right: 1rem; */
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

const Aside = ({ location }) => {
	const {
		state: { user, loading: userLoading }
	} = useContext(UsersContext);
	const {
		state: { originalQuestions, loading: questionsLoading }
	} = useContext(QuestionsContext);

	if (userLoading || questionsLoading) return <span className='loader'></span>;

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
			<SearchInput location={location} />
			<Divider />
			<StyledLinks>
				<AsideLink link='/' text='Questions' icon='bi bi-list-ul' />
				<LinkNoHover>
					<Icon iconClass='bi bi-arrow-up-right' /> Trending
				</LinkNoHover>
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
							text='Your profile'
							icon='bi bi-patch-question'
						/>
						<AsideLink
							link={`/user/${user.id}#liked`}
							text='Your likes'
							icon='bi bi-heart'
						/>
					</StyledLinks>
				</>
			)}
		</StyledAside>
	);
};
export default Aside;
