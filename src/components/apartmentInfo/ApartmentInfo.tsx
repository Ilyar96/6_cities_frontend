import React from 'react';
import { getIsFavorite, toCapitalize } from "../../utils";
import { User } from '../user/User';
import { ApartmentInfoProps } from './ApartmentInfo.type';
import { Rating } from '../rating/Rating';
import { useAppSelector } from "../../hooks";
import { getFavoritesStatus, getFavorites } from "../../store/user/selectors";
import { FetchStatus } from "../../const";
import cn from 'classnames';
import { useFavoriteOffer } from "../../hooks/useFavoriteOfferHandler";
const pluralize = require('pluralize');

export const ApartmentInfo: React.FC<ApartmentInfoProps> = ({ offer }) => {
	const favoritesStatus = useAppSelector(getFavoritesStatus);
	const favoritesList = useAppSelector(getFavorites);
	const { toggleFavoriteOfferHandler } = useFavoriteOffer();

	return (
		<>
			{offer.isPremium && <div className="property__mark">
				<span>Premium</span>
			</div>}
			<div className="property__name-wrapper">
				<h1 className="property__name">{offer.title}</h1>
				<button
					className={cn("property__bookmark-button", "button", {
						"property__bookmark-button--active": getIsFavorite(favoritesList, offer._id)
					})}
					type="button"
					disabled={favoritesStatus === FetchStatus.PENDING}
					onClick={() => toggleFavoriteOfferHandler(offer._id)}
				>
					<svg className="property__bookmark-icon" width={31} height={33}>
						<use xlinkHref="#icon-bookmark" />
					</svg>
					<span className="visually-hidden">{getIsFavorite(favoritesList, offer._id) ? "In bookmarks" : "To bookmarks"}</span>
				</button>

				<div className="property__address">{offer.address}</div>

			</div>

			<Rating defaultValue={offer.rating} isCountVisible ratingSize="l" />

			<ul className="property__features">
				<li className="property__feature property__feature--entire">
					{toCapitalize(offer.type)}
				</li>
				<li className="property__feature property__feature--bedrooms">
					{offer.bedrooms} {pluralize("Bedrooms", offer.bedrooms)}
				</li>
				<li className="property__feature property__feature--adults">
					Max {offer.maxAdults} {pluralize("adults", offer.maxAdults)}
				</li>
			</ul>

			<div className="property__price">
				<b className="property__price-value">€{offer.price}</b>
				<span className="property__price-text">&nbsp;night</span>
			</div>
			<div className="property__inside">
				<h2 className="property__inside-title">What's inside</h2>
				<ul className="property__inside-list">
					{offer.goods.map(g => (
						<li className="property__inside-item" key={g}>{g}</li>
					))}
				</ul>
			</div>
			<div className="property__host">
				<h2 className="property__host-title">Meet the host</h2>

				<User user={offer.host} />

				<div className="property__description">
					<p className="property__text">{offer.description}</p>
				</div>
			</div>
		</>
	);
};
