'use client'

import { Menubar } from "primereact/menubar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "primereact/avatar";
import { tb_nguoi_dung } from "@custom";

export default function Header() {
    // declare
    const noAccMenu = {
        label: "Đăng nhập",
        icon: "pi pi-sign-in",
        command: () => router.push("/auth/login"),
    };

    const svAccMenu = {
        label: "Tài khoản",
        icon: "pi pi-user",
        items: [
            { label: "Thông tin cá nhân", icon: "pi pi-id-card", command: () => router.push("/thong-tin-ca-nhan") },
            { label: "Đổi mật khẩu", icon: "pi pi-key", command: () => router.push("/doi-mat-khau") },
            { label: "Đăng xuất", icon: "pi pi-sign-out", command: () => handleDangXuat() },
        ],
    };

    const nvAccMenu = {
        label: "Tài khoản",
        icon: "pi pi-user",
        items: [
            { label: "Thông tin cá nhân", icon: "pi pi-id-card", command: () => router.push("/thong-tin-ca-nhan") },
            { label: "Đổi mật khẩu", icon: "pi pi-key", command: () => router.push("/doi-mat-khau") },
            { label: "Truy cập trang quản trị", icon: "pi pi-id-card", command: () => router.push("/dashboard") },
            { label: "Đăng xuất", icon: "pi pi-sign-out", command: () => handleDangXuat() },
        ],
    };

    const items = [
        {
            label: "Trang chủ",
            icon: "pi pi-home",
            command: () => router.push("/"),
        },
        {
            label: "Giới thiệu",
            icon: "pi pi-info-circle",
            items: [
                { label: "Giới thiệu chung", command: () => router.push("/gioi-thieu-chung") },
                { label: "Cơ cấu tổ chức", command: () => router.push("/co-cau-to-chuc") },
            ],
        },
        {
            label: "Tin tức & Sự kiện",
            icon: "pi pi-calendar",
            command: () => router.push("/tin-tuc-su-kien"),
        },
        {
            label: "Sinh viên nội trú",
            icon: "pi pi-users",
            items: [
                { label: "Biểu mẫu", command: () => router.push("/sinh-vien-noi-tru/bieu-mau") },
                { label: "Hướng dẫn", command: () => router.push("/sinh-vien-noi-tru/huong-dan") },
                { label: "Đăng ký phòng ở", command: () => router.push("/sinh-vien-noi-tru/dang-ky-phong-o") },
                { label: "Quy chế - Quy định", command: () => router.push("/sinh-vien-noi-tru/quy-che-quy-dinh") },
            ],
        },
        {
            label: "Thông báo",
            icon: "pi pi-bell",
            command: () => router.push("/thong-bao"),
        },
        {
            label: "Hỗ trợ sinh viên",
            icon: "pi pi-question-circle",
            command: () => router.push("/ho-tro-sinh-vien"),
        },
        {
            label: "Liên hệ",
            icon: "pi pi-envelope",
            command: () => router.push("/lien-he"),
        },
    ];

    // state effect
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<tb_nguoi_dung | null>(null);
    const [accMenu, setAccMenu] = useState<any>(noAccMenu);
    const router = useRouter();

    useEffect(() => {
        const _user = localStorage.getItem('user_info');
        if (_user) {
            const userInfo = JSON.parse(_user);
            setIsLoggedIn(true);
            setUser(userInfo);
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            setAccMenu(noAccMenu);
            return;
        }

        if (user.quyen == 'ad' || user.quyen == 'nv') {
            setAccMenu(nvAccMenu);
        } else if (user.quyen == 'sv') {
            setAccMenu(svAccMenu);
        } else {
            setAccMenu(noAccMenu);
        }
    }, [user]);

    // func 
    const handleDangXuat = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user_info');
        setUser(null);
        router.push('/auth/login');
    }


    return (
        <header>
            <div className="flex justify-between items-center bg-[url(/custom/bg_header.png)] bg-cover h-32 px-4">
                <div className="flex items-center">
                    <img src="/custom/logo.png" alt="Logo" className="h-20 mr-4" />
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-red-600">
                            KÝ TÚC XÁ ĐẠI HỌC SƯ PHẠM KỸ THUẬT HƯNG YÊN
                        </h1>
                        <p className="text-lg md:text-2xl text-red-400">
                            HUNG YEN UNIVERSITY OF TECHNOLOGY AND EDUCATION DORMITORY
                        </p>
                    </div>
                </div>
                {/* {isLoggedIn && (
                    <Avatar
                        icon="pi pi-user"
                        size="large"
                        shape="circle"
                        className="mr-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => router.push("/thong-tin-ca-nhan")}
                    />
                )} */}
            </div>

            <Menubar
                model={[...items, accMenu]}
                className="bg-blue-600 border-none rounded-none text-white p-0 pl-8"
                pt={{
                    action: {
                        className: "text-white bg-blue-600 hover:bg-blue-500 transition-all",
                    },
                    label: {
                        className: "text-white p-1",
                    },
                    icon: {
                        className: "text-white",
                    },
                    submenuIcon: {
                        className: "text-white",
                    },
                    menu: {
                        className: "p-0",
                    }
                }}
            />
        </header>
    );
}
