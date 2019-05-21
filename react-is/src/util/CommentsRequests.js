import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import { request } from './APIUtils';
import axios from 'axios';

export function createShopComment (shopId, newComment) {
    return axios.post(API_BASE_URL + '/shops/' + shopId + '/comments', newComment, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function getShopComments (shopId) {
    return axios.get(API_BASE_URL + '/shops/' + shopId + '/comments', { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function getAdvertComments (advertId) {
    return axios.get(API_BASE_URL + '/adverts/' + advertId + '/comments', { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function createAdvertComment (advertId, newComment) {
    return axios.post(API_BASE_URL + '/adverts/' + advertId + '/comments', newComment, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function deleteComment (commentId) {
    return axios.delete(API_BASE_URL + '/comments/' + commentId, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}