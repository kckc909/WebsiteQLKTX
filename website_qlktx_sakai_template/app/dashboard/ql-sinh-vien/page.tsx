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
import { tb_sinh_vien } from '../../../types/custom';
import { api_tb_sinh_vien_add, api_tb_sinh_vien_delete, api_tb_sinh_vien_getAll, api_tb_sinh_vien_update } from '../../api/dashboard/api_tb_sinh_vien';
import { Calendar } from 'primereact/calendar';
import { Avatar } from 'primereact/avatar';
import { FileUpload, FileUploadFilesEvent } from 'primereact/fileupload';
import { apiBaseUrl } from 'app/api/baseUrl';
import { post_avatar, put_avatar } from 'app/api/dashboard/api_upload';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import FunctionTitle from '@components/function_title';

const _empty: tb_sinh_vien = {
    id_tb_nguoi_dung: 0,
    ma_sinh_vien: "",
    ho_ten: "",
    email: "",
    ngay_sinh: new Date(),
    dia_chi: "",
    sdt: "",
    ghi_chu: "",
    avatar: "",
    gioi_tinh: "",
    quoc_tich: "",
    dan_toc: '',
    ton_giao: '',
    nganh_hoc: '',
    chuyen_nganh: ' ',
    nien_khoa: '',
    khoa_hoc: ''
};
const optionGioiTinh = [
    { value: '0', label: 'Nữ' },
    { value: '1', label: 'Nam' },
    { value: '2', label: 'Khác' }
]
const Crud_tb_sinh_vien = () => {
    const route = useRouter();
    let rowIndex = 1;

    // state effect
    const [tb_sinh_viens, set_tb_sinh_viens] = useState<tb_sinh_vien[]>([]);
    const [tb_sinh_vien, set_tb_sinh_vien] = useState<tb_sinh_vien>(_empty);
    const [selected_tb_sinh_viens, set_Selected_tb_sinh_viens] = useState<tb_sinh_vien[]>([]);
    const [dialogState, setDialogState] = useState({ tb_sinh_vien: false, delete: false, deleteMulti: false });
    const toast = useRef<Toast>(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [previewUrl, setPreviewUrl] = useState<string | null>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        getAll();
    }, []);

    // func 
    const getAll = async () => {
        const data = await api_tb_sinh_vien_getAll();
        set_tb_sinh_viens(data);
    };

    const openDialog = (type: 'tb_sinh_vien' | 'delete' | 'deleteMulti', tb_sinh_vienData?: tb_sinh_vien) => {
        if (tb_sinh_vienData) {
            setPreviewUrl(`${apiBaseUrl}/uploads/avatar/${tb_sinh_vienData.avatar}`);
            set_tb_sinh_vien(tb_sinh_vienData);
        }
        setDialogState((prev) => ({ ...prev, [type]: true }));
    };

    const closeDialog = (type: 'tb_sinh_vien' | 'delete' | 'deleteMulti') => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setDialogState((prev) => ({ ...prev, [type]: false }));
        if (type === 'tb_sinh_vien') set_tb_sinh_vien(_empty);
    };

    async function save_tb_sinh_vien() {
        let newErrors: { [key: string]: string } = {};

        if (!tb_sinh_vien.ho_ten.trim()) {
            newErrors.ho_ten = "Họ tên không được để trống.";
        }

        if (!tb_sinh_vien.ma_sinh_vien.trim()) {
            newErrors.ma_sinh_vien = "Mã sinh viên không được để trống.";
        }

        if (!/^\d+$/.test(tb_sinh_vien.sdt)) {
            newErrors.sdt = "Số điện thoại phải là số.";
        }

        if (!/^\S+@\S+\.\S+$/.test(tb_sinh_vien.email)) {
            newErrors.email = "Email không hợp lệ.";
        }

        const today = new Date().toISOString().split("T")[0];
        const formattedDate =
            tb_sinh_vien.ngay_sinh instanceof Date
                ? tb_sinh_vien.ngay_sinh.toISOString().split("T")[0]
                : new Date(tb_sinh_vien.ngay_sinh).toISOString().split("T")[0];

        if (formattedDate >= today) {
            newErrors.ngay_sinh = "Ngày sinh không hợp lệ.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        let updated_tb_sinh_vien = { ...tb_sinh_vien, ngay_sinh: formattedDate };
        let new_tb_sinh_viens = [...tb_sinh_viens];

        // update
        if (updated_tb_sinh_vien.id_tb_nguoi_dung && updated_tb_sinh_vien.id_tb_nguoi_dung != 0) {
            if (selectedFile && updated_tb_sinh_vien.avatar && updated_tb_sinh_vien.avatar.trim() != '') {
                const resAvatar = await put_avatar(updated_tb_sinh_vien.avatar, selectedFile);
                updated_tb_sinh_vien.avatar = resAvatar.data.filename
            }
            else if (selectedFile) {
                const resAvatar = await post_avatar(selectedFile);
                updated_tb_sinh_vien.avatar = resAvatar.data.filename
            }

            await api_tb_sinh_vien_update(updated_tb_sinh_vien);

            new_tb_sinh_viens = new_tb_sinh_viens.map((p) =>
                p.id_tb_nguoi_dung === updated_tb_sinh_vien.id_tb_nguoi_dung ? updated_tb_sinh_vien : p
            );

            toast.current?.show({
                severity: "success",
                summary: "Cập nhật thành công",
                detail: "Thông tin sinh viên đã được cập nhật",
                life: 3000,
            });
        }
        // add
        else {
            if (selectedFile) {
                const resAvatar = await post_avatar(selectedFile);
                updated_tb_sinh_vien.avatar = resAvatar.data.filename
            }
            await api_tb_sinh_vien_add(updated_tb_sinh_vien);

            toast.current?.show({
                severity: "success",
                summary: "Thêm thành công",
                detail: "Sinh viên mới đã được thêm!",
                life: 3000,
            });
        }

        set_tb_sinh_viens(new_tb_sinh_viens);
        set_tb_sinh_vien(_empty);
        closeDialog('tb_sinh_vien');
    }

    const delete_tb_sinh_vien = async () => {
        await api_tb_sinh_vien_delete(tb_sinh_vien.id_tb_nguoi_dung);
        set_tb_sinh_viens(tb_sinh_viens.filter((p) => p.id_tb_nguoi_dung !== tb_sinh_vien.id_tb_nguoi_dung));
        toast.current?.show({ severity: 'success', summary: 'Xóa thành công', detail: `sinh viên  ${tb_sinh_vien.ho_ten} đã bị xóa`, life: 3000 });
        closeDialog('delete');
    };

    const handleUpload = async (event: FileUploadFilesEvent) => {
        const file = event.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setSelectedFile(file);
            console.log(file)
        }
    };

    const sinhVienDetails = (id_sv: number) => {
        route.push(`/dashboard/ql-sinh-vien/${id_sv}`);
    }

    // component
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0 text-2xl">Danh sách sinh viên</h2>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    return (

        <div className='grid crud-demo'>
            <FunctionTitle title="Quản lý sinh viên" />
            <div className='col-12'>
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar className='mb-4' left={() => (
                        <>
                            <Button label='Làm mới' icon='pi pi-refresh' onClick={() => getAll()} className='mr-2' />
                            <Button label='Thêm mới' icon='pi pi-plus' onClick={() => openDialog('tb_sinh_vien')} className='mr-2 bg-green-400 border-0' />
                        </>
                    )} />

                    <DataTable
                        header={header}
                        value={tb_sinh_viens}
                        selectionMode='multiple'
                        selection={selected_tb_sinh_viens}
                        onSelectionChange={(e) => set_Selected_tb_sinh_viens(e.value)}
                        dataKey='id_tb_nguoi_dung'
                        paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        globalFilter={globalFilter}
                        emptyMessage='Không có sinh viên  nào.'
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
                        <Column field='ma_sinh_vien' header='Mã sinh viên' sortable />
                        <Column field='ho_ten' header='Họ và tên' sortable />
                        <Column field='email' header='Email' sortable />
                        {/* <Column field='ngay_sinh' header='Ngày sinh' sortable
                            body={(rowData) => new Date(rowData.ngay_sinh).toLocaleDateString('vi-VN')}
                        /> */}
                        <Column field='sdt' header='Số điện thoại' sortable />
                        <Column field='ghi_chu' header='Ghi chú' sortable />
                        <Column
                            header='Hành động'
                            body={(rowData) => (
                                <>
                                    <Button icon='pi pi-info' className='p-button-rounded p-button-primary mr-2' onClick={() => sinhVienDetails(rowData.id_tb_nguoi_dung)} />
                                    <Button icon='pi pi-pencil' className='p-button-rounded p-button-success mr-2' onClick={() => openDialog('tb_sinh_vien', rowData)} />
                                    <Button icon='pi pi-trash' className='p-button-rounded p-button-warning' onClick={() => openDialog('delete', rowData)} />
                                </>
                            )}
                        />
                    </DataTable>

                    <Dialog visible={dialogState.tb_sinh_vien} header='Thông tin sinh viên ' modal footer={<Button label='Lưu' icon='pi pi-check' onClick={() => save_tb_sinh_vien()} />} onHide={() => closeDialog('tb_sinh_vien')}>
                        <div className="flex flex-col items-center">
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="Avatar"
                                    width={150}
                                    style={{ margin: "10px", borderRadius: "8px" }}
                                />
                            )}
                            <FileUpload
                                name="avatar"
                                accept="image/*"
                                onSelect={handleUpload}
                                chooseLabel="Chọn ảnh"
                                auto
                                mode="basic"
                            />
                        </div>
                        <div className="flex gap-1">
                            <div className='field flex flex-column'>
                                <label htmlFor='ma_sinh_vien'>Mã sinh viên</label>
                                <InputText
                                    id='ma_sinh_vien'
                                    value={tb_sinh_vien.ma_sinh_vien}
                                    onChange={(e) => set_tb_sinh_vien({ ...tb_sinh_vien, ma_sinh_vien: e.target.value })}
                                    placeholder='Nhập mã sinh viên'
                                />
                                {errors.ma_sinh_vien && <small className="p-error">{errors.ma_sinh_vien}</small>}
                            </div>
                            <div className='field flex flex-column '>
                                <label htmlFor='ho_ten'>Họ và tên</label>
                                <InputText
                                    id='ho_ten'
                                    value={tb_sinh_vien.ho_ten}
                                    onChange={(e) => set_tb_sinh_vien({ ...tb_sinh_vien, ho_ten: e.target.value })}
                                    placeholder='Nhập họ và tên sinh viên'
                                />
                                {errors.ho_ten && <small className="p-error">{errors.ho_ten}</small>}
                            </div>
                        </div>
                        <div className="flex grid">
                            <div className='field flex flex-column col'>
                                <label htmlFor='ngay_sinh'>Ngày sinh</label>
                                <Calendar id='ngay_sinh' value={new Date(tb_sinh_vien.ngay_sinh)} onChange={(e) => set_tb_sinh_vien({ ...tb_sinh_vien, ngay_sinh: e.value })} dateFormat="yy-mm-dd" />
                                {errors.ngay_sinh && <small className="p-error">{errors.ngay_sinh}</small>}
                            </div>
                            <div className='field flex flex-column col'>
                                <label htmlFor='gioi_tinh'>Giới tính</label>
                                <Dropdown
                                    id='gioi_tinh'
                                    value={tb_sinh_vien.gioi_tinh}
                                    options={optionGioiTinh}
                                    onChange={(e) => set_tb_sinh_vien({ ...tb_sinh_vien, gioi_tinh: e.value })}
                                    placeholder='Chọn giới tính'
                                />
                                {errors.gioi_tinh && <small className="p-error">{errors.gioi_tinh}</small>}
                            </div>
                        </div>
                        <div className='field flex flex-column'>
                            <label htmlFor='sdt'>Số điện thoại</label>
                            <InputText
                                id='sdt'
                                value={tb_sinh_vien.sdt}
                                onChange={(e) => set_tb_sinh_vien({ ...tb_sinh_vien, sdt: e.target.value })}
                                placeholder='Nhập số điện thoại'
                            />
                            {errors.sdt && <small className="p-error">{errors.sdt}</small>}
                        </div>
                        <div className='field flex flex-column'>
                            <label htmlFor='email'>Email</label>
                            <InputText
                                id='email'
                                value={tb_sinh_vien.email}
                                onChange={(e) => set_tb_sinh_vien({ ...tb_sinh_vien, email: e.target.value })}
                                placeholder='Nhập Email'
                            />
                            {errors.email && <small className="p-error">{errors.email}</small>}
                        </div>
                        <div className='field flex flex-column'>
                            <label htmlFor='dia_chi'>Địa chỉ</label>
                            <InputText
                                id='dia_chi'
                                value={tb_sinh_vien.dia_chi}
                                onChange={(e) => set_tb_sinh_vien({ ...tb_sinh_vien, dia_chi: e.target.value })}
                                placeholder='Nhập địa chỉ'
                            />
                        </div>
                        <div className='field flex flex-column'>
                            <label htmlFor='ghi_chu'>Ghi chú</label>
                            <InputText id='ghi_chu' value={tb_sinh_vien.ghi_chu} onChange={(e) => set_tb_sinh_vien({ ...tb_sinh_vien, ghi_chu: e.target.value })}
                                placeholder='Ghi chú'
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={dialogState.delete} header='Xác nhận' modal footer={<Button label='Xóa' icon='pi pi-check' onClick={delete_tb_sinh_vien} />} onHide={() => closeDialog('delete')}>
                        <span>Bạn có chắc chắn muốn xóa sinh viên <b>{tb_sinh_vien.ho_ten}</b>?</span>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud_tb_sinh_vien;