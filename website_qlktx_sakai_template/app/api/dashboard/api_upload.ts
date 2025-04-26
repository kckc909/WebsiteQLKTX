import axios from "axios";
import { apiBaseUrl } from "../baseUrl";

// API upload avatar
const url = apiBaseUrl + "/uploads/avatar";

export async function post_avatar(file: File) {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await axios.post(url, formData);
    return response;
}

export async function put_avatar(oldAvatarName: string, newwAvatar: File) {
    const formData = new FormData();

    formData.append("oldAvatar", oldAvatarName);
    formData.append("newAvatar", newwAvatar);
    const response = await axios.put(url, formData);
    return response;
}