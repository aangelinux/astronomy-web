/**
 * Navigation bar for authorized users.
 */

import { Link } from 'react-router'

function NavBar() {
	return (
		<nav>
			<Link to="/">Auth</Link> | {' '}
			<Link to="/dashboard">Dashboard</Link> | {' '}
			<Link to="/neos">Neos</Link> | {' '}
		</nav>
	)
}

export default NavBar