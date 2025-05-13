'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { tb_bai_dang } from '../../../types/custom';
import { api_tb_bai_dang_add, api_tb_bai_dang_delete, api_tb_bai_dang_getAll, api_tb_bai_dang_update } from '../../api/dashboard/api_tb_bai_dang';

const _empty: Partial<tb_bai_dang> = {
    id_tb_bai_dang: 0,
    id_tb_nguoi_dung: 0,
    tieu_de: '',
    noi_dung: '',
    ngay_dang: new Date(),
    luot_xem: 0,
    trang_thai: 1 // 1: Hiển thị, 0: Ẩn
};

const Crud_tb_bai_dang = () => {
    const [tb_bai_dangs, set_tb_bai_dangs] = useState<tb_bai_dang[]>([]);
    const [tb_bai_dang, set_tb_bai_dang] = useState<Partial<tb_bai_dang>>(_empty);
    const [selected_tb_bai_dangs, setselected_tb_bai_dangs] = useState<tb_bai_dang[]>([]);
    const [dialogState, setDialogState] = useState({ tb_bai_dang: false, delete: false });
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const data = await api_tb_bai_dang_getAll();
        set_tb_bai_dangs(data);
    };

    const openDialog = (type: 'tb_bai_dang' | 'delete', tb_bai_dangData?: tb_bai_dang) => {
        if (tb_bai_dangData) set_tb_bai_dang(tb_bai_dangData);
        else set_tb_bai_dang(_empty);
        setDialogState((prev) => ({ ...prev, [type]: true }));
    };

    const closeDialog = (type: 'tb_bai_dang' | 'delete') => {
        setDialogState((prev) => ({ ...prev, [type]: false }));
        if (type === 'tb_bai_dang') set_tb_bai_dang(_empty);
    };

    const save_tb_bai_dang = async () => {
        if (!tb_bai_dang.tieu_de) return;

        if (tb_bai_dang.id_tb_bai_dang) {
            await api_tb_bai_dang_update(tb_bai_dang);
            toast.current?.show({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Bài đăng đã được cập nhật', life: 3000 });
        } else {
            await api_tb_bai_dang_add(tb_bai_dang);
            toast.current?.show({ severity: 'success', summary: 'Thêm thành công', detail: 'Bài đăng mới đã được thêm', life: 3000 });
        }

        await getAll();
        closeDialog('tb_bai_dang');
    };

    const delete_tb_bai_dang = async () => {
        await api_tb_bai_dang_delete(tb_bai_dang.id_tb_bai_dang!);
        toast.current?.show({ severity: 'success', summary: 'Xóa thành công', detail: `Bài đăng đã bị xóa`, life: 3000 });
        await getAll();
        closeDialog('delete');
    };

    const trangThaiTemplate = (rowData: tb_bai_dang) => rowData.trang_thai ? 'Hiển thị' : 'Ẩn';

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0 text-2xl">Danh sách bài đăng</h2>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    )

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <Card title="Tổng số bài đăng">
                    <p className="text-xl font-bold">{0}</p>
                </Card>
                <Card title="Các bài đăng đang hiện thị">
                    <p className="text-2xl font-bold text-green-600">{0}</p>
                </Card>
                <Card title="Các bài đăng đã ẩn">
                    <p className="text-2xl font-bold text-red-600">{0}</p>
                </Card>
                <Card title="Các bài đăng trong tháng">
                    <p className="text-2xl font-bold text-blue-600">{0}</p>
                </Card>
            </div>
            <div className='grid crud-demo'>
                <div className='col-12'>
                    <div className='card'>
                        <Toast ref={toast} />
                        <Toolbar className='mb-4' left={() => (
                            <>
                                <Button label='Làm mới' icon='pi pi-refresh' onClick={getAll} className='mr-2' />
                                <Button label='Thêm mới' icon='pi pi-plus' onClick={() => openDialog('tb_bai_dang')} className='mr-2 bg-green-400 border-0' />
                            </>
                        )} />

                        <DataTable
                            value={tb_bai_dangs}
                            selectionMode='multiple'
                            selection={selected_tb_bai_dangs}
                            onSelectionChange={(e) => setselected_tb_bai_dangs(e.value)}
                            dataKey='id_tb_bai_dang'
                            paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                            emptyMessage='Không có bài đăng nào.'
                            responsiveLayout='scroll'
                            globalFilter={globalFilter}
                            header={header}
                        >
                            <Column field='id_tb_bai_dang' header='Mã bài đăng' sortable />
                            <Column field='tieu_de' header='Tiêu đề' sortable />
                            <Column field='ngay_dang' header='Ngày đăng' sortable body={(row) => new Date(row.ngay_dang).toLocaleDateString()} />
                            <Column field='id_tb_nguoi_dung' header='Người đăng' sortable />
                            <Column field='luot_xem' header='Lượt xem' sortable />
                            <Column header='Trạng thái' body={trangThaiTemplate} sortable />
                            <Column header='Hành động' body={(rowData) => (
                                <>
                                    <Button icon='pi pi-pencil' className='p-button-rounded p-button-success p-mr-2' onClick={() => openDialog('tb_bai_dang', rowData)} />
                                    <Button icon='pi pi-trash' className='p-button-rounded p-button-warning' onClick={() => openDialog('delete', rowData)} />
                                </>
                            )} />
                        </DataTable>

                        <Dialog visible={dialogState.tb_bai_dang} header='Thông tin bài đăng' modal footer={<Button label='Lưu' icon='pi pi-check' onClick={save_tb_bai_dang} />} onHide={() => closeDialog('tb_bai_dang')}>
                            <div className='field'>
                                <label htmlFor='tieu_de'>Tiêu đề</label>
                                <InputText id='tieu_de' value={tb_bai_dang.tieu_de} onChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, tieu_de: e.target.value })} />
                            </div>
                            <div className='field'>
                                <label htmlFor='noi_dung'>Nội dung</label>
                                <InputText id='noi_dung' value={tb_bai_dang.noi_dung} onChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, noi_dung: e.target.value })} />
                            </div>
                            <div className='field'>
                                <label htmlFor='id_tb_nguoi_dung'>Người đăng (ID)</label>
                                <InputNumber id='id_tb_nguoi_dung' value={tb_bai_dang.id_tb_nguoi_dung} onValueChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, id_tb_nguoi_dung: e.value || 0 })} />
                            </div>
                            <div className='field'>
                                <label htmlFor='ngay_dang'>Ngày đăng</label>
                                <InputText id='ngay_dang' value={new Date(tb_bai_dang.ngay_dang!).toLocaleDateString()} disabled />
                            </div>
                            <div className='field'>
                                <label htmlFor='luot_xem'>Lượt xem</label>
                                <InputNumber id='luot_xem' value={tb_bai_dang.luot_xem} onValueChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, luot_xem: e.value || 0 })} />
                            </div>
                            <div className='field'>
                                <label htmlFor='trang_thai'>Trạng thái</label>
                                <Dropdown id='trang_thai' value={tb_bai_dang.trang_thai} options={[{ label: 'Hiển thị', value: 1 }, { label: 'Ẩn', value: 0 }]} onChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, trang_thai: e.value })} />
                            </div>
                        </Dialog>

                        <Dialog visible={dialogState.delete} header='Xác nhận' modal footer={<Button label='Xóa' icon='pi pi-check' onClick={delete_tb_bai_dang} />} onHide={() => closeDialog('delete')}>
                            <span>Bạn có chắc chắn muốn xóa bài đăng này?</span>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Crud_tb_bai_dang;
