import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from 'axios';


export function createAdvert (newAdvert) {
    return axios.post(API_BASE_URL + '/adverts', newAdvert, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function getAdvert (advertId) {
    return axios.get(API_BASE_URL + '/adverts/' + advertId, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function setAvailable (advertId) {
    return axios.get(API_BASE_URL + '/adverts/' + advertId + '/available', { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function addToCart (advertId) {
    return axios.get(API_BASE_URL + '/adverts/' + advertId + '/addToCart', { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function deleteAdvert (advertId) {
    return axios.delete(API_BASE_URL + '/adverts/' + advertId, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}
