
import axios from 'axios';
import { apiBaseUrl } from '../baseUrl';
import { tb_trong_phong } from '../../../types/custom';

const apiUrl = apiBaseUrl + '/tb_trong_phong';

export async function api_tb_trong_phong_getAll() {
    const {data} = await axios.get(apiUrl);
    return data; 
}

export async function api_tb_trong_phong_getById(id: number) {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data; 
}

export async function api_tb_trong_phong_add(trong_phong: tb_trong_phong) {
    const {data} = await axios.post(apiUrl, trong_phong);
    return data; 
}

export async function api_tb_trong_phong_adds(trong_phongs: tb_trong_phong[]) {
    console.log(trong_phongs);
    const {data} = await axios.post(apiUrl, trong_phongs);
    return data; 
}

export async function api_tb_trong_phong_update(trong_phong: tb_trong_phong) {
    const {data} = await axios.put(`${apiUrl}/`, trong_phong);
    return data; 
}

export async function api_tb_trong_phong_delete(id_phong: number, id_nguoi_dung : number) {
    await axios.delete(`${apiUrl}/${id_phong}/${id_nguoi_dung}`);
}
