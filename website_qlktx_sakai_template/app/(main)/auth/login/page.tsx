'use client'

import { useState } from "react";
import { LoginRequest } from "../../../../types/custom";
import { api_login } from "../../../api/main/login";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useRouter } from "next/navigation";

export default function Login() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [check, setCheck] = useState(false);
    const [errUsernameClassName, setErUsernamwClassName] = useState('');
    const [errPaswordClassName, setErrPaswordClassName] = useState('');

    const router = useRouter();

    const DangNhap = () => {
        var loginRequest: LoginRequest = {
            username: username,
            password: password
        }
        console.log(loginRequest)
        api_login(loginRequest).then((status: boolean) => {
            if (status) {
                alert('Đăng nhập thành công');
                window.location.href = '/';
            } else {
                handleLogin()
            }
        })
    }

    const KiemTraDinhDang = () => {
        setCheck(true);
        if (username === '') {

            return false
        }
        if (password === '') {

            return false
        }
        return true
    }

    const [error, setError] = useState("");

    const handleLogin = () => {
        setError("Tài khoản hoặc mật khẩu không đúng!");
    };

    return (
        <>
            <div className="flex flex-col xl:min-h-screen bg-gray-100">
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md mx-auto my-20">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Đăng nhập</h1>

                    <div>
                        <div className="mb-2">
                            <label htmlFor="username" className="block mb-2">Tên tài khoản</label>
                            <InputText
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={"w-full p-inputtext-lg " + errUsernameClassName}
                                placeholder="Tên tài khoản"
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="block mb-2">Mật khẩu</label>
                            <InputText
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={"w-full p-inputtext-lg " + errPaswordClassName}
                                placeholder="Mật khẩu"
                            />
                        </div>
                    </div>
                    <div>
                        {/* Chỗ này code hiển thị thông tin sai tài khoản hoặc mật khẩu */}
                        {error && <Message severity="error" text={error} />}
                    </div>
                    <div className="text-center mt-3">
                        <button
                            className="w-full py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
                            onClick={() => DangNhap()}
                        >
                            Đăng nhập
                        </button>
                    </div>

                </div>
            </div>

        </>
    )
} 