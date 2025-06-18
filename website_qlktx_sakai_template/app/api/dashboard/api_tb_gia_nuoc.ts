import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_gia_nuoc } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_gia_nuoc';

export async function api_tb_gia_nuoc_getAll() {
    const { data } = await axios.get(apiUrl);
    return data;
}

export async function api_tb_gia_nuoc_getById(id: number) {
    const { data } = await axios.get(`${apiUrl}/${id}`);
    return data;
}

export async function api_tb_gia_nuoc_add(gia_nuoc: Partial<tb_gia_nuoc>) {
    const { data } = await axios.post(apiUrl, gia_nuoc);
    return data;
}

export async function api_tb_gia_nuoc_update(gia_nuoc: Partial<tb_gia_nuoc>) {
    const { data } = await axios.put(`${apiUrl}/`, gia_nuoc);
    return data;
}

export async function api_tb_gia_nuoc_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}

export async function api_tb_gia_nuoc_ApDung() {
    const { data } = await axios.get(`${apiUrl}/ad`);
    return data;
}