'use client'

import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";
import { Banknote, Droplets, Zap } from 'lucide-react'
import FeatureTitle from "@components/function_title";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from 'date-fns/locale';

const QLDienNuoc = () => {
    // Dữ liệu mẫu cho bảng

    const [selectedMonth, setSelectedMonth] = useState<{ name: string, code: string } | null>(null);
    const months = [
        { name: 'Tháng 1/2025', code: '01-2025' },
        { name: 'Tháng 2/2025', code: '02-2025' },
        { name: 'Tháng 3/2025', code: '03-2025' },
    ];
    const data = [
        {
            maPhong: 'P101',
            soLuongSV: 4,
            chiSoDienCu: 1200,
            chiSoDienMoi: 1250,
            dienTieuThu: 50,
            chiSoNuocCu: 300,
            chiSoNuocMoi: 320,
            nuocTieuThu: 20,
            tienDien: 150000,
            tienNuoc: 60000,
            thang: '03/2025',
            trangThai: 'Chưa thu'
        },
        {
            maPhong: 'P102',
            soLuongSV: 3,
            chiSoDienCu: 1000,
            chiSoDienMoi: 1050,
            dienTieuThu: 50,
            chiSoNuocCu: 250,
            chiSoNuocMoi: 270,
            nuocTieuThu: 20,
            tienDien: 150000,
            tienNuoc: 60000,
            thang: '03/2025',
            trangThai: 'Đã thu'
        },
    ];

    // state 
    const [tongDienTieuThu, setTongDienTieuThu] = useState<any>()
    const [tongNuocTieuThu, setTongNuocTieuThu] = useState<any>();
    const [giaTienDien, setGiaTienDien] = useState<any>();
    const [giaTienNuoc, setGiaTienNuoc] = useState<any>();
    const [globalFilter, setGlobalFilter] = useState('')
    const [sltState, setSltState] = useState<{ name: string, code: string } | null>(null);
    const states = [
        { name: 'Chưa thu', code: '0' },
        { name: 'Đã thu', code: '1' },
    ]
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    // effect 
    useEffect(() => {
        // start 
        setTongDienTieuThu(1000)
        setTongNuocTieuThu(400)
        setGiaTienDien(3000)
        setGiaTienNuoc(3000)

    }, [])
    // components
    const actionTemplate = (rowData: any) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" rounded severity="info" tooltip="Sửa chỉ số" />
                <Button icon="pi pi-history" rounded severity="secondary" tooltip="Lịch sử" />
                <Button icon="pi pi-check" rounded severity="success" tooltip="Tạo hóa đơn" />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0 text-xl">Danh sách số điện số nước theo tháng</h2>
            <div className="">
                <Dropdown
                    value={sltState}
                    onChange={(e) => setSltState(e.value)}
                    options={states}
                    optionLabel="name"
                    placeholder="Trạng thái"
                    className="w-40"
                ></Dropdown>
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                    <DatePicker
                        label="Chọn tháng"
                        views={[ 'month']}
                        value={selectedDate}
                        onChange={(newValue) => {
                            console.log(newValue)
                            setSelectedDate(newValue)
                        }}
                        format="MM/yyyy"
                    />
                </LocalizationProvider>
            </div>
            <div className="flex gap-3">
                <span className="block mt-2 md:mt-0 p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
                </span>
            </div>
        </div>
    )

    return (
        <div className="w-full p-3 flex flex-col gap-4">
            <FeatureTitle title="Quản lý số điện số nước" />

            {/* Bộ lọc tháng */}
            <div className="flex items-center gap-3">
                <span>Chọn tháng:</span>
                <Dropdown value={selectedMonth} onChange={(e) => setSelectedMonth(e.value)} options={months} optionLabel="name" placeholder="Chọn tháng" className="w-40" />
            </div>



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
            <div className="flex gap-2">
                <Button label="📝 Thêm chỉ số mới" icon="pi pi-plus" severity="info" />
                <Button label="📥 Import Excel" icon="pi pi-file-excel" severity="success" />
                <Button label="🔄 Nhập chỉ số tự động" icon="pi pi-copy" severity="warning" />
            </div>

            {/* Bảng chi tiết */}
            <DataTable
                value={data}
                paginator
                rows={5}
                showGridlines
                responsiveLayout="scroll"
                globalFilter={globalFilter}
                header={header}
            >
                <Column field="maPhong" header="🏠 Mã phòng" />
                <Column field="soLuongSV" header="👥 Số SV" />
                <Column field="chiSoDienCu" header="🔢 Điện cũ" />
                <Column field="chiSoDienMoi" header="🔢 Điện mới" />
                <Column field="dienTieuThu" header="➕ Điện tiêu thụ" />
                <Column field="chiSoNuocCu" header="🔢 Nước cũ" />
                <Column field="chiSoNuocMoi" header="🔢 Nước mới" />
                <Column field="nuocTieuThu" header="➕ Nước tiêu thụ" />
                <Column field="tienDien" header="💸 Tiền điện" body={(rowData) => `${rowData.tienDien.toLocaleString()}đ`} />
                <Column field="tienNuoc" header="💸 Tiền nước" body={(rowData) => `${rowData.tienNuoc.toLocaleString()}đ`} />
                <Column field="thang" header="📅 Tháng" />
                <Column field="trangThai" header="✅ Trạng thái" />
                <Column header="⚙️ Thao tác" body={actionTemplate} />
            </DataTable>
        </div>
    )
}

export default QLDienNuoc;
