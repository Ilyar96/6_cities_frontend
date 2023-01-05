import React from 'react';
import cn from 'classnames';
import { Header, CitiesTabs } from '../../components';
import { SortTypes } from "../../components/sort/Sort.type";
import { ICity, IOffer } from '../../types/offer.type';
import 'simplebar-react/dist/simplebar.min.css';
import { CitiesLayout } from './citiesLayout/CitiesLayout';
import { EmptyCitiesLayout } from "./emptyCitiesLayout/EmptyCitiesLayout";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffersAction } from '../../store/apiActions';
import { getOffers, getCities, getOffersFetchingStatus } from '../../store/offers/selectors';
import { FetchStatus } from '../../const';

export const MainPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const offers = useAppSelector(getOffers);
	const cities = useAppSelector(getCities);
	const status = useAppSelector(getOffersFetchingStatus);

	const [activeCity, setActiveCity] = React.useState<ICity>(cities[0]);
	const [activeSort, setActiveSort] = React.useState<SortTypes>(SortTypes.POPULAR);
	const filteredOffers = offers
		.filter(offer => offer.city.name === activeCity.name)
		.sort(offerCompare);
	const isEmpty = filteredOffers.length === 0;

	React.useEffect(() => {
		dispatch(fetchOffersAction());
	}, []);

	const sortChangeHandler = (value: SortTypes) => {
		setActiveSort(value);
	};

	function offerCompare(a: IOffer, b: IOffer) {
		switch (activeSort) {
			case SortTypes.PRICE_ASC:
				return a.price - b.price;
			case SortTypes.PRICE_DESC:
				return b.price - a.price;
			case SortTypes.RATE:
				return b.rating - a.rating;
			default:
				return 1;
		}
	};

	const cityItemClickHandler = (city: ICity) => {
		setActiveCity(city);
	};

	return (
		<div className="page page--gray page--main">
			<Header />
			<main
				className={cn(
					"page__main",
					"page__main--index",
					{ "page__main--index-empty": isEmpty }
				)}>
				<h1 className="visually-hidden">Cities</h1>

				<CitiesTabs activeCity={activeCity} onClick={cityItemClickHandler} />


				{isEmpty && status === FetchStatus.FULFILLED ?
					<EmptyCitiesLayout /> :
					<CitiesLayout
						sortType={activeSort}
						city={activeCity}
						offers={filteredOffers}
						sortChangeHandler={sortChangeHandler}
					/>}
			</main>
		</div>
	);
};