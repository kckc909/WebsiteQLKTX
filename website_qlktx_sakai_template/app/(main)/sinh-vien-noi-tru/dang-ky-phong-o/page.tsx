'use client'

import { Dropdown } from "primereact/dropdown";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { tb_dang_ky_phong, tb_phong } from "@custom";
import { Card } from "primereact/card";
import FeatureTitle from "@components/FeatureTitle";
import { api_tb_phong_getAll } from "app/api/dashboard/api_tb_phong";
import { api_tb_dang_ky_phong_getAll } from "app/api/dashboard/api_tb_dang_ky_phong";
import ChonPhong from "@components/ChonPhong";
import C_HuongDan from "./C_HuongDan";
import C_ThanhTimKiemPhong from "./C_ThanhTimKiemPhong";
import C_DanhSachPhong from "./C_DanhSachPhong";
import C_ThongTinPhong from "./C_ThongTinPhong";
import C_ThongTinSinhVien from "./C_ThongTinSinhVien";
import { Toast } from "primereact/toast";

const PageDangKyPhongO = () => {
    // state 
    const toast = useRef<Toast>(null);
    const [dsPhong, setDsPhong] = useState<tb_phong[]>([]);
    const [dsDKP, setDsDKP] = useState<tb_dang_ky_phong[]>([]);
    const [sltPhong, setSltPhong] = useState<number | null>();
    const [hienThiHD, setHienThiHD] = useState(true);
    const [hienThiTTCN, setHienThiTTCN] = useState(false);

    const [loc, setLoc] = useState({
        co_so: 0,
        day_nha: '',
        tang: -1,
        gioi_tinh_phong: '',
        kich_thuoc_toi_da: -1,
        hien_thi_phong_day: false,
    });

    // effect
    useEffect(() => {
        const fetchData = async () => {
            const dsPhongRes = await api_tb_phong_getAll();
            setDsPhong(dsPhongRes);
            const dsDKPRes = await api_tb_dang_ky_phong_getAll();
            setDsDKP(dsDKPRes);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (
            loc.co_so !== 0 &&
            loc.day_nha !== '' &&
            loc.tang !== -1 &&
            loc.gioi_tinh_phong !== '' &&
            loc.kich_thuoc_toi_da !== -1
        ) {
            setHienThiHD(false);
        }
    }, [loc.co_so, loc.day_nha, loc.tang, loc.gioi_tinh_phong, loc.kich_thuoc_toi_da]);

    useEffect(() => {
        if (sltPhong) {

        }
    }, [sltPhong])

    const dsLoc = dsPhong.filter((p: tb_phong) => {
        const tongNguoi = p.so_luong + dsDKP.filter(dkp => dkp.id_tb_phong === p.id_tb_phong).length;
        if (loc.co_so !== 0 && p.co_so !== loc.co_so) return false;
        if (loc.day_nha && p.day_nha !== loc.day_nha) return false;
        if (loc.tang && p.tang !== loc.tang) return false;
        if (
            loc.gioi_tinh_phong != '' &&
            p.gioi_tinh_phong != null &&
            p.gioi_tinh_phong != loc.gioi_tinh_phong
        ) return false;
        if (loc.kich_thuoc_toi_da && p.kich_thuoc_toi_da !== loc.kich_thuoc_toi_da) return false;
        if (!loc.hien_thi_phong_day && tongNguoi >= p.kich_thuoc_toi_da) return false;
        return true;
    });

    const TimPhong = (
        <>
            {C_ThanhTimKiemPhong({ loc, setLoc, dsPhong })}
            {hienThiHD === true ? C_HuongDan() : (
                <>
                    {C_DanhSachPhong({ dsLoc, dsDKP, sltPhong, setSltPhong })}
                </>
            )}
        </>
    );

    return (
        <>
            {!hienThiTTCN ? (
                !sltPhong ? (
                    TimPhong
                ) : (
                    <C_ThongTinPhong
                        phong={dsPhong.find(p => p.id_tb_phong == sltPhong)!}
                        sltDangKy={dsDKP.filter(dkp => dkp.id_tb_phong === sltPhong).length}
                        onBack={() => {
                            setSltPhong(null)
                        }}
                        onNext={() => {
                            setHienThiTTCN(true);
                        }}
                    />
                )
            ) : (
                sltPhong && (
                    <C_ThongTinSinhVien
                        id_tb_phong={sltPhong}
                        onBack={() => {
                            setHienThiTTCN(false)
                        }}
                    />
                )
            )}
        </>
    )
};

export default PageDangKyPhongO;