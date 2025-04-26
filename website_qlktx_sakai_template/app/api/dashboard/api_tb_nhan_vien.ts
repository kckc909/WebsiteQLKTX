
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_nhan_vien } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_nhan_vien';

export async function api_tb_nhan_vien_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_nhan_vien_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_nhan_vien_add(nhan_vien: tb_nhan_vien) {
    const {data} = await axios.post(apiUrl, nhan_vien);
    return data; 
}

export async function api_tb_nhan_vien_update(nhan_vien: tb_nhan_vien) {
    const {data} = await axios.put(`${apiUrl}/`, nhan_vien);
    return data; 
}

export async function api_tb_nhan_vien_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}