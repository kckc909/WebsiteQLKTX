import axios from "axios";
import { apiBaseUrl } from "../baseUrl";
import { tb_phong } from "../../../types/custom";
import { LoginRequest } from "../../../types/custom";

const apiUrl = apiBaseUrl + '/auth/login';

export async function api_login(loginRequest: LoginRequest) {
    try {
        const respone = await axios.post(apiUrl, loginRequest);
        if (respone.data.token !== undefined) {
            localStorage.setItem('token', respone.data.token);
            localStorage.setItem('user_info', JSON.stringify(respone.data.info));   
            return true;
        }
        return false;
    }
    catch (error) {
        console.error("Lỗi đăng nhập:", error);
        return false;
    }
}