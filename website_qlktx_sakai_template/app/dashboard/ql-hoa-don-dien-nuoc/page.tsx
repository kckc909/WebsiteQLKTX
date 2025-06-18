// lấy giá điện nước từ bảng giá điện nước 
// 

'use client';

import { useEffect, useState, useRef } from 'react';
import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import FeatureTitle from "@components/FeatureTitle";
import { Toolbar } from "primereact/toolbar";
import { Banknote, Droplets, Zap } from 'lucide-react';
// Giả sử bạn đã có các API này:
import { api_tb_so_dien_nuoc_getAll } from "app/api/dashboard/api_tb_so_dien_nuoc";
import { api_tb_hoa_don_dien_nuoc_getAll } from "app/api/dashboard/api_tb_hoa_don_dien_nuoc";
import { tb_hoa_don_dien_nuoc, tb_so_dien_nuoc } from "@custom";
import C_ThemChiSoMoi from './C_ThemChiSoMoi';

const QlHoaDonDienNuoc = () => {
    // State cho filter
    const [selectedMonth, setSelectedMonth] = useState<{ name: string, code: string } | null>(null);
    const months = [
        { name: 'Tháng 1/2025', code: '01-2025' },
        { name: 'Tháng 2/2025', code: '02-2025' },
        { name: 'Tháng 3/2025', code: '03-2025' },
    ];
    const [sltState, setSltState] = useState<{ name: string, code: string } | null>(null);
    const states = [
        { name: 'Chưa lập', code: '-1' },
        { name: 'Chưa thu', code: '0' },
        { name: 'Đã thu', code: '1' },
    ];
    const [globalFilter, setGlobalFilter] = useState('');

    // State dữ liệu
    const [meterData, setMeterData] = useState<any[]>([]);
    const [hoaDons, setHoaDons] = useState<any[]>([]);
    const [filteredHoaDons, setFilteredHoaDons] = useState<any[]>([]);
    const [tongDienTieuThu, setTongDienTieuThu] = useState(0);
    const [tongNuocTieuThu, setTongNuocTieuThu] = useState(0);
    const [giaTienDien, setGiaTienDien] = useState(3000);
    const [giaTienNuoc, setGiaTienNuoc] = useState(3000);
    const [htThemChiSoMoi, setHTthemChiSoMoi] = useState(false);

    const toast = useRef<Toast>(null);

    const fetchData = async () => {
        // Lọc theo tháng nếu có
        const monthCode = selectedMonth?.code;
        let soDienNuocRes = await api_tb_so_dien_nuoc_getAll();
        let hoaDonRes = await api_tb_hoa_don_dien_nuoc_getAll();

        // Tính toán tổng điện, nước tiêu thụ
        let tongDien = 0, tongNuoc = 0;
        const merged = soDienNuocRes.map((item: any) => {
            const hd = hoaDonRes.find((h: any) => h.ma_phong === item.ma_phong && h.thang === item.thang && h.nam === item.nam);
            const dienTieuThu = item.so_dien_moi - item.so_dien_cu;
            const nuocTieuThu = item.so_nuoc_moi - item.so_nuoc_cu;
            tongDien += dienTieuThu;
            tongNuoc += nuocTieuThu;
            return {
                ...item,
                dienTieuThu,
                nuocTieuThu,
                tienDien: dienTieuThu * giaTienDien,
                tienNuoc: nuocTieuThu * giaTienNuoc,
                trangThai: hd ? (hd.trang_thai === 1 ? 'Đã thu' : 'Chưa thu') : 'Chưa thu',
                hoaDonId: hd?.id,
            };
        });
        setMeterData(merged);
        setHoaDons(hoaDonRes);
        setTongDienTieuThu(tongDien);
        setTongNuocTieuThu(tongNuoc);
    };
    // Lấy dữ liệu từ API
    useEffect(() => {
        fetchData();
    }, [selectedMonth, giaTienDien, giaTienNuoc]);

    // Lọc dữ liệu theo trạng thái và search
    useEffect(() => {
        let data = [...meterData];
        if (sltState) {
            data = data.filter(d => d.trangThai === (sltState.code === '1' ? 'Đã thu' : 'Chưa thu'));
        }
        if (globalFilter) {
            data = data.filter(d => d.ma_phong?.toLowerCase().includes(globalFilter.toLowerCase()));
        }
        setFilteredHoaDons(data);
    }, [meterData, sltState, globalFilter]);

    // Action template
    const actionTemplate = (rowData: any) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded severity="info" tooltip="Thông tin hóa đơn" onClick={() => {
                toast.current?.show({ severity: 'info', summary: 'Sửa', detail: rowData.ma_phong })
                // chuyển sang trang chi tiết hóa đơn điện nước  
                // hoặc
                // mở popup thông tin hóa đơn
            }} />
            <Button icon="pi pi-check" rounded severity="success" tooltip="Xác nhận thu tiền" onClick={() => {
                toast.current?.show({ severity: 'success', summary: 'Thu tiền', detail: rowData.ma_phong })
                // Cập nhật trạng thái thu tiền + reload dữ liệu
            }} />
        </div>
    );

    // Header DataTable
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0 text-xl">Danh sách số điện số nước theo tháng</h2>
            <div>
                <Dropdown
                    value={sltState}
                    onChange={(e) => setSltState(e.value)}
                    options={states}
                    optionLabel="name"
                    placeholder="Trạng thái"
                    className="w-50"
                />
            </div>
            <div>
                <Dropdown value={selectedMonth} onChange={(e) => setSelectedMonth(e.value)} options={months} optionLabel="name" placeholder="Chọn tháng" className="w-40" />
            </div>
            <div className="flex gap-3">
                <span className="block mt-2 md:mt-0 p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Tìm mã phòng..." />
                </span>
            </div>
        </div>
    );

    return (
        <div className="w-full p-3 flex flex-col gap-4">
            <Toast ref={toast} />
            <FeatureTitle title="Quản lý hóa đơn & chỉ số điện nước" />

            {/* Thêm chỉ số mới */}
            <>
                <C_ThemChiSoMoi
                    visible={htThemChiSoMoi}
                    onClose={() => setHTthemChiSoMoi(false)}
                    onSuccess={fetchData}
                />
            </>

            {/* Thống kê tổng quan */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <Card className="hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between">
                        <span className="text-lg">Tổng điện tiêu thụ (kWh)</span>
                        <Zap color='#ecf000' />
                    </div>
                    <div className="text-3xl font-bold mt-2">{tongDienTieuThu}</div>
                </Card>
                <Card className="hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between">
                        <span className="text-lg">Tổng nước tiêu thụ (m³)</span>
                        <Droplets color='blue' />
                    </div>
                    <div className="text-3xl font-bold mt-2">{tongNuocTieuThu}</div>
                </Card>
                <Card className="hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between">
                        <span className="text-lg">Giá điện hiện tại (đ/kWh)</span>
                        <Banknote color='#ecf000' />
                    </div>
                    <div className="text-3xl font-bold mt-2">{giaTienDien}</div>
                </Card>
                <Card className="hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between">
                        <span className="text-lg">Giá nước hiện tại (đ/m³)</span>
                        <Banknote color='blue' />
                    </div>
                    <div className="text-3xl font-bold mt-2">{giaTienNuoc}</div>
                </Card>
            </div>

            {/* Chức năng */}

            {/* Bảng chi tiết */}
            <Card>
                <Toolbar className="mb-4" left={() => (
                    <div className="flex gap-2">
                        <Button
                            label="Thêm chỉ số mới"
                            icon="pi pi-plus"
                            severity="info"
                            onClick={() => {
                                setHTthemChiSoMoi(true);
                            }}
                        />
                        <Button
                            label="Import Excel"
                            icon="pi pi-file-excel"
                            severity="success"
                            onClick={() => {

                            }}
                        />
                        <Button
                            label="Nhập chỉ số tự động"
                            icon="pi pi-copy"
                            severity="warning"
                            onClick={() => {

                            }}
                        />
                    </div>
                )} />
                <DataTable
                    value={meterData}
                    paginator
                    rows={10}
                    showGridlines
                    responsiveLayout="scroll"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="ma_phong" header="🏠 Mã phòng" />
                    <Column field="so_dien_cu" header="🔢 Điện cũ" />
                    <Column field="so_dien_moi" header="🔢 Điện mới" />
                    <Column field="dienTieuThu" header="⚡ Tiêu thụ điện" />
                    <Column field="so_nuoc_cu" header="🔢 Nước cũ" />
                    <Column field="so_nuoc_moi" header="🔢 Nước mới" />
                    <Column field="nuocTieuThu" header="💧 Tiêu thụ nước" />
                    <Column field="tienDien" header="💸 Tiền điện" body={row => row.tienDien.toLocaleString() + ' đ'} />
                    <Column field="tienNuoc" header="💸 Tiền nước" body={row => row.tienNuoc.toLocaleString() + ' đ'} />
                    <Column
                        body={(row) => {
                            const date = new Date(row.thoi_gian);
                            const month = date.getMonth() + 1; // getMonth() trả 0–11
                            const year = date.getFullYear();
                            return `Tháng ${month}/${year}`;
                        }}
                        header="📅 Tháng"
                    />
                    <Column field="trangThai" header="✅ Trạng thái" />
                    <Column header="⚙️ Thao tác" body={actionTemplate} />
                </DataTable>
            </Card>
        </div>
    );
};

export default QlHoaDonDienNuoc;