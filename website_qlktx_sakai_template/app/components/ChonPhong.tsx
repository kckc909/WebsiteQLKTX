import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import 'primeicons/primeicons.css';
import { tb_dang_ky_phong, tb_phong } from '@custom';

// onChonPhong: callback
export default function ChonPhong({ dsPhong, dsDKP, onChonPhong, sltPhong }: { dsPhong: any[], dsDKP: tb_dang_ky_phong[], onChonPhong?: (phong: tb_phong) => void, sltPhong: number | null }) {
    const [loc, setLoc] = useState({
        day_nha: '',
        tang: 1,
        gioi_tinh_phong: '',
        kich_thuoc_toi_da: 10,
        hien_thi_phong_day: false,
    });

    const isFilterValid = loc.day_nha && loc.tang && loc.gioi_tinh_phong !== '' && loc.kich_thuoc_toi_da;
    const dsDayNha = Array.from(new Set(dsPhong.map(p => p.day_nha)));
    const dsTang = Array.from(new Set(dsPhong.map(p => p.tang))).sort((a, b) => a - b);
    const dsKichThuoc = Array.from(new Set(dsPhong.map(p => p.kich_thuoc_toi_da))).sort((a, b) => a - b);

    const dsLoc = dsPhong.filter((p: tb_phong) => {
        const tongNguoi = p.so_luong + dsDKP.filter(dkp => dkp.id_tb_phong === p.id_tb_phong).length;
        if (loc.day_nha && p.day_nha !== loc.day_nha) return false;
        if (loc.tang && p.tang !== loc.tang) return false;
        if (loc.gioi_tinh_phong !== '' && p.gioi_tinh_phong !== loc.gioi_tinh_phong) return false;
        if (loc.kich_thuoc_toi_da && p.kich_thuoc_toi_da !== loc.kich_thuoc_toi_da) return false;
        if (!loc.hien_thi_phong_day && tongNguoi >= p.kich_thuoc_toi_da) return false;
        return true;
    });

    return (
        <div className="flex-column h-full gr">
            <div className="col-12 grid formgrid flex mb-1">
                <div className="col-12 md:col-6">
                    <label>Dãy nhà</label>
                    <Dropdown
                        value={loc.day_nha}
                        options={dsDayNha.map(dn => ({ label: dn, value: dn })) || []}
                        onChange={e => setLoc({ ...loc, day_nha: e.value })}
                        placeholder="Chọn dãy nhà"
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-6">
                    <label>Tầng</label>
                    <Dropdown
                        value={loc.tang}
                        options={dsTang.map(t => ({ label: `Tầng ${t}`, value: t }))}
                        onChange={e => setLoc({ ...loc, tang: e.value })}
                        placeholder="Chọn tầng"
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-6">
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
                <div className="col-12 md:col-6">
                    <label>Sức chứa</label>
                    <Dropdown
                        value={loc.kich_thuoc_toi_da}
                        options={dsKichThuoc.map(size => ({ label: `${size} người`, value: size }))}
                        onChange={e => setLoc({ ...loc, kich_thuoc_toi_da: e.value })}
                        placeholder="Chọn sức chứa"
                        className="w-full"
                    />
                </div>
                <div className="col-12 flex items-end mt-1">
                    <Checkbox
                        inputId="chkDay"
                        checked={loc.hien_thi_phong_day}
                        onChange={e => setLoc({ ...loc, hien_thi_phong_day: e.checked || false })}
                    />
                    <label htmlFor="chkDay" className="ml-2">Hiển thị phòng đầy</label>
                </div>
            </div>
            <div className="col-12 grid md:grid-cols-3 gap-2 flex-2">
                {!isFilterValid && dsLoc.map((phong: tb_phong, idx) => {
                    const dsDangKy = dsDKP.filter(dkp => dkp.id_tb_phong === phong.id_tb_phong);
                    const soLuongHienTai = phong.so_luong;
                    const soLuongDangKy = dsDangKy.length;
                    const tongNguoi = soLuongHienTai + soLuongDangKy;

                    const bg = (phong.id_tb_phong === sltPhong)? 'bg-yellow-100' : 'bg-white' 

                    return (
                        <div
                            key={idx}
                            className={"p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-all " + bg}
                            onClick={() => onChonPhong?.(phong)}
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
        </div>
    );
}
