'use client'

import { Menubar } from "primereact/menubar";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "primereact/avatar";
import { tb_nguoi_dung, tb_nhan_vien, tb_sinh_vien } from "@custom";
import { api_tb_nhan_vien_getById } from "app/api/dashboard/api_tb_nhan_vien";
import { api_tb_sinh_vien_getById } from "app/api/dashboard/api_tb_sinh_vien";
import { InputText } from "primereact/inputtext";

export default function Header() {
    // TypeScript types
    type User = {
        user: tb_nguoi_dung,
        thong_tin_ca_nhan: tb_sinh_vien | tb_nhan_vien | null;
    } | null;

    const router = useRouter();

    // Menu cấu hình
    const noAccMenu = {
        label: "Đăng nhập",
        icon: "pi pi-sign-in",
        command: () => router.push("/auth/login"),
    };

    const svAccMenu = {
        label: "Tài khoản",
        icon: "pi pi-user",
        command: () => { }, // Dummy command to satisfy type
        items: [
            { label: "Thông tin cá nhân", icon: "pi pi-id-card", command: () => router.push("/thong-tin-ca-nhan") },
            { label: "Đổi mật khẩu", icon: "pi pi-key", command: () => router.push("/doi-mat-khau") },
            { label: "Đăng xuất", icon: "pi pi-sign-out", command: () => handleDangXuat() },
        ],
    };

    const nvAccMenu = {
        label: "Tài khoản",
        icon: "pi pi-user",
        command: () => { }, // Dummy command to satisfy type
        items: [
            { label: "Thông tin cá nhân", icon: "pi pi-id-card", command: () => router.push("/thong-tin-ca-nhan") },
            { label: "Đổi mật khẩu", icon: "pi pi-key", command: () => router.push("/doi-mat-khau") },
            { label: "Truy cập trang quản trị", icon: "pi pi-id-card", command: () => router.push("/dashboard") },
            { label: "Đăng xuất", icon: "pi pi-sign-out", command: () => handleDangXuat() },
        ],
    };

    const items = [
        { label: "Trang chủ", icon: "pi pi-home", command: () => router.push("/") },
        {
            label: "Giới thiệu", icon: "pi pi-info-circle",
            items: [
                { label: "Giới thiệu chung", command: () => router.push("/gioi-thieu-chung") },
                { label: "Cơ cấu tổ chức", command: () => router.push("/co-cau-to-chuc") },
            ],
        },
        { label: "Tin tức & Sự kiện", icon: "pi pi-calendar", command: () => router.push("/tin-tuc-su-kien") },
        {
            label: "Sinh viên nội trú", icon: "pi pi-users",
            items: [
                { label: "Biểu mẫu", command: () => router.push("/sinh-vien-noi-tru/bieu-mau") },
                { label: "Hướng dẫn", command: () => router.push("/sinh-vien-noi-tru/huong-dan") },
                { label: "Đăng ký phòng ở", command: () => router.push("/sinh-vien-noi-tru/dang-ky-phong-o") },
                { label: "Quy chế - Quy định", command: () => router.push("/sinh-vien-noi-tru/quy-che-quy-dinh") },
            ],
        },
        { label: "Thông báo", icon: "pi pi-bell", command: () => router.push("/thong-bao") },
        { label: "Hỗ trợ sinh viên", icon: "pi pi-question-circle", command: () => router.push("/ho-tro-sinh-vien") },
        { label: "Liên hệ", icon: "pi pi-envelope", command: () => router.push("/lien-he") },
    ];

    // State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User>(null);
    const [accMenu, setAccMenu] = useState<any>(noAccMenu);
    const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Lấy user, thông tin cá nhân và menu phù hợp chỉ 1 lần khi mount
    useEffect(() => {
        const fetchAndSetUserInfo = async () => {
            const _user = localStorage.getItem('user_info');

            if (_user) {
                const parsedUser = JSON.parse(_user) as tb_nguoi_dung;
                let thong_tin_ca_nhan = null;
                let currentAccMenu = noAccMenu;

                if (parsedUser.quyen === 'ad' || parsedUser.quyen === 'nv') {
                    thong_tin_ca_nhan = await api_tb_nhan_vien_getById(parsedUser.id_tb_nguoi_dung);
                    currentAccMenu = nvAccMenu;
                } else if (parsedUser.quyen === 'sv') {
                    thong_tin_ca_nhan = await api_tb_sinh_vien_getById(parsedUser.id_tb_nguoi_dung);
                    currentAccMenu = svAccMenu;
                }

                setIsLoggedIn(true);
                setUser({
                    user: parsedUser,
                    thong_tin_ca_nhan: thong_tin_ca_nhan
                });
                setAccMenu(currentAccMenu);

            } else {
                setIsLoggedIn(false);
                setUser(null);
                setAccMenu(noAccMenu);
            }
        };

        fetchAndSetUserInfo();
    }, []);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuIdx(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // Đăng xuất
    function handleDangXuat() {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user_info');
        setUser(null);
        setAccMenu(noAccMenu);
        router.push('/auth/login');
    }

    // Lấy tên hiển thị
    const displayName = user?.thong_tin_ca_nhan?.ho_ten || "Unknown";
    const avatarLabel = displayName.charAt(0).toUpperCase();

    return (
        <header className="shadow bg-white w-full" ref={menuRef}>
            {/* Topbar */}
            <div className="w-full bg-gray-100 py-2 px-4 flex justify-content-center items-center text-sm gap-20">
                <div className="flex gap-6 items-center">
                    <span className="text-red-500 font-semibold">Tổng đài: 0934206983</span>
                </div>
                <button className="hover:text-red-600 transition" onClick={() => router.push('/sinh-vien-noi-tru/dang-ky-phong-o')}>
                    Đăng ký phòng ở
                </button>
                <button className="hover:text-red-600 transition" onClick={() => router.push('/tham-quan-ky-tuc-xa')}>
                    Tham quan trực tuyến ký túc xá
                </button>
                <InputText placeholder="Tiếp nhận sinh viên" />
            </div>
            {/* Menubar */}
            <div className="w-full flex items-center justify-between px-20 py-2 bg-green-500">
                <div className="flex items-center gap-3">
                    <img src="/custom/logo.png" alt="Logo" className="h-10 w-10" />
                    <h1 className="ml-2 text-xl font-bold text-white min-w-[100px]">Ký túc xá</h1>
                </div>
                <div className="flex">
                    <div className="flex items-center">
                        {(isLoggedIn ? items.concat(accMenu) : items.concat(noAccMenu)).map((item, idx) => (
                            <div key={idx} className="relative">
                                {/* Nếu có submenu */}
                                {item.items ? (
                                    <button
                                        type="button"
                                        className="cursor-pointer text-white px-3 py-2 rounded hover:bg-green-600 hover:text-white transition font-medium flex items-center"
                                        onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                                    >
                                        {item.icon && <span className={item.icon + " mr-2"}></span>}
                                        {item.label}
                                    </button>
                                ) : (
                                    <button
                                        onClick={item.command}
                                        className="text-white px-3 py-2 rounded hover:bg-green-600 hover:text-white transition font-medium flex items-center"
                                    >
                                        {item.icon && <span className={item.icon + " mr-2"}></span>}
                                        {item.label}
                                    </button>
                                )}

                                {/* Submenu (nếu có) */}
                                {item.items && openMenuIdx === idx && (
                                    <div className="absolute left-0 top-full mt-2 bg-white rounded shadow-lg min-w-[180px] z-50">
                                        {item.items.map((sub, subIdx) => (
                                            <button
                                                key={subIdx}
                                                onClick={
                                                    () => {
                                                        setOpenMenuIdx(null);
                                                        sub.command();
                                                    }
                                                }
                                                className="block w-full text-left px-4 py-2 text-green-700 hover:bg-green-600 hover:text-white transition cursor-pointer"
                                            >
                                                {sub.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
