import { Header, Footer } from '../../components';
import { favoriteList } from '../../mockData';
import { ApartmentCard } from '../../components/apartmentCard/ApartmentCard';
import { Link } from "react-router-dom";
import { APPRoute } from "../../const";

export const Favorites = () => {

	return (
		<div className="page">
			<Header />
			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">
							{Object.entries(favoriteList).map(([city, offers]) => (
								<li className="favorites__locations-items" key={city}>
									<div className="favorites__locations locations locations--current">
										<div className="locations__item">
											<Link className="locations__item-link" to={APPRoute.APARTMENT}>
												<span>{city}</span>
											</Link>
										</div>
									</div>
									<div className="favorites__places">
										{offers.map((offer) => (
											<ApartmentCard className="favorites__card" key={offer.id} data={offer} />
										))}
									</div>
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>
			<Footer />
		</div>

	);
};