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
import { tb_nhan_vien } from '../../../types/custom';
import { api_tb_nhan_vien_add, api_tb_nhan_vien_delete, api_tb_nhan_vien_getAll, api_tb_nhan_vien_update } from '../../api/dashboard/api_tb_nhan_vien';
import { Calendar } from 'primereact/calendar';
import { useRouter } from 'next/navigation';
import { Avatar } from 'primereact/avatar';
import { apiBaseUrl } from 'app/api/baseUrl';
import { Dropdown } from 'primereact/dropdown';

const _empty: tb_nhan_vien = {
    id_tb_nguoi_dung: 0,
    ma_nhan_vien: '',
    ho_ten: "",
    email: "",
    gioi_tinh: null,
    ngay_sinh: new Date(),
    dia_chi: "",
    sdt: "",
    chuc_vu: "",
    avatar: "",
    ghi_chu: "",
};


const Crud_tb_nhan_vien = () => {
    // declare
    const chucVuOptions = [
        { label: 'Quản lý', value: 'Quản lý' },
        { label: 'Nhân viên', value: 'Nhân viên' },
        { label: 'Bảo vệ', value: 'Bảo vệ' },
        { label: 'Tạp vụ', value: 'Tạp vụ' }
    ];

    // state effect
    const route = useRouter();
    const [tb_nhan_viens, set_tb_nhan_viens] = useState<tb_nhan_vien[]>([]);
    const [tb_nhan_vien, set_tb_nhan_vien] = useState<tb_nhan_vien>(_empty);
    const [selected_tb_nhan_viens, setselected_tb_nhan_viens] = useState<tb_nhan_vien[]>([]);
    const [dialogState, setDialogState] = useState({ tb_nhan_vien: false, delete: false, deleteMulti: false });
    const toast = useRef<Toast>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [globalFilter, setGlobalFilter] = useState('');

    useEffect(() => {
        getAll();
    }, []);

    // func
    const getAll = async () => {
        const data = await api_tb_nhan_vien_getAll();
        set_tb_nhan_viens(data);

    };

    const openDialog = (type: 'tb_nhan_vien' | 'delete' | 'deleteMulti', tb_nhan_vienData?: tb_nhan_vien) => {
        if (tb_nhan_vienData) set_tb_nhan_vien(tb_nhan_vienData);
        setDialogState((prev) => ({ ...prev, [type]: true }));
    };

    const closeDialog = (type: 'tb_nhan_vien' | 'delete' | 'deleteMulti') => {
        setDialogState((prev) => ({ ...prev, [type]: false }));
        if (type === 'tb_nhan_vien') set_tb_nhan_vien(_empty);
    };

    const save_tb_nhan_vien = async () => {
        console.log('start')

        if (!tb_nhan_vien.ho_ten.trim()) return;

        const formattedDate =
            tb_nhan_vien.ngay_sinh instanceof Date
                ? tb_nhan_vien.ngay_sinh.toISOString().split("T")[0]
                : tb_nhan_vien.ngay_sinh;

        const updated_tb_nhan_vien = { ...tb_nhan_vien, ngay_sinh: formattedDate };
        let newtb_nhan_viens = [...tb_nhan_viens];


        console.log('dang chay')
        if (tb_nhan_vien.id_tb_nguoi_dung) {
            console.log('dang sua')
            await api_tb_nhan_vien_update(updated_tb_nhan_vien);
            newtb_nhan_viens = newtb_nhan_viens.map((p) => (p.id_tb_nguoi_dung === tb_nhan_vien.id_tb_nguoi_dung ? updated_tb_nhan_vien : p));
            toast.current?.show({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Thông tin nhân viên đã được cập nhật!', life: 3000 });
        } else {
            console.log('dang them')
            const newtb_nhan_vien = await api_tb_nhan_vien_add(updated_tb_nhan_vien);
            newtb_nhan_viens.push(newtb_nhan_vien);
            toast.current?.show({ severity: 'success', summary: 'Thêm thành công', detail: 'Thông tin nhân viên mới đã được thêm!', life: 3000 });
        }

        set_tb_nhan_viens(newtb_nhan_viens);
        closeDialog('tb_nhan_vien');
    };

    const delete_tb_nhan_vien = async () => {
        await api_tb_nhan_vien_delete(tb_nhan_vien.id_tb_nguoi_dung);
        set_tb_nhan_viens(tb_nhan_viens.filter((p) => p.id_tb_nguoi_dung !== tb_nhan_vien.id_tb_nguoi_dung));
        toast.current?.show({ severity: 'success', summary: 'Xóa thành công', detail: `nhân viên ${tb_nhan_vien.ho_ten} đã bị xóa`, life: 3000 });
        closeDialog('delete');
    };

    const nhanVienDetail = (id_nv: Number) => {
        route.push(`/dashboard/ql-nhan-vien/${id_nv}`);
    }

    //  component
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0 text-2xl">Danh sách nhân viên</h2>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    return (
        <div className='grid crud-demo'>
            <div className='col-12'>
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar className='mb-4' left={() => (
                        <>
                            <Button label='Làm mới' icon='pi pi-refresh' onClick={() => getAll()} className='mr-2' />
                            <Button label='Thêm mới' icon='pi pi-plus' onClick={() => openDialog('tb_nhan_vien')} className='mr-2 bg-green-400 border-0' />
                        </>
                    )} />

                    <DataTable
                        header={header}
                        value={tb_nhan_viens}
                        selectionMode='multiple'
                        selection={selected_tb_nhan_viens}
                        onSelectionChange={(e) => setselected_tb_nhan_viens(e.value)}
                        dataKey='id_tb_nguoi_dung'
                        paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        globalFilter={globalFilter}
                        emptyMessage='Không có nhân viên nào.'
                        responsiveLayout='scroll'
                    >
                        <Column header='STT' body={(rowData, { rowIndex }) => {
                            return (
                                <>
                                    {rowIndex + 1}
                                </>
                            );
                        }} />
                        <Column header="Avatar" body={(rowData) => (
                            <Avatar image={rowData.avatar ? `${apiBaseUrl}/uploads/avatar/${rowData.avatar}` : '/custom/default-avatar.png'} shape="circle" size="xlarge" />
                        )} />
                        <Column field='ma_nhan_vien' header='Mã nhân viên' sortable />
                        <Column field='ho_ten' header='Họ và tên' sortable />
                        <Column field='email' header='Email' sortable />
                        {/* <Column field='ngay_sinh' header='Ngày sinh' sortable
                            body={(rowData) => new Date(rowData.ngay_sinh).toLocaleDateString('vi-VN')} /> */}
                        <Column field='sdt' header='Số điện thoại' sortable />
                        <Column field='ghi_chu' header='Ghi chú' sortable />
                        <Column
                            header='Hành động'
                            body={(rowData) => (
                                <>
                                    <Button icon='pi pi-info' className='p-button-rounded p-button-primary mr-2' onClick={() => nhanVienDetail(rowData.id_tb_nguoi_dung)} />
                                    <Button icon='pi pi-pencil' className='p-button-rounded p-button-success p-mr-2' onClick={() => openDialog('tb_nhan_vien', rowData)} />
                                    <Button icon='pi pi-trash' className='p-button-rounded p-button-warning' onClick={() => openDialog('delete', rowData)} />
                                </>
                            )}
                        />
                    </DataTable>

                    <Dialog
                        visible={dialogState.tb_nhan_vien}
                        header='Thông tin nhân viên'
                        modal
                        footer={
                            <Button label='Lưu' icon='pi pi-check' onClick={() => save_tb_nhan_vien()} />
                        }
                        onHide={() => closeDialog('tb_nhan_vien')}
                    >
                        <div className='field flex flex-column gap-1'>
                            <label htmlFor='ma_nhan_vien'>Mã nhân viên</label>
                            <InputText id='ma_nhan_vien' value={tb_nhan_vien.ma_nhan_vien} onChange={(e) => set_tb_nhan_vien({ ...tb_nhan_vien, ma_nhan_vien: e.target.value })} />
                        </div>

                        <div className='field flex flex-column gap-1'>
                            <label htmlFor='ho_ten'>Họ và tên</label>
                            <InputText id='ho_ten' value={tb_nhan_vien.ho_ten} onChange={(e) => set_tb_nhan_vien({ ...tb_nhan_vien, ho_ten: e.target.value })} />
                        </div>

                        <div className="flex gap-1">
                            <div className='field flex flex-column gap-1'>
                                <label htmlFor='ngay_sinh'>Ngày sinh</label>
                                <Calendar id='ngay_sinh'
                                    value={new Date(tb_nhan_vien.ngay_sinh)}
                                    onChange={(e) => set_tb_nhan_vien({ ...tb_nhan_vien, ngay_sinh: e.value })}
                                    dateFormat="yy-mm-dd" />
                            </div>
                            <div className='field flex flex-column gap-1'>
                                <label htmlFor='sdt'>Số điện thoại</label>
                                <InputText id='sdt' value={tb_nhan_vien.sdt} onChange={(e) => set_tb_nhan_vien({ ...tb_nhan_vien, sdt: e.target.value })} />
                            </div>
                        </div>

                        <div className='field flex flex-column gap-1'>
                            <label htmlFor='email'>Email</label>
                            <InputText id='email' value={tb_nhan_vien.email} onChange={(e) => set_tb_nhan_vien({ ...tb_nhan_vien, email: e.target.value })} />
                        </div>

                        <div className='field flex flex-column gap-1'>
                            <label htmlFor='dia_chi'>Địa chỉ</label>
                            <InputText id='dia_chi' value={tb_nhan_vien.dia_chi} onChange={(e) => set_tb_nhan_vien({ ...tb_nhan_vien, dia_chi: e.target.value })} />
                        </div>

                        <div className='field flex flex-column gap-1'>
                            <label htmlFor='chuc_vu'>Chức vụ</label>
                            <Dropdown id='chuc_vu'
                                value={tb_nhan_vien.chuc_vu}
                                options={chucVuOptions}
                                onChange={(e) => set_tb_nhan_vien({ ...tb_nhan_vien, chuc_vu: e.value })}
                                placeholder='Chọn chức vụ'
                            />
                        </div>

                        <div className='field flex flex-column gap-1'>
                            <label htmlFor='ghi_chu'>Ghi chú</label>
                            <InputText id='ghi_chu' value={tb_nhan_vien.ghi_chu} onChange={(e) => set_tb_nhan_vien({ ...tb_nhan_vien, ghi_chu: e.target.value })} />
                        </div>
                    </Dialog>

                    <Dialog
                        visible={dialogState.delete}
                        header='Xác nhận'
                        modal
                        footer={
                            <Button label='Xóa' icon='pi pi-check' onClick={delete_tb_nhan_vien} />
                        }
                        onHide={() => closeDialog('delete')}>
                        <span>Bạn có chắc chắn muốn xóa nhân viên này ?</span>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud_tb_nhan_vien;