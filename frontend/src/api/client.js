import axios from 'axios';
import { handleResponse, handleError } from './response';

const BASE_URL = 'http://localhost:3000/contacts';

const get = (resource, params) => {
    return axios
        .get(`${BASE_URL}${resource}`, {params})
        .then(handleResponse)
        .catch(handleError);
};

const post = (resource, data) => {
    return axios
        .post(`${BASE_URL}${resource}`, data)
        .then(handleResponse)
        .catch(handleError);
};

const patch = (resource, data) => {
    return axios
        .patch(`${BASE_URL}${resource}`, data)
        .then(handleResponse)
        .catch(handleError);
};

const deleteRequest = (resource) => {
    return axios
        .delete(`${BASE_URL}${resource}`)
        .then(handleResponse)
        .catch(handleError);
};

export const client = {
    get,
    post,
    patch,
    deleteRequest
};