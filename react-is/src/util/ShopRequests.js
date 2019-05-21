import { request } from './APIUtils';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from 'axios';

export function getShopList () {
    return request({
        url: API_BASE_URL + "/shops",
        method: 'GET'
    });
}

export function getShops () {
    return axios.get(API_BASE_URL + '/shops');
}

export function getShop (shopId) {
    return axios.get(API_BASE_URL + '/shops/' + shopId);
}

export function getShopsByKeyword (keyword) {
    return axios.get(API_BASE_URL + '/shops?keyword=' + keyword);
}

export function getShopsByOwner (userId) {
    return axios.get(API_BASE_URL + '/shops?userId=' + userId);
}

export function createShop (newShop) {
    return axios.post(API_BASE_URL + '/shops', newShop, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function updateShop (shopId, shop) {
    return axios.put(API_BASE_URL + "/shops/" + shopId, shop, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function deleteShop (shopId) {
    let options = {
        url: API_BASE_URL + '/shops/' + shopId,
        method: 'DELETE'
    };
    let headers = new Headers({
        'Content-Type': 'application/json',
    });
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options);
}