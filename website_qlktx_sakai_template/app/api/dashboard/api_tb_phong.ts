
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_phong } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_phong';

export async function api_tb_phong_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_phong_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_phong_add(phong: tb_phong) {
    const {data} = await axios.post(apiUrl, phong);
    return data; 
}

export async function api_tb_phong_update(phong: tb_phong) {
    const {data} = await axios.put(`${apiUrl}/`, phong);
    return data; 
}

export async function api_tb_phong_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}