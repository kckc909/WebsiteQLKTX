
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_nguoi_dung } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_nguoi_dung';

export async function api_tb_nguoi_dung_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_nguoi_dung_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_nguoi_dung_add(nguoi_dung: tb_nguoi_dung) {
    const {data} = await axios.post(apiUrl, nguoi_dung);
    return data; 
}

export async function api_tb_nguoi_dung_update(nguoi_dung: tb_nguoi_dung) {
    const {data} = await axios.put(`${apiUrl}/`, nguoi_dung);
    return data; 
}

export async function api_tb_nguoi_dung_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}