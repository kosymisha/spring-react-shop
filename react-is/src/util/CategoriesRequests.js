import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from "axios";

export function getCategories () {
    return axios.get(API_BASE_URL + '/categories', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function getCategoriesByKeyword (keyword) {
    return axios.get(API_BASE_URL + '/categories?keyword=' + keyword, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}