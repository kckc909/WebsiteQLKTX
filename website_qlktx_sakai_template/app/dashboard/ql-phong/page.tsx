/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { tb_phong } from '../../../types/custom';
import { api_tb_phong_add, api_tb_phong_delete, api_tb_phong_getAll, api_tb_phong_update } from '../../api/dashboard/api_tb_phong';
import { useRouter } from 'next/navigation';
import FeatureTitle from '@components/FeatureTitle';
import { Dropdown } from 'primereact/dropdown';

const emptyPhong: tb_phong = {
    id_tb_phong: 0,
    ten_phong: '',
    kich_thuoc_toi_da: 0,
    trang_thai: '0',
    mat_khau: '',
    so_luong: 0,
    day_nha: '',
    gioi_tinh_phong: null,
    tang: 0,
    co_so: 0
};

const DSCoSo = [
    { label: 'Cơ sở Khoái Châu', value: 1 },
    { label: 'Cơ sở Mỹ Hào', value: 2 },
]

const CrudPhong = () => {
    const router = useRouter();

    const [phongs, setPhongs] = useState<tb_phong[]>([]);
    const [phong, setPhong] = useState<tb_phong>(emptyPhong);
    const [selectedPhongs, setSelectedPhongs] = useState<tb_phong[]>([]);
    const [dialogState, setDialogState] = useState({ phong: false, delete: false, deleteMulti: false });
    const toast = useRef<Toast>(null);
    const [globalFilter, setGlobalFilter] = useState('');

    useEffect(() => {
        getAllPhongs();
    }, []);

    const getAllPhongs = async () => {
        const data = await api_tb_phong_getAll();
        setPhongs(data);
    };

    const openDialog = (type: 'phong' | 'delete' | 'deleteMulti', phongData?: tb_phong) => {
        if (phongData) setPhong(phongData);
        setDialogState((prev) => ({ ...prev, [type]: true }));
    };

    const closeDialog = (type: 'phong' | 'delete' | 'deleteMulti') => {
        setDialogState((prev) => ({ ...prev, [type]: false }));
        if (type === 'phong') setPhong(emptyPhong);
    };

    const savePhong = async () => {
        if (!phong.ten_phong.trim()) return;

        const updatedPhong = { ...phong, trang_thai: phong.so_luong >= phong.kich_thuoc_toi_da ? '1' : '0' };

        let newPhongs = [...phongs];

        if (phong.id_tb_phong && phong.id_tb_phong !== 0) {
            await api_tb_phong_update(updatedPhong);
            newPhongs = newPhongs.map((p) => (p.id_tb_phong === phong.id_tb_phong ? updatedPhong : p));
            toast.current?.show({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Thông tin phòng đã được cập nhật', life: 3000 });
        } else {
            await api_tb_phong_add(updatedPhong);
            newPhongs.push(phong);
            toast.current?.show({ severity: 'success', summary: 'Thêm thành công', detail: 'Phòng mới đã được thêm', life: 3000 });
        }

        setPhongs(newPhongs);
        closeDialog('phong');
        setPhong(emptyPhong);
    };

    const deletePhong = async () => {
        await api_tb_phong_delete(phong.id_tb_phong);
        setPhongs(phongs.filter((p) => p.id_tb_phong !== phong.id_tb_phong));
        toast.current?.show({ severity: 'success', summary: 'Xóa thành công', detail: `Phòng ${phong.ten_phong} đã bị xóa`, life: 3000 });
        closeDialog('delete');
    };

    const openDetails = async (id: string) => {
        router.push(`/dashboard/ql-phong/${id}`);
    }

    // component
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0 text-2xl">Danh sách phòng ở</h2>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    return (
        <>
            <FeatureTitle title="Quản lý phòng" />
            <Toast ref={toast} />
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toolbar className="mb-4" left={() => (
                            <>
                                <div>
                                    <Button label='Làm mới' icon='pi pi-refresh' onClick={getAllPhongs} className='mr-2' />
                                    <Button label="Thêm mới" icon="pi pi-plus" onClick={() => openDialog('phong')} className='mr-2 bg-green-400 border-0' />
                                </div>
                            </>
                        )} />

                        <DataTable
                            value={phongs}
                            selectionMode="multiple"
                            selection={selectedPhongs}
                            onSelectionChange={(e) => setSelectedPhongs(e.value)}
                            dataKey="id_tb_phong"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            emptyMessage="Không có phòng nào."
                            responsiveLayout="scroll"
                            globalFilter={globalFilter}
                            header={header}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '4rem' }} />
                            <Column field="id_tb_phong" header="Mã phòng" sortable />
                            <Column field="ten_phong" header="Tên phòng" sortable />
                            <Column header='Số lượng' sortable body={(rowData) => `${rowData.so_luong} / ${rowData.kich_thuoc_toi_da}`} />
                            <Column field="trang_thai" header="Trạng thái" sortable body={(rowData) => rowData.trang_thai === '0' ? "Còn chỗ" : "Hết chỗ"} />
                            <Column field='ghi_chu' header='Ghi chú' sortable />
                            <Column
                                header="Hành động"
                                body={(rowData) => (
                                    <>
                                        <Button icon="pi pi-info" className="p-button-rounded p-button-primary mr-2" onClick={() => openDetails(rowData.id_tb_phong)} />
                                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => openDialog('phong', rowData)} />
                                        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => openDialog('delete', rowData)} />
                                    </>
                                )}
                            />
                        </DataTable>

                        <Dialog
                            visible={dialogState.phong}
                            header="Thông tin phòng"
                            modal
                            footer={<Button label="Lưu" icon="pi pi-check" onClick={savePhong} />}
                            onHide={() => closeDialog('phong')}
                        >
                            <div className="gap-2 grid grid-cols-2 p-2 pt-4">
                                <label htmlFor="ten_phong">Tên phòng</label>
                                <InputText id="ten_phong" value={phong.ten_phong} onChange={(e) => setPhong({ ...phong, ten_phong: e.target.value })} />
                                <label htmlFor="mat_khau">Mật khẩu</label>
                                <InputText id="mat_khau" value={phong.mat_khau} onChange={(e) => setPhong({ ...phong, mat_khau: e.target.value })} />
                                <label htmlFor="so_luong">Số lượng</label>
                                <InputNumber id="so_luong" value={phong.so_luong} onValueChange={(e) => setPhong({ ...phong, so_luong: e.value || 0 })} />
                                <label htmlFor="kich_thuoc_toi_da">Số lượng tối đa</label>
                                <InputNumber id="kich_thuoc_toi_da" value={phong.kich_thuoc_toi_da} onValueChange={(e) => setPhong({ ...phong, kich_thuoc_toi_da: e.value || 0 })} />
                                <label htmlFor="co_so">Cơ sở</label>
                                <Dropdown
                                    value={phong.co_so}
                                    options={DSCoSo}
                                    onChange={(e) => setPhong({ ...phong, co_so: e.value })}
                                    optionLabel="label"
                                    optionValue="value"
                                />

                                <label htmlFor="day_nha">Dãy nhà</label>
                                <InputText id="day_nha" value={phong.day_nha.toString()} onChange={(e) => setPhong({ ...phong, day_nha: e.target.value })} />
                                <label htmlFor="tang">Tầng</label>
                                <InputNumber id="tang" value={phong.tang} onValueChange={(e) => setPhong({ ...phong, tang: e.value || 0 })} />
                            </div>
                        </Dialog>

                        <Dialog visible={dialogState.delete} header="Xác nhận" modal footer={<Button label="Xóa" icon="pi pi-check" onClick={deletePhong} />} onHide={() => closeDialog('delete')}>
                            <span>Bạn có chắc chắn muốn xóa phòng <b>{phong.ten_phong}</b>?</span>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CrudPhong;
