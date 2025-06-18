'use client'

import React, { useEffect, useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { tb_gia_dien, tb_gia_nuoc, tb_hoa_don_dien_nuoc, tb_phong, tb_so_dien_nuoc } from "@custom";
import { AutoComplete } from "primereact/autocomplete";
import { api_tb_phong_getAll } from "app/api/dashboard/api_tb_phong";
import { api_tb_so_dien_nuoc_add, api_tb_so_dien_nuoc_delete, api_tb_so_dien_nuoc_getAll, api_tb_so_dien_nuoc_update } from "app/api/dashboard/api_tb_so_dien_nuoc";
import { api_tb_hoa_don_dien_nuoc_add, api_tb_hoa_don_dien_nuoc_getAll } from "app/api/dashboard/api_tb_hoa_don_dien_nuoc";
import { api_tb_gia_dien_ApDung } from "app/api/dashboard/api_tb_gia_dien";
import { api_tb_gia_nuoc_ApDung } from "app/api/dashboard/api_tb_gia_nuoc";

interface AddChiSoModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface Phong {
    id: number;
    ten_phong: string;
}

export default function AddChiSoModal({ visible, onClose, onSuccess }: AddChiSoModalProps) {
    const [taoHoaDon, setTaoHoaDon] = useState(true);
    const [form, setForm] = useState({
        id_tb_so_dien_nuoc: 0,
        id_tb_phong: 0,
        thoi_gian: new Date(),
        so_dien_cu: 0,
        so_dien_moi: 0,
        so_nuoc_cu: 0,
        so_nuoc_moi: 0,
        ghi_chu: ''
    });
    const [dsSoDienNuoc, setDsSoDienNuoc] = useState<tb_so_dien_nuoc[]>();
    const [dsHDDienNuoc, setDsHDDienNuoc] = useState<tb_hoa_don_dien_nuoc[]>();
    const [dsPhong, setDsPhong] = useState<Phong[]>([]);
    const [selectedPhong, setSelectedPhong] = useState<Phong | null>(null);
    const [filteredPhongs, setFilteredPhongs] = useState<Phong[]>([]);
    const [giaDien, setGiaDien] = useState<tb_gia_dien>();
    const [giaNuoc, setGiaNuoc] = useState<tb_gia_nuoc>();

    const searchPhongs = (event: { query: string }) => {
        const query = event.query.toLowerCase();
        setFilteredPhongs(
            dsPhong.filter((phong) =>
                phong.ten_phong.toLowerCase().includes(query)
            )
        );
    };

    async function fetchData() {
        const dsPhong = await api_tb_phong_getAll();
        setDsPhong(dsPhong)
        const gd = await api_tb_gia_dien_ApDung();
        setGiaDien(gd);
        const gn = await api_tb_gia_nuoc_ApDung();
        setGiaNuoc(gn);
    }

    async function fetchDN() {
        const dssdsn = await api_tb_so_dien_nuoc_getAll();
        const dshsdn = await api_tb_hoa_don_dien_nuoc_getAll();
        setDsSoDienNuoc(dssdsn);
        setDsHDDienNuoc(dshsdn)
    }

    const dsSoDienNuocGop = useMemo(() => {
        return (dsSoDienNuoc ?? []).map(so => {
            const hoaDon = (dsHDDienNuoc ?? []).find(
                hd => hd.id_tb_so_dien_nuoc === so.id_tb_so_dien_nuoc
            );

            return {
                soDienNuoc: so,
                hoaDonDienNuoc: hoaDon ?? null
            };
        });
    }, [dsSoDienNuoc, dsHDDienNuoc]);


    useEffect(() => {
        if (visible) {
            fetchData()
            fetchDN()


        }
    }, [visible]);

    const handleAdd = async (newData: tb_so_dien_nuoc) => {
        await api_tb_so_dien_nuoc_add(newData);
        fetchDN();
    };

    const handleUpdate = async (newData: tb_so_dien_nuoc) => {
        await api_tb_so_dien_nuoc_update(newData);
        fetchDN();
    };

    const handleDelete = async (newData: tb_so_dien_nuoc) => {
        await api_tb_so_dien_nuoc_delete(newData.id_tb_so_dien_nuoc);
        fetchDN();
    };


    const handleSubmit = async () => {
        const dienTieuThu = form.so_dien_moi - form.so_dien_cu;
        const nuocTieuThu = form.so_nuoc_moi - form.so_nuoc_cu;
        const tongTien =
            dienTieuThu * (giaDien?.gia || 3500)
            + nuocTieuThu * (giaNuoc?.gia || 6000);

        const payload: tb_so_dien_nuoc & {
            dienTieuThu: number;
            nuocTieuThu: number;
        } = {
            ...form,
            dienTieuThu,
            nuocTieuThu,
        };

        try {
            // Gửi chỉ số
            const res = await api_tb_so_dien_nuoc_add(payload);
            const idMoi = res?.id_tb_so_dien_nuoc;

            if (!idMoi) {
                console.error("Không lấy được id_tb_so_dien_nuoc sau khi tạo");
                return;
            }

            // Nếu người dùng muốn tạo hóa đơn
            if (taoHoaDon) {
                await api_tb_hoa_don_dien_nuoc_add({
                    id_tb_hoa_don_dien_nuoc: 0, // or null if your backend accepts it for new records
                    id_tb_so_dien_nuoc: idMoi,
                    thoi_gian: form.thoi_gian,
                    tien_dien: dienTieuThu * 3500,
                    tien_nuoc: nuocTieuThu * 15000,
                    thanh_tien: tongTien,
                    trang_thai: 0, // ví dụ: 0 = chưa thanh toán
                    ghi_chu: "Tạo tự động từ chỉ số điện nước",
                });
            }

            onSuccess();
            onClose();

        } catch (error) {
            console.error("Lỗi khi tạo chỉ số hoặc hóa đơn:", error);
        }
    };


    const dienTieuThu = form.so_dien_moi - form.so_dien_cu;
    const nuocTieuThu = form.so_nuoc_moi - form.so_nuoc_cu;
    const tienTamTinh =
        dienTieuThu * (giaDien?.gia || 3500)
        + nuocTieuThu * (giaNuoc?.gia || 6000);


    return (
        <Dialog header="Nhập chỉ số điện nước" visible={visible} style={{ width: '35rem' }} onHide={onClose}>
            <div className="flex flex-column gap-3">
                <AutoComplete
                    value={selectedPhong}
                    suggestions={filteredPhongs}
                    completeMethod={searchPhongs}
                    field="ten_phong"
                    placeholder="Chọn phòng"
                    dropdown
                    className="w-full"
                    itemTemplate={(option: tb_phong) => (
                        <div className="p-2 border-bottom-1 border-gray-200">
                            <div className="font-bold text-primary">{option.ten_phong}</div>
                            <div className="text-sm text-gray-600">Cơ sở: {option.co_so} | Dãy nhà: {option.day_nha}</div>
                        </div>
                    )}
                    onChange={(e) => {
                        setSelectedPhong(e.value)
                        setForm(prev => ({ ...prev, id_tb_phong: e.value?.id || 0 }));
                    }}
                />

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <div>Số điện cũ</div>
                        <InputNumber
                            title="Số điện cũ"
                            value={form.so_dien_cu}
                            onValueChange={(e) => setForm(prev => ({ ...prev, so_dien_cu: e.value || 0 }))}
                            placeholder="Số điện cũ"
                            className="w-full" />
                    </div>
                    <div>
                        <div>Số điện mới</div>
                        <InputNumber
                            value={form.so_dien_moi}
                            onValueChange={(e) => setForm(prev => ({ ...prev, so_dien_moi: e.value || 0 }))}
                            placeholder="Số điện mới"
                            className="w-full" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <div>Số nước cũ</div>
                        <InputNumber
                            value={form.so_nuoc_cu}
                            onValueChange={(e) => setForm(prev => ({ ...prev, so_nuoc_cu: e.value || 0 }))}
                            placeholder="Số nước cũ"
                            className="w-full" />
                    </div>
                    <div>
                        <div>Số nước mới</div>
                        <InputNumber value={form.so_nuoc_moi}
                            onValueChange={(e) => setForm(prev => ({ ...prev, so_nuoc_moi: e.value || 0 }))}
                            placeholder="Số nước mới"
                            className="w-full" />
                    </div>
                </div>

                <div className="text-sm">
                    🔌 Điện tiêu thụ: <strong>{dienTieuThu} kWh</strong> <br />
                    🚰 Nước tiêu thụ: <strong>{nuocTieuThu} m³</strong> <br />
                    💰 Tiền tạm tính: <strong>{tienTamTinh.toLocaleString()} đ</strong>
                </div>

                <div className="flex align-items-center gap-2">
                    <Checkbox inputId="taoHoaDon" checked={taoHoaDon} onChange={e => setTaoHoaDon(e.checked || false)} />
                    <label htmlFor="taoHoaDon" className="cursor-pointer">Tạo hóa đơn ngay</label>
                </div>

                <div>
                    <label>
                        Ghi chú
                        <input
                            name="ghi_chu"
                            value={form.ghi_chu}
                            onChange={(e) => { setForm({ ...form, ghi_chu: e.target.value }) }}
                            title="Nhập ghi chú cho chỉ số (nếu có)"
                            placeholder="Nhập ghi chú (nếu có)"
                        />
                    </label>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={onClose} />
                    <Button label="Lưu" icon="pi pi-check" onClick={handleSubmit} />
                </div>
            </div>
        </Dialog>
    );
}
