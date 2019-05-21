import { request } from './APIUtils';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from "axios";

export function deleteProfile (profileId) {
    return axios.delete(API_BASE_URL + '/profiles/' + profileId, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function updatePassword (profileId, newPassword) {
    return axios.put(API_BASE_URL + '/profiles/' + profileId + '/password', newPassword, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function createProfile (newProfile) {
    return axios.post(API_BASE_URL + '/auth/signup', newProfile, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function getProfile (profileId) {
    return axios.get(API_BASE_URL + "/profiles/" + profileId, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function getProfiles () {
    return axios.get(API_BASE_URL + '/profiles', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function getProfilesByKeyword (keyword) {
    return axios.get(API_BASE_URL + '/profiles?keyword=' + keyword, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function setActive (profileId) {
    return axios.get(API_BASE_URL + '/profiles/' + profileId + '/active', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function setRole (profileId, role) {
    return axios.put(API_BASE_URL + '/profiles/' + profileId + '/role', role,{headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function updateProfile (profileId, newProfile) {
    return axios.put(API_BASE_URL + '/profiles/' + profileId, newProfile, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}
