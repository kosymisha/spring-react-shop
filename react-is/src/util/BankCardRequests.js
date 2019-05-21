import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from "axios";

export function getBankCards (userId) {
    return axios.get(API_BASE_URL + '/profiles/' + userId + '/bankCards', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }});
}

export function getDefaultBankCard (userId) {
    return axios.get(API_BASE_URL + '/profiles/' + userId + '/bankCards?default=true', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }});
}

export function getNonDefaultBankCards (userId) {
    return axios.get(API_BASE_URL + '/profiles/' + userId + '/bankCards?default=false', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }});
}

export function createBankCard (userId, newCard) {
    return axios.post(API_BASE_URL + '/profiles/' + userId + '/bankCards', newCard, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }});
}

export function deleteBankCard (userId, cardId) {
    return axios.delete(API_BASE_URL + '/profiles/' + userId + '/bankCards/' + cardId, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }});
}

export function updateBankCard (userId, cardId) {
    return axios.put(API_BASE_URL + '/profiles/' + userId + '/bankCards/' + cardId, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }});
}