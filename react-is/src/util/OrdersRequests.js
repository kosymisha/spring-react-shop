import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";

export function getNonPaidOrders () {
    return axios.get(API_BASE_URL + '/orders?isPaid=false', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function getPaidOrders () {
    return axios.get(API_BASE_URL + '/orders?isPaid=true', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function getPaidOrdersByKeyword (keyword) {
    return axios.get(API_BASE_URL + '/orders?isPaid=true&keyword=' + keyword, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function deleteOrder (orderId) {
    return axios.delete(API_BASE_URL + '/orders/' + orderId, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function confirmOrder (orderId, bankCard) {
    return axios.put(API_BASE_URL + '/orders/' + orderId, bankCard, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}

export function getSales (shopId, keyword) {
    return axios.get(API_BASE_URL + '/sales?shopId=' + shopId + '&keyword=' + keyword, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }})
}
