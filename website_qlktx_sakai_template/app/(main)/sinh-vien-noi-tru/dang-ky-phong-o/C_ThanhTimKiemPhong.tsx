'use client';
import { tb_phong } from '@custom';
import { Dropdown } from 'primereact/dropdown';

export default function C_ThanhTimKiemPhong({
    loc,
    setLoc,
    dsPhong
}: {
    loc: any,
    setLoc: (v: any) => void,
    dsPhong: tb_phong[]
}) {
    const dsDayNha = loc.co_so
        ? Array.from(new Set(dsPhong.filter(p => p.co_so === loc.co_so).map(p => p.day_nha)))
        : [];

    const dsTang = loc.co_so && loc.day_nha
        ? Array.from(new Set(dsPhong.filter(p => p.co_so === loc.co_so && p.day_nha === loc.day_nha).map(p => p.tang))).sort((a, b) => (a ?? 0) - (b ?? 0))
        : [];

    const dsKichThuoc = loc.co_so && loc.day_nha && loc.tang
        ? Array.from(new Set(dsPhong.filter(p =>
            p.co_so === loc.co_so &&
            p.day_nha === loc.day_nha &&
            p.tang === loc.tang
        ).map(p => p.kich_thuoc_toi_da))).sort((a, b) => (a ?? 0) - (b ?? 0))
        : Array.from(new Set(dsPhong.map(p => p.kich_thuoc_toi_da))).sort((a, b) => (a ?? 0) - (b ?? 0));

    return (
        <>
            <div className="col-12 grid mb-1 grid-cols-5 pl-4 pt-4 gap-1">
                {/* cơ sở */}
                <div>
                    <Dropdown
                        value={loc.co_so}
                        options={[
                            { label: 'Cơ sở Khoái Châu', value: 1 },
                            { label: 'Cơ sở Mỹ Hào', value: 2 },
                        ]}
                        onChange={e => setLoc({ ...loc, co_so: e.value, day_nha: '', tang: -1 })}
                        placeholder="Chọn cơ sở"
                        className="w-full"
                    />
                </div>
                {/* dãy nhà */}
                <div>
                    <Dropdown
                        value={loc.day_nha}
                        options={dsDayNha.map(dn => ({ label: dn, value: dn }))}
                        onChange={e => setLoc({ ...loc, day_nha: e.value, tang: -1 })}
                        placeholder="Chọn dãy nhà"
                        className="w-full"
                        disabled={!loc.co_so}
                    />
                </div>
                {/* tầng */}
                <div>
                    <Dropdown
                        value={loc.tang}
                        options={dsTang.map(t => ({ label: `Tầng ${t}`, value: t }))}
                        onChange={e => setLoc({ ...loc, tang: e.value })}
                        placeholder="Chọn tầng"
                        className="w-full"
                        disabled={!loc.day_nha}
                    />
                </div>
                {/* giới tính */}
                <div>
                    <Dropdown
                        value={loc.gioi_tinh_phong}
                        options={[
                            { label: 'Nam', value: 1 },
                            { label: 'Nữ', value: 0 },
                        ]}
                        onChange={e => setLoc({ ...loc, gioi_tinh_phong: e.value })}
                        placeholder="Chọn giới tính"
                        className="w-full"
                    />
                </div>
                {/* Loại phòng */}
                <div>
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
    );
}