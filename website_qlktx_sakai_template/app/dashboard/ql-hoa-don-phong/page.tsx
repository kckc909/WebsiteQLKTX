'use client'

import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

interface HoaDonPhong {
    id: number;
    ma_hoa_don: string;
    ma_phong: string;
    so_sinh_vien: number;
    ky: string;
    so_tien: number;
    trang_thai: number; // 0: Chưa thu, 1: Đã thu
    ngay_lap: string;
    ghi_chu: string;
}

const QlHoaDonPhong = () => {
    const toast = useRef<Toast>(null);
    const [hoaDons, setHoaDons] = useState<HoaDonPhong[]>([]);
    const [filteredHoaDons, setFilteredHoaDons] = useState<HoaDonPhong[]>([]);
    const [selectedTrangThai, setSelectedTrangThai] = useState<number | null>(null);
    const [searchPhong, setSearchPhong] = useState<string>('');

    useEffect(() => {
        fetchHoaDons();
    }, []);

    useEffect(() => {
        filterData();
    }, [selectedTrangThai, searchPhong, hoaDons]);

    const fetchHoaDons = async () => {
        // TODO: gọi API thật
        const mockData: HoaDonPhong[] = [
            {
                id: 1,
                ma_hoa_don: 'HDP001',
                ma_phong: 'P101',
                so_sinh_vien: 4,
                ky: '05/2025',
                so_tien: 2000000,
                trang_thai: 1,
                ngay_lap: '2025-05-01',
                ghi_chu: '',
            },
            {
                id: 2,
                ma_hoa_don: 'HDP002',
                ma_phong: 'P102',
                so_sinh_vien: 3,
                ky: '05/2025',
                so_tien: 1800000,
                trang_thai: 0,
                ngay_lap: '2025-05-02',
                ghi_chu: 'Thiếu 1 bạn chưa nộp',
            },
        ];
        setHoaDons(mockData);
    };

    const filterData = () => {
        let data = hoaDons;
        if (selectedTrangThai !== null) {
            data = data.filter(hd => hd.trang_thai === selectedTrangThai);
        }
        if (searchPhong) {
            data = data.filter(hd => hd.ma_phong.toLowerCase().includes(searchPhong.toLowerCase()));
        }
        setFilteredHoaDons(data);
    };

    // Thống kê
    const kyHienTai = hoaDons[0]?.ky || 'Chưa có';
    const tongHoaDon = hoaDons.length;
    const daThu = hoaDons.filter(hd => hd.trang_thai === 1).length;
    const chuaThu = hoaDons.filter(hd => hd.trang_thai === 0).length;

    const trangThaiOptions = [
        { label: 'Chưa thu', value: 0 },
        { label: 'Đã thu', value: 1 },
    ];

    const trangThaiTemplate = (rowData: HoaDonPhong) => {
        return (
            <span className={`px-2 py-1 text-sm rounded ${rowData.trang_thai === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                {rowData.trang_thai === 1 ? 'Đã thu' : 'Chưa thu'}
            </span>
        );
    };

    const actionTemplate = (rowData: HoaDonPhong) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" className='p-button-rounded p-button-primary mr-2' severity="info" tooltip="Sửa"
                    onClick={() => { }}
                />
                <Button icon="pi pi-check" className='p-button-rounded p-button-success mr-2' severity="success" tooltip="Đánh dấu"
                    onClick={() => { }}
                />
                {/* <Button icon="pi pi-print" rounded text severity="secondary" tooltip="In hóa đơn" /> */}
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-between">
            <div className="flex gap-2">
                <Button label="Sinh hóa đơn tháng" icon="pi pi-refresh" severity="success" />
                <Button label="Thêm hóa đơn" icon="pi pi-plus" severity="info" />
            </div>
            <div className="flex gap-2">
                <InputText
                    value={searchPhong}
                    onChange={(e) => setSearchPhong(e.target.value)}
                    placeholder="Tìm theo mã phòng"
                />
                <Dropdown
                    value={selectedTrangThai}
                    onChange={(e) => setSelectedTrangThai(e.value)}
                    options={trangThaiOptions}
                    optionLabel="label"
                    placeholder="Lọc theo trạng thái"
                    showClear
                />
            </div>
        </div>
    );

    return (
        <div className="p-4">
            <Toast ref={toast} />
            {/* Thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <Card title="Kỳ hiện tại">
                    <p className="text-xl font-bold">{kyHienTai}</p>
                </Card>
                <Card title="Tổng số hóa đơn">
                    <p className="text-2xl font-bold">{tongHoaDon}</p>
                </Card>
                <Card title="Đã thu">
                    <p className="text-2xl font-bold text-green-600">{daThu}</p>
                </Card>
                <Card title="Chưa thu">
                    <p className="text-2xl font-bold text-red-600">{chuaThu}</p>
                </Card>
            </div>

            {/* Bảng */}
            <Card title="Danh sách hóa đơn phòng">
                <DataTable value={filteredHoaDons} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} header={header}>
                    <Column field="ma_hoa_don" header="Mã hóa đơn"></Column>
                    <Column field="ma_phong" header="Mã phòng"></Column>
                    <Column field="so_sinh_vien" header="Số SV"></Column>
                    <Column field="ky" header="Kỳ"></Column>
                    <Column field="so_tien" header="Số tiền" body={(row) => row.so_tien.toLocaleString() + ' đ'}></Column>
                    <Column body={trangThaiTemplate} header="Trạng thái"></Column>
                    <Column field="ngay_lap" header="Ngày lập"></Column>
                    <Column field="ghi_chu" header="Ghi chú"></Column>
                    <Column body={actionTemplate} header="Thao tác"></Column>
                </DataTable>
            </Card>
        </div>
    );
};

export default QlHoaDonPhong;
