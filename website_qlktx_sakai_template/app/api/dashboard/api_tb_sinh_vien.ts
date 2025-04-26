
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_sinh_vien } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_sinh_vien';

export async function api_tb_sinh_vien_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_sinh_vien_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_sinh_vien_add(sinh_vien: tb_sinh_vien) {
    const {data} = await axios.post(apiUrl, sinh_vien);
    return data; 
}

export async function api_tb_sinh_vien_update(sinh_vien: tb_sinh_vien) {
    const {data} = await axios.put(`${apiUrl}/`, sinh_vien);
    return data; 
}

export async function api_tb_sinh_vien_delete(id: number) {
    await axios.delete(`${apiUrl}/${id}`);
}

export async function api_tb_sinh_vien_search(searchText: string) {
    const str = {
        "str" : searchText
    }
    const {data} = await axios.post(`${apiUrl}/search`, str);
    return data; 
}

export async function api_tb_sinh_vien_getByIdPhong(id_tb_phong: string) {
    const {data} = await axios.get(`${apiUrl}/getByIdPhong/${id_tb_phong}`);
    return data;
}