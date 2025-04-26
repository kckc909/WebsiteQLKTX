
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_dang_ky_phong } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_dang_ky_phong';
export async function api_tb_dang_ky_phong_getAll() {
    const { data } = await axios.get(apiUrl);
    return data;
}
export async function api_tb_dang_ky_phong_getByTrangThai(trangthai : string) {
    const { data } = await axios.get(`${apiUrl}/status/` + trangthai);
    return data;
}
export async function api_tb_dang_ky_phong_getById(id: number) {
    const { data } = await axios.get(`${apiUrl}/${id}`);
    return data;
}
export async function api_tb_dang_ky_phong_add(dang_ky_phong: tb_dang_ky_phong) {
    const { data } = await axios.post(apiUrl, dang_ky_phong);
    return data;
}
export async function api_tb_dang_ky_phong_update(dang_ky_phong: tb_dang_ky_phong) {
    const { data } = await axios.put(`${apiUrl}/`, dang_ky_phong);
    return data;
}
export async function api_tb_dang_ky_phong_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}
export async function api_tb_dang_ky_phong_deleteMany(ids: number[]) {
    await axios.post(`${apiUrl}/delete-many`, { ids });
}
