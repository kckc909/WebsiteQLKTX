
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_hoa_don_phong } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_hoa_don_phong';

export async function api_tb_hoa_don_phong_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_hoa_don_phong_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_hoa_don_phong_add(hoa_don_phong: tb_hoa_don_phong) {
    const {data} = await axios.post(apiUrl, hoa_don_phong);
    return data; 
}

export async function api_tb_hoa_don_phong_update(hoa_don_phong: tb_hoa_don_phong) {
    const {data} = await axios.put(`${apiUrl}/`, hoa_don_phong);
    return data; 
}

export async function api_tb_hoa_don_phong_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}