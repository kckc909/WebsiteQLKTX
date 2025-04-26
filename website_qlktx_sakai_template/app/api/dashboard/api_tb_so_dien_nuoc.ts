
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_so_dien_nuoc } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_so_dien_nuoc';

export async function api_tb_so_dien_nuoc_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_so_dien_nuoc_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_so_dien_nuoc_add(so_dien_nuoc: tb_so_dien_nuoc) {
    const {data} = await axios.post(apiUrl, so_dien_nuoc);
    return data; 
}

export async function api_tb_so_dien_nuoc_update(so_dien_nuoc: tb_so_dien_nuoc) {
    const {data} = await axios.put(`${apiUrl}/`, so_dien_nuoc);
    return data; 
}

export async function api_tb_so_dien_nuoc_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}