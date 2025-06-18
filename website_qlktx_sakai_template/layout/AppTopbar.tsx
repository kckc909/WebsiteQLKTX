/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';
import { Menu } from 'primereact/menu';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const profileMenuRef = useRef<Menu>(null);

    const profileMenu = [
        {
            label: 'Thông tin cá nhân',
            items: [
                { label: 'Thông tin tài khoản', icon: 'pi pi-user', command: () => window.location.href = '/dashboard/thong-tin-ca-nhan/thong-tin-tai-khoan'},
                { label: 'Đổi mật khẩu', icon: 'pi pi-lock', command: () => window.location.href = '/dashboard/thong-tin-ca-nhan/doi-mat-khau' },
                { label: 'Trở về trang chủ', icon: 'pi pi-home', command: () => window.location.href = '/' },
                {
                    label: 'Đăng xuất', icon: 'pi pi-sign-out', command: () => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user_info');
                        window.location.href = '/';
                    }
                }
                
            ],
        }
    ];

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">

            <Link href="/dashboard" className="layout-topbar-logo lg:w-3 md:w-1/4">
                <img src={`/custom/logo.png`} height='40px' alt="logo" />
                <span className='nowarp-text'>QUẢN LÝ KÝ TÚC XÁ SINH VIÊN </span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-bell"></i>
                    <span>Notifications</span>
                </button>
                <button
                    type="button"
                    className="p-link layout-topbar-button"
                    onClick={(e) => profileMenuRef.current?.toggle(e)}
                >
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Menu model={profileMenu} popup ref={profileMenuRef} id="profile_menu_popup" className='min-w-[250px] p-2 text-lg'/>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
