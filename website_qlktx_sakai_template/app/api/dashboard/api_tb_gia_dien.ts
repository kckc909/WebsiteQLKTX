import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_gia_dien } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_gia_dien';

export async function api_tb_gia_dien_getAll() {
    const { data } = await axios.get(apiUrl);
    return data;
}

export async function api_tb_gia_dien_getById(id: number) {
    const { data } = await axios.get(`${apiUrl}/${id}`);
    return data;
}

export async function api_tb_gia_dien_add(gia_dien: Partial<tb_gia_dien>) {
    const { data } = await axios.post(apiUrl, gia_dien);
    return data;
}

export async function api_tb_gia_dien_update(gia_dien: Partial<tb_gia_dien>) {
    const { data } = await axios.put(`${apiUrl}/`, gia_dien);
    return data;
}

export async function api_tb_gia_dien_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}

export async function api_tb_gia_dien_ApDung() {
    const { data } = await axios.get(`${apiUrl}/ad`);
    return data;
}