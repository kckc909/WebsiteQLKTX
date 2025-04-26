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
import {tb_bai_dang} from '../../../types/custom';
import { api_tb_bai_dang_add, api_tb_bai_dang_delete, api_tb_bai_dang_getAll, api_tb_bai_dang_update } from '../../api/dashboard/ql_tb_bai_dang';

const _empty: tb_bai_dang = {
    id_tb_bai_dang: 0,
    id_tb_nguoi_dung: 0,
    tieu_de: "",
    noi_dung: NULL,
    ngay_dang: NULL,
    luot_xem: 0,
};
const Crud_tb_bai_dang = () => {
    const [tb_bai_dangs, set_tb_bai_dangs] = useState<tb_bai_dang[]>([]);
    const [tb_bai_dang, set_tb_bai_dang] = useState<tb_bai_dang>(_empty);
    const [selected_tb_bai_dangs, setselected_tb_bai_dangs] = useState<tb_bai_dang[]>([]);
    const [dialogState, setDialogState] = useState({ tb_bai_dang: false, delete: false, deleteMulti: false });
    const toast = useRef<Toast>(null);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const data = await api_tb_bai_dang_getAll();
        set_tb_bai_dangs(data);
    };

    const openDialog = (type: 'tb_bai_dang' | 'delete' | 'deleteMulti', tb_bai_dangData?: tb_bai_dang) => {
        if (tb_bai_dangData) set_tb_bai_dang(tb_bai_dangData);
        setDialogState((prev) => ({ ...prev, [type]: true }));
    };

    const closeDialog = (type: 'tb_bai_dang' | 'delete' | 'deleteMulti') => {
        setDialogState((prev) => ({ ...prev, [type]: false }));
        if (type === 'tb_bai_dang') set_tb_bai_dang(_empty);
    };

    const save_tb_bai_dang = async () => {
        if (!tb_bai_dang.ten_tb_bai_dang.trim()) return;

        const updated_tb_bai_dang = { ...tb_bai_dang};
        let newtb_bai_dangs = [...tb_bai_dangs];

        if (tb_bai_dang.id_tb_bai_dang) {
            await api_tb_bai_dang_update(updated_tb_bai_dang);
            newtb_bai_dangs = newtb_bai_dangs.map((p) => (p.id_tb_bai_dang === tb_bai_dang.id_tb_bai_dang ? updated_tb_bai_dang : p));
            toast.current?.show({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Thông tin ___ đã được cập nhật', life: 3000 });
        } else {
            const newtb_bai_dang = await api_tb_bai_dang_add(updated_tb_bai_dang);
            newtb_bai_dangs.push(newtb_bai_dang);
            toast.current?.show({ severity: 'success', summary: 'Thêm thành công', detail: '___ mới đã được thêm', life: 3000 });
        }

        set_tb_bai_dangs(newtb_bai_dangs);
        closeDialog('tb_bai_dang');
    };

    const delete_tb_bai_dang = async () => {
        await api_tb_bai_dang_delete(tb_bai_dang.id_tb_bai_dang);
        set_tb_bai_dangs(tb_bai_dangs.filter((p) => p.id_tb_bai_dang !== tb_bai_dang.id_tb_bai_dang));
        toast.current?.show({ severity: 'success', summary: 'Xóa thành công', detail: `___ ${tb_bai_dang.ten_tb_bai_dang} đã bị xóa`, life: 3000 });
        closeDialog('delete');
    };

    const deleteselected_tb_bai_dangs = async () => {
        await Promise.all(selected_tb_bai_dangs.map((p) => api_tb_bai_dang_delete(p.id_tb_bai_dang)));
        set_tb_bai_dangs(tb_bai_dangs.filter((p) => !selected_tb_bai_dangs.includes(p)));
        setselected_tb_bai_dangs([]);
        toast.current?.show({ severity: 'success', summary: 'Xóa thành công', detail: 'Đã xóa các ___ được chọn', life: 3000 });
        closeDialog('deleteMulti');
    };

    return (
        <div className='grid crud-demo'>
            <div className='col-12'>
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar className='mb-4' left={() => (
                        <>
                            <Button label='Làm mới' icon='pi pi-refresh' onClick={() => getAll()} className='mr-2' />
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
                        globalFilter=''
                        emptyMessage='Không có ___ nào.'
                        responsiveLayout='scroll'
                    >
                        <Column field='id_tb_bai_dang' header='id_tb_bai_dang' sortable />
                        <Column field='id_tb_nguoi_dung' header='id_tb_nguoi_dung' sortable />
                        <Column field='tieu_de' header='tieu_de' sortable />
                        <Column field='noi_dung' header='noi_dung' sortable />
                        <Column field='ngay_dang' header='ngay_dang' sortable />
                        <Column field='luot_xem' header='luot_xem' sortable />
                        <Column
                            header='Hành động'
                            body={(rowData) => (
                                <>
                                    <Button icon='pi pi-pencil' className='p-button-rounded p-button-success p-mr-2' onClick={() => openDialog('tb_bai_dang', rowData)} />
                                    <Button icon='pi pi-trash' className='p-button-rounded p-button-warning' onClick={() => openDialog('delete', rowData)} />
                                </>
                            )}
                        />
                    </DataTable>

                    <Dialog visible={dialogState.tb_bai_dang} header='Thông tin ___' modal footer={<Button label='Lưu' icon='pi pi-check' onClick={save_tb_bai_dang} />} onHide={() => closeDialog('tb_bai_dang')}>
                        <div className='field'>
                            <label htmlFor='so_luong'></label>
                            <InputNumber id='id_tb_bai_dang' value=tb_bai_dang.id_tb_bai_dang onValueChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, id_tb_bai_dang: e.value || 0 })} />
                        </div>
                        <div className='field'>
                            <label htmlFor='so_luong'></label>
                            <InputNumber id='id_tb_nguoi_dung' value=tb_bai_dang.id_tb_nguoi_dung onValueChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, id_tb_nguoi_dung: e.value || 0 })} />
                        </div>
                        <div className='field'>
                            <label htmlFor='tieu_de'>tieu_de</label>
                            <InputText id='tieu_de' value={tb_bai_dang.tieu_de} onChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, tieu_de: e.target.value })} />
                        </div>
                        <div className='field'>
                            <label htmlFor='noi_dung'>noi_dung</label>
                            <InputText id='noi_dung' value={tb_bai_dang.noi_dung} onChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, noi_dung: e.target.value })} />
                        </div>
                        <div className='field'>
                            <label htmlFor='ngay_dang'>ngay_dang</label>
                            <InputText id='ngay_dang' value={tb_bai_dang.ngay_dang} onChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, ngay_dang: e.target.value })} />
                        </div>
                        <div className='field'>
                            <label htmlFor='so_luong'></label>
                            <InputNumber id='luot_xem' value=tb_bai_dang.luot_xem onValueChange={(e) => set_tb_bai_dang({ ...tb_bai_dang, luot_xem: e.value || 0 })} />
                        </div>
                    </Dialog>

                    <Dialog visible={dialogState.delete} header='Xác nhận' modal footer={<Button label='Xóa' icon='pi pi-check' onClick={delete_tb_bai_dang} />} onHide={() => closeDialog('delete')}>
                        <span>Bạn có chắc chắn muốn xóa ___ ?</span>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud_tb_bai_dang;