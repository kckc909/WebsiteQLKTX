
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_bai_dang } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_bai_dang';

export async function api_tb_bai_dang_getAll() {
    const { data } = await axios.get(apiUrl);
    return data;
}

export async function api_tb_bai_dang_getById(id: number) {
    const { data } = await axios.get(`${apiUrl}/${id}`);
    return data;
}

export async function api_tb_bai_dang_add(bai_dang: Partial<tb_bai_dang>) {
    const { data } = await axios.post(apiUrl, bai_dang);
    return data;
}

export async function api_tb_bai_dang_update(bai_dang: Partial<tb_bai_dang>) {
    const { data } = await axios.put(`${apiUrl}/`, bai_dang);
    return data;
}

export async function api_tb_bai_dang_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}