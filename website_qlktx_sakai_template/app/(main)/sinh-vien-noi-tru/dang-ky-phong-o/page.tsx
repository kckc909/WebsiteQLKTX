'use client'

import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { ReactElement, useEffect, useState } from "react";
import ChonPhong from "@components/ChonPhong";
import { tb_dang_ky_phong, tb_phong } from "@custom";
import { Checkbox } from "primereact/checkbox";

const PageDangKyPhongO = () => {
    // state 
    const [dsPhong, setDsPhong] = useState<tb_phong[]>([]); // danh sách phòng
    const [dsDKP, setDsDKP] = useState<tb_dang_ky_phong[]>([]); // danh sách đăng ký phòng
    const [sltPhong, setSltPhong] = useState<number | null>(); // danh sách phòng đã chọn

    const [loc, setLoc] = useState({
        day_nha: '',
        tang: 1,
        gioi_tinh_phong: '',
        kich_thuoc_toi_da: 10,
        hien_thi_phong_day: false,
    });

    const isFilterValid = loc.day_nha && loc.tang && loc.gioi_tinh_phong !== '' && loc.kich_thuoc_toi_da;
    const dsDayNha = Array.from(new Set(dsPhong.map(p => p.day_nha)));
    const dsTang = Array.from(new Set(dsPhong.map(p => p.tang))).sort((a, b) => (a ?? 0) - (b ?? 0));
    const dsKichThuoc = Array.from(new Set(dsPhong.map(p => p.kich_thuoc_toi_da))).sort((a, b) => (a ?? 0) - (b ?? 0));


    // effect
    useEffect((

    ) => { }, [dsPhong, dsDKP]);

    const dsLoc = dsPhong.filter((p: tb_phong) => {
        const tongNguoi = p.so_luong + dsDKP.filter(dkp => dkp.id_tb_phong === p.id_tb_phong).length;
        if (loc.day_nha && p.day_nha !== loc.day_nha) return false;
        if (loc.tang && p.tang !== loc.tang) return false;
        if (loc.gioi_tinh_phong !== '' && p.gioi_tinh_phong !== loc.gioi_tinh_phong) return false;
        if (loc.kich_thuoc_toi_da && p.kich_thuoc_toi_da !== loc.kich_thuoc_toi_da) return false;
        if (!loc.hien_thi_phong_day && tongNguoi >= p.kich_thuoc_toi_da) return false;
        return true;
    });
    //  func
    function handleChonPhong(phong: Partial<tb_phong>): void {

    }

    // component
    const c_ThanhTimKiemPhong = (
        <>
            {/* cơ sở */}
            <div className="col-12 grid formgrid flex mb-1">
                {/* tòa */}
                <div className="col-12 md:col-6 lg:col-3">
                    <label>Dãy nhà</label>
                    <Dropdown
                        value={loc.day_nha}
                        options={dsDayNha.map(dn => ({ label: dn, value: dn })) || []}
                        onChange={e => setLoc({ ...loc, day_nha: e.value })}
                        placeholder="Chọn dãy nhà"
                        className="w-full"
                    />
                </div>
                {/* Tầng */}
                <div className="col-12 md:col-6 lg:col-3">
                    <label>Tầng</label>
                    <Dropdown
                        value={loc.tang}
                        options={dsTang.map(t => ({ label: `Tầng ${t}`, value: t }))}
                        onChange={e => setLoc({ ...loc, tang: e.value })}
                        placeholder="Chọn tầng"
                        className="w-full"
                    />
                </div>
                {/* gioi tinh */}
                <div className="col-12 md:col-6 lg:col-3">
                    <label>Giới tính</label>
                    <Dropdown
                        value={loc.gioi_tinh_phong}
                        options={[
                            { label: 'Nam', value: 1 },
                            { label: 'Nữ', value: 0 },
                            { label: 'Chung', value: '' },
                        ]}
                        onChange={e => setLoc({ ...loc, gioi_tinh_phong: e.value })}
                        placeholder="Chọn giới tính"
                        className="w-full"
                    />
                </div>
                {/* Loai phòng */}
                <div className="col-12 md:col-6 lg:col-3">
                    <label>Sức chứa</label>
                    <Dropdown
                        value={loc.kich_thuoc_toi_da}
                        options={dsKichThuoc.map(size => ({ label: `${size} người`, value: size }))}
                        onChange={e => setLoc({ ...loc, kich_thuoc_toi_da: e.value })}
                        placeholder="Chọn sức chứa"
                        className="w-full"
                    />
                </div>
                {/* Thanh tim kiếm => xem xét thêm vào */}
            </div>
        </>
    )

    const c_HuongDan = (
        <>
            <div className="flex">
                {/* Thông tin hướng dẫn */}
                {/* Khoản thu & mức thu */}
            </div>
        </>
    )

    const c_Phong = (
        <>
            {/* Tên phòng */}
            {/* Người trong phòng => thể hiện dưới dạng icon, mỗi icon tương ứng với 1 người */}
        </>
    )


    const c_DanhSachPhong = (
        <>
            {/* Chú thích : icon người màu xanh lá = vị trí còn trống, màu đỏ = có người, màu xanh nước biển = có người đang đăng ký vào */}
            <div className="flex gap-2 ml-2 ">
                <div className="col-sm-2" style={{ color: "red" }}><i className="pi pi-user text-xl red bigger-120" aria-hidden="true"></i><b> Chỗ đã có sinh viên đăng ký</b></div>
                <div className="col-sm-2" style={{ color: "#0610ce" }}><i className="pi pi-user text-xl bigger-120" aria-hidden="true" style={{ color: "#0610ce" }}></i><b> Chỗ đang có sinh viên đăng ký</b></div>
                <div className="col-sm-2" style={{ color: "#00f910" }}><i className="pi pi-user text-xl bigger-120" aria-hidden="true" style={{ color: "#00f910" }}></i><b> Chỗ còn trống</b></div>
            </div>
            <div className="col-12 grid md:grid-cols-3 gap-2 flex-2">
                {!isFilterValid && dsLoc.map((phong: tb_phong, idx) => {
                    const dsDangKy = dsDKP.filter(dkp => dkp.id_tb_phong === phong.id_tb_phong);
                    const soLuongHienTai = phong.so_luong;
                    const soLuongDangKy = dsDangKy.length;
                    const tongNguoi = soLuongHienTai + soLuongDangKy;

                    const bg = (phong.id_tb_phong === sltPhong) ? 'bg-yellow-100' : 'bg-white'

                    return (
                        <div
                            key={idx}
                            className={"p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-all " + bg}
                            onClick={() => handleChonPhong?.(phong)}
                        >
                            <h3 className="text-lg font-bold mb-2">{phong.ten_phong}</h3>
                            <div className="flex gap-1 flex-wrap">
                                {Array.from({ length: phong.kich_thuoc_toi_da }).map((_, i) => {
                                    let mau = 'text-green-500'; // còn trống

                                    if (i < soLuongHienTai) {
                                        mau = 'text-red-500'; // đang ở
                                    } else if (i < soLuongHienTai + soLuongDangKy) {
                                        mau = 'text-blue-500'; // đang đăng ký (trong giới hạn)
                                    }

                                    return <i key={i} className={`pi pi-user ${mau} text-xl`} />;
                                })}

                                {/* vượt sức chứa */}
                                {tongNguoi > phong.kich_thuoc_toi_da &&
                                    Array.from({ length: tongNguoi - phong.kich_thuoc_toi_da }).map((_, i) => (
                                        <i key={`over-${i}`} className="pi pi-user text-purple-500 text-xl" />
                                    ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )

    return (
        <>
            {/* <div className="page-dang-ky-phong">
                <h1>Đăng Ký Phòng</h1>
                <ChonPhong
                    dsPhong={dsPhong}
                    dsDKP={dsDKP}
                    onChonPhong={handleChonPhong}
                    sltPhong={null}
                />
            </div> */}
            {c_HuongDan}
            {c_ThanhTimKiemPhong}
            {c_DanhSachPhong}
            
        </>
    )
};

export default PageDangKyPhongO;