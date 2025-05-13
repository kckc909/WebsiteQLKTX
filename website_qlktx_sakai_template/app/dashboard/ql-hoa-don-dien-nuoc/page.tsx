// ✅ 3. Quản lý hóa đơn điện nước
// 🗂 Bảng cột gợi ý:
// 🧾 Mã hóa đơn
// 🏠 Mã phòng
// 🔢 Điện tiêu thụ (kWh)
// 🔢 Nước tiêu thụ (m³)
// 💸 Tiền điện
// 💸 Tiền nước
// 📅 Kỳ (Tháng/Năm)
// 💳 Trạng thái (Đã thu / Chưa thu)
// ⚙️ Thao tác (Sửa, Thu tiền, In hóa đơn)
// 🔥 Chức năng chính
// 🔄 Sinh hóa đơn điện nước tự động khi nhập chỉ số
// 💳 Xác nhận thu tiền
// 🖨️ In hóa đơn
// 🔍 Lọc theo phòng, tháng, trạng thái

'use client';

import { InputText } from "primereact/inputtext";
import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { tb_hoa_don_dien_nuoc } from "@custom";
import FeatureTitle from "@components/function_title";
import { Toolbar } from "primereact/toolbar";

const QlHoaDonDienNuoc = () => {
    // state 
    const toast = useRef<Toast>(null);
    const trangThaiOptions = [
        { label: 'Chưa thanh toán', value: 0 },
        { label: 'Đã thanh toán', value: 1 },
    ];
    const [tongHoaDonThang, setTongHoaDonThang] = useState(0);
    const [daThanhToan, setDaThanhToan] = useState(0);
    const [chuaThanhToan, setChuaThanhToan] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [hoaDons, setHoaDons] = useState<tb_hoa_don_dien_nuoc[]>([]);
    const [filteredHoaDons, setFilteredHoaDons] = useState<tb_hoa_don_dien_nuoc[]>([]);
    const [selectedTrangThai, setSelectedTrangThai] = useState<number | null>(null);


    // effect 
    useEffect(() => {

    }, []);

    useEffect(() => {
        if (selectedTrangThai !== null) {
            setFilteredHoaDons(hoaDons.filter(hd => hd.trang_thai === selectedTrangThai));
        } else {
            setFilteredHoaDons(hoaDons);
        }
    }, [selectedTrangThai, hoaDons]);
    // functions
    const trangThaiTemplate = (rowData: tb_hoa_don_dien_nuoc) => {
        return (
            <span className={`px-2 py-1 text-sm rounded ${rowData.trang_thai === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                {rowData.trang_thai === 1 ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </span>
        );
    };

    // componnent 
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0 text-2xl">Danh sách phòng ở</h2>
            <div className="flex flex-wrap gap-2 align-items-center justify-between">
                <Dropdown
                    value={selectedTrangThai}
                    onChange={(e) => setSelectedTrangThai(e.value)}
                    options={trangThaiOptions}
                    optionLabel="label"
                    placeholder="Lọc theo trạng thái"
                    className="w-64"
                    showClear
                />
            </div>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    )
    const actionTemplate = (rowData: tb_hoa_don_dien_nuoc) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" rounded text severity="info" />
                <Button icon="pi pi-trash" rounded text severity="danger" />
            </div>
        );
    };
    return (
        <div className="p-4">
            <Toast ref={toast} />
            <FeatureTitle title="Quản lý hóa đơn điện nước" />
            {/* Thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card title="Tổng hóa đơn tháng">
                    <p className="text-2xl font-bold">{tongHoaDonThang}</p>
                </Card>
                <Card title="Đã thanh toán">
                    <p className="text-2xl font-bold text-green-600">{daThanhToan}</p>
                </Card>
                <Card title="Chưa thanh toán">
                    <p className="text-2xl font-bold text-red-600">{chuaThanhToan}</p>
                </Card>
            </div>

            {/* Bảng */}
            <Card>
                <Toolbar className="mb-4" left={() => (
                    <>
                        <div>
                            <Button label='Làm mới' icon='pi pi-refresh' onClick={() => { }} className='mr-2' />
                            <Button label="Thêm mới" icon="pi pi-plus" onClick={() => { }} className='mr-2 bg-green-400 border-0' />
                        </div>
                    </>
                )} />
                <DataTable value={filteredHoaDons} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} header={header}>
                    <Column field="ma_hoa_don" header="Mã hóa đơn"></Column>
                    <Column field="ten_phong" header="Phòng"></Column>
                    <Column body={(row) => `Kỳ ${row.hoc_ki} - ${row.nam_hoc}`} header="Kỳ"></Column>
                    <Column field="chi_so_dien" header="Điện (kWh)"></Column>
                    <Column field="chi_so_nuoc" header="Nước (m³)"></Column>
                    <Column field="so_tien" header="Số tiền" body={(row) => row.so_tien.toLocaleString() + ' đ'}></Column>
                    <Column body={trangThaiTemplate} header="Trạng thái"></Column>
                    <Column field="ngay_tao" header="Ngày tạo"></Column>
                    <Column body={actionTemplate} header="Thao tác"></Column>
                </DataTable>
            </Card>
        </div>
    );
}
export default QlHoaDonDienNuoc;
