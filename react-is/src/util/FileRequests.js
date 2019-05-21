import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from "axios";

export function uploadFileShop (shopId, file) {
    return axios.post(API_BASE_URL + '/shops/' + shopId + '/uploadFile', file, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function deleteFileShop (shopId) {
    return axios.delete(API_BASE_URL + '/shops/' + shopId + '/uploadFile', { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function uploadFileProfile (profileId, file) {
    return axios.post(API_BASE_URL + '/profiles/' + profileId + '/uploadFile', file, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function deleteFileProfile (profileId) {
    return axios.delete(API_BASE_URL + '/profiles/' + profileId + '/uploadFile', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function uploadFileAdvert (advertId, file) {
    return axios.post(API_BASE_URL + '/adverts/' + advertId + '/photo', file, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}