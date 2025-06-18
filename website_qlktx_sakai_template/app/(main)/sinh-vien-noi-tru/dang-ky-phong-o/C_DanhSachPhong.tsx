import { tb_dang_ky_phong, tb_phong } from "@custom";
import { useState } from "react";

export default function C_DanhSachPhong({
    dsLoc,
    dsDKP,
    sltPhong,
    setSltPhong
}: {
    dsLoc: tb_phong[],
    dsDKP: tb_dang_ky_phong[],
    sltPhong: number | null | undefined,
    setSltPhong: (id: number) => void
}) {
    const c_Phong = ({
        phong,
        dsDangKy,
        sltPhong,
        onChonPhong
    }: {
        phong: tb_phong;
        dsDangKy: tb_dang_ky_phong[];
        sltPhong: number | null;
        onChonPhong: (phong: tb_phong) => void;
    }) => {
        const soLuongDangO = phong.so_luong;
        const soLuongDangKy = dsDangKy.length;
        const tongNguoi = soLuongDangO + soLuongDangKy;
        const sucChua = phong.kich_thuoc_toi_da;

        const bgColor = phong.id_tb_phong === sltPhong ? 'bg-yellow-100' : 'bg-white';

        const renderSlot = (i: number) => {
            if (i < soLuongDangO) return <i key={i} className="pi pi-user text-red-500 text-xl" title="Đang ở" />;
            if (i < soLuongDangO + soLuongDangKy) return <i key={i} className="pi pi-user text-blue-500 text-xl" title="Đang đăng ký" />;
            return <i key={i} className="pi pi-user text-green-500 text-xl" title="Còn trống" />;
        };

        const renderOverCapacity = () => {
            const vuot = tongNguoi - sucChua;
            if (vuot <= 0) return null;
            return Array.from({ length: vuot }).map((_, i) => (
                <i key={`over-${i}`} className="pi pi-user text-purple-500 text-xl" title="Vượt sức chứa" />
            ));
        };

        return (
            <div
                className={`p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-all ${bgColor}`}
                onClick={() => onChonPhong(phong)}
            >
                <h3 className="text-lg font-bold mb-2">{phong.ten_phong}</h3>
                <div className="flex gap-1 flex-wrap">
                    {Array.from({ length: sucChua }).map((_, i) => renderSlot(i))}
                    {renderOverCapacity()}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Chú thích : icon người màu xanh lá = vị trí còn trống, màu đỏ = có người, màu xanh nước biển = có người đang đăng ký vào */}
            <div className="flex gap-2 ml-2 ">
                <div className="col-sm-2" style={{ color: "red" }}><i className="pi pi-user text-xl red bigger-120" aria-hidden="true"></i><b> Chỗ đã có sinh viên đăng ký</b></div>
                <div className="col-sm-2"><i className="pi pi-user text-xl bigger-120" aria-hidden="true" style={{ color: "#0610ce" }}></i><b> Chỗ đang có sinh viên đăng ký</b></div>
                <div className="col-sm-2"><i className="pi pi-user text-xl bigger-120" aria-hidden="true" style={{ color: "#00f910" }}></i><b> Chỗ còn trống</b></div>
            </div>
            <div className="col-12 grid md:grid-cols-3 gap-2 flex-2">
                {dsLoc.map((phong: tb_phong, idx) => {
                    const dsDangKy = dsDKP.filter(dkp => dkp.id_tb_phong == phong.id_tb_phong);
                    return (
                        <div key={phong.id_tb_phong}>
                            {c_Phong({
                                phong,
                                dsDangKy,
                                sltPhong: sltPhong ?? null,
                                onChonPhong: (phong : tb_phong) => {
                                    setSltPhong(phong.id_tb_phong)
                                }
                            })}
                        </div>
                    );
                })}
            </div>
        </>

    )
}
