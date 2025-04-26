
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_gia_phong } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_gia_phong';

export async function api_tb_gia_phong_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_gia_phong_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_gia_phong_add(gia_phong: tb_gia_phong) {
    const {data} = await axios.post(apiUrl, gia_phong);
    return data; 
}

export async function api_tb_gia_phong_update(gia_phong: tb_gia_phong) {
    const {data} = await axios.put(`${apiUrl}/`, gia_phong);
    return data; 
}

export async function api_tb_gia_phong_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}