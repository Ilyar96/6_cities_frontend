import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { APPRoute } from '../../const';
import logoUrl from './logo.svg';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsAuth, getUserData } from "../../store/user/selectors";
import emptyAvatarUrl from './avatar.svg';
import { logout } from '../../store/user/user';
import { BACKEND_URL } from '../../services/api';

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const isShowNav = pathname !== APPRoute.LOGIN && pathname !== APPRoute.REGISTER;
	const isAuth = useAppSelector(getIsAuth);
	const user = useAppSelector(getUserData);

	const logOut = () => {
		dispatch(logout());
	};

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Link className="header__logo-link header__logo-link--active" to={APPRoute.MAIN}>
							<img className="header__logo" src={logoUrl} alt="6 cities logo" width={81} height={41} />
						</Link>
					</div>
					{isShowNav && <nav className="header__nav">
						<ul className="header__nav-list">
							{(isAuth && user) ? (<>
								<li className="header__nav-item user">
									<Link className="header__nav-link header__nav-link--profile" to={APPRoute.FAVORITES}>
										<img className="header__avatar" src={user.avatarUrl ? BACKEND_URL + user.avatarUrl : emptyAvatarUrl} alt={`${user.name} avatar`} />
										<span className="header__user-name">{user.email}</span>
										<span className="header__favorite-count">{user.favorites.length}</span>
									</Link>
								</li>
								<li className="header__nav-item">
									<button className="header__nav-link" onClick={logOut}>
										<span className="header__signout">Sign out</span>
									</button>
								</li>
							</>) : (
								<>
									<li className="header__nav-item">
										<Link className="header__nav-link" to={APPRoute.LOGIN}>
											<span className="header__signout">Sign in</span>
										</Link>
									</li>
								</>
							)}
						</ul>
					</nav>}
				</div>
			</div>
		</header>
	);
};
