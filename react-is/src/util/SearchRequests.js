import { API_BASE_URL } from "../constants";
import axios from 'axios';


export function search(sort, category, keyword, minPrice, maxPrice, shopId) {
    return axios.get(API_BASE_URL + '/search' + createQueryString(sort, category, keyword, minPrice, maxPrice, shopId));
}

export function createQueryString (sort, category, keyword, minPrice, maxPrice, shopId) {

    let queryString = '?sort=' + sort;

    if (category !== "" && category !== "-1") queryString = queryString + '&categoryId=' + category;

    if (keyword.length > 0) queryString = queryString + '&keyword=' + keyword.replace(/\s/g, '-');

    if (minPrice.length > 0 && minPrice !== '0.' && minPrice !== '0.0' && minPrice !== '0.00')
        queryString = queryString + '&minPrice=' + minPrice;

    if (maxPrice.length > 0 && maxPrice !== '0.' && maxPrice !== '0.0' && maxPrice !== '0.00')
        queryString = queryString + '&maxPrice=' + maxPrice;

    if (shopId !== "0") queryString = queryString + '&shopId=' + shopId;

    return queryString;
}