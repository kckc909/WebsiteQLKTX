
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_hoa_don_dien_nuoc } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_hoa_don_dien_nuoc';

export async function api_tb_hoa_don_dien_nuoc_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_hoa_don_dien_nuoc_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_hoa_don_dien_nuoc_add(hoa_don_dien_nuoc: tb_hoa_don_dien_nuoc) {
    const {data} = await axios.post(apiUrl, hoa_don_dien_nuoc);
    return data; 
}

export async function api_tb_hoa_don_dien_nuoc_update(hoa_don_dien_nuoc: tb_hoa_don_dien_nuoc) {
    const {data} = await axios.put(`${apiUrl}/`, hoa_don_dien_nuoc);
    return data; 
}

export async function api_tb_hoa_don_dien_nuoc_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}