/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-home', to: '/dashboard' }
            ]
        },
        {
            label: 'Quản lý ký túc xá',
            items: [
                { label: 'Quản lý phòng', icon: 'pi pi-home', to: '/dashboard/ql-phong' },
                { label: 'Quản lý sinh viên', icon: 'pi pi-users', to: '/dashboard/ql-sinh-vien' },
                { label: 'Quản lý nhân viên', icon: 'pi pi-id-card', to: '/dashboard/ql-nhan-vien' },
                { label: 'Quản lý điện nước', icon: 'pi pi-bolt', to: '/dashboard/ql-dien-nuoc' },
                { label: 'Quản lý đăng ký phòng', icon: 'pi pi-inbox', to: '/dashboard/ql-dang-ky-phong' },
                { label: 'Quản lý hóa đơn', icon: 'pi pi-file', to: '/dashboard/ql-hoa-don', items: [
                    { label: 'Hóa đơn điện nước', icon: 'pi pi-bolt', to: '/dashboard/ql-hoa-don-dien-nuoc' },
                    { label: 'Hóa đơn phòng', icon: 'pi pi-credit-card', to: '/dashboard/ql-hoa-don-phong' }
                ] },
                { label: 'Quản lý bài đăng', icon: 'pi pi-book', to: '/dashboard/ql-bai-dang' },
                { label: 'Quản lý thông báo', icon: 'pi pi-bell', to: '/dashboard/ql-thong-bao' },
                { label: 'Xử lý khiếu nại phản hồi', icon: 'pi pi-comments', to: '/dashboard/xu-ly-khph' },
                { label: 'Quản lý ra vào phòng', icon: 'pi pi-sign-in', to: '/dashboard/ql-ra-vao-phong' },
                { label: 'Quản lý giá phòng', icon: 'pi pi-dollar', to: '/dashboard/ql-gia-phong' },
                { label: 'Quản lý giá điện nước', icon: 'pi pi-money-bill', to: '/dashboard/ql-gia-dien-nuoc' },
                { label: 'Thống kê báo cáo', icon: 'pi pi-chart-bar', to: '/dashboard/thong-ke' },
            ]
        },
        {
            label: 'Thông tin cá nhân',
            items: [
                { label: 'Thông tin tài khoản', icon: 'pi pi-user', to: '/pages/phong' },
                { label: 'Đổi mật khẩu', icon: 'pi pi-lock', to: '/pages/phong' },
                {
                    label: 'Đăng xuất', icon: 'pi pi-home', command: () => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user_info');
                        window.location.href = '/';
                    }
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
