'use client';

import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { api_tb_sinh_vien_getById, api_tb_sinh_vien_update } from 'app/api/dashboard/api_tb_sinh_vien';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { tb_sinh_vien } from '@custom';
import { useParams } from 'next/navigation';
import { FileUpload, FileUploadFilesEvent } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { apiBaseUrl } from 'app/api/baseUrl';
import { Dropdown } from 'primereact/dropdown';
import { Menubar } from 'primereact/menubar';
import { Toolbar } from 'primereact/toolbar';
import { post_avatar, put_avatar } from 'app/api/dashboard/api_upload';

export default function ChiTietSinhVien() {
    const { id } = useParams();
    const [sinhVien, setSinhVien] = useState<tb_sinh_vien | null>(null);
    const [isEdited, setIsEdited] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useRef<Toast>(null);
    const [selectedFile, setSelectedFile] = useState<File>();
    const optionGioiTinh = [
        { value: '0', label: 'Nữ' },
        { value: '1', label: 'Nam' },
        { value: '2', label: 'Khác' }
    ]

    useEffect(() => {
        if (id) {
            api_tb_sinh_vien_getById(Number(id))
                .then((data) => {
                    const svFound = data[0]
                    if (svFound) {
                        svFound.avatar = `${apiBaseUrl}/uploads/avatar/${svFound.avatar}`
                        setSinhVien(svFound);
                    }
                    else {
                        setSinhVien(null);
                    }
                })
        }
    }, [id]);

    const handleChangeTXT = (e: React.ChangeEvent<HTMLInputElement>, field: keyof tb_sinh_vien) => {
        setSinhVien(prev => ({
            ...prev!,
            [field]: e.target.value || "?"
        }));
        setIsEdited(true);
    };

    const handleChangeCalendar = (e: CalendarChangeEvent, field: keyof tb_sinh_vien) => {
        const date = e.value as Date;
        setSinhVien(prev => ({
            ...prev!,
            [field]: date.toISOString().split("T")[0]
        }));
        setIsEdited(true);
    };

    const confirmSave = () => {
        confirmDialog({
            message: 'Bạn có chắc muốn lưu thay đổi không?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: handleSave,
            reject: () => {
                toast.current?.show({ severity: 'info', summary: 'Hủy', detail: 'Không có thay đổi nào được lưu', life: 3000 });
            }
        });
    };

    const handleSave = async () => {
        if (!sinhVien) {
            toast.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không tìm thấy sinh viên', life: 3000 });
            return;
        }

        try {
            let updatedSinhVien = { ...sinhVien };
            updatedSinhVien.ngay_sinh = new Date(updatedSinhVien.ngay_sinh).toISOString().split("T")[0];

            // xử lý file ảnh
            if (selectedFile && updatedSinhVien.avatar && updatedSinhVien.avatar != '') {
                const res = await put_avatar(updatedSinhVien.avatar, selectedFile);
                updatedSinhVien.avatar = res.data.filename;
            } else if (selectedFile) {
                const res = await post_avatar(selectedFile);
                updatedSinhVien.avatar = res.data.filename;
            }

            // lưu thông tin 
            await api_tb_sinh_vien_update(updatedSinhVien);

            setSinhVien(updatedSinhVien);
            toast.current?.show({ severity: 'success', summary: 'Sửa thành công', detail: `Thông tin sinh viên ${sinhVien.ho_ten} đã được cập nhật`, life: 3000 });
            setIsEdited(false);
        }
        catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể lưu thông tin mới của sinh viên', life: 3000 });
        }
    };

    const handleUpload = async (event: FileUploadFilesEvent) => {
        const file = event.files[0];
        if (file) {
            setSinhVien(prev => ({
                ...prev!,
                avatar: URL.createObjectURL(file)
            }));
            setSelectedFile(file);
            setIsEdited(true);
        }
    };

    if (!sinhVien) {
        return <Card className="p-4 text-center"><h2>Không tìm thấy sinh viên</h2></Card>;
    }

    return (
        <Card className="p-4">
            <ConfirmDialog />
            <div className='flex justify-content-between'>
                <div className="flex align-items-center gap-3 flex-column mb-2">
                    <Avatar
                        image={sinhVien.avatar ? sinhVien.avatar : '/default-avatar.png'}
                        shape="circle"
                        style={{ width: '150px', height: '150px' }} />
                    <FileUpload
                        name="avatar"
                        accept="image/*"
                        onSelect={handleUpload}
                        chooseLabel="Chọn ảnh"
                        auto
                        mode="basic"
                    />
                </div>
                <div className="flex flex-column">
                    <Button
                        icon='pi pi-pencil'
                        className='p-button-success mr-2'
                        label="Lưu"
                        disabled={!isEdited}
                        onClick={() => confirmSave()} />
                </div>
            </div>
            <div className="">
                <div className="grid flex">
                    <div className='field flex flex-column col'>
                        <label htmlFor='ma_sinh_vien'>Mã sinh viên</label>
                        <InputText id='ma_sinh_vien' value={sinhVien.ma_sinh_vien} onChange={(e) => handleChangeTXT(e, 'ma_sinh_vien')} />
                        {errors.ma_sinh_vien && <small className="p-error">{errors.ma_sinh_vien}</small>}
                    </div>
                    <div className='field flex flex-column col'>
                        <label htmlFor='ho_ten'>Họ và tên</label>
                        <InputText id='ho_ten' value={sinhVien.ho_ten} onChange={(e) => handleChangeTXT(e, 'ho_ten')} />
                        {errors.ho_ten && <small className="p-error">{errors.ho_ten}</small>}
                    </div>
                    <div className='field flex flex-column col'>
                        <label htmlFor='ngay_sinh'>Ngày sinh</label>
                        <Calendar id='ngay_sinh' value={new Date(sinhVien.ngay_sinh)} onChange={(e) => handleChangeCalendar(e, 'ngay_sinh')} dateFormat="yy-mm-dd" className="w-full" />
                    </div>
                    <div className='field flex flex-column col'>
                        <label htmlFor='gioi_tinh'>Giới tính</label>
                        <Dropdown
                            value={sinhVien.gioi_tinh}
                            onChange={
                                (e) => {
                                    setSinhVien(prev => ({
                                        ...prev!,
                                        gioi_tinh: e.target.value || "?"
                                    }));
                                    setIsEdited(true);
                                }
                            }
                            placeholder='Chọn giới tính'
                            options={optionGioiTinh}
                        />
                    </div>
                </div>
                <div className="grid flex ">
                    <div className='field flex flex-column col-12 md:col-4'>
                        <label htmlFor='quoc_tich'>Quốc tịch</label>
                        <InputText id='quoc_tich' value={sinhVien.quoc_tich} onChange={(e) => handleChangeTXT(e, 'quoc_tich')} className="w-full" />
                    </div>
                    <div className='field flex flex-column col-12 md:col-4'>
                        <label htmlFor='dan-toc'>Dân tộc</label>
                        <InputText id='dan-toc' value={sinhVien.dan_toc} onChange={(e) => handleChangeTXT(e, 'dan_toc')} className="w-full" />
                    </div>
                    <div className='field flex flex-column col-12 md:col-4'>
                        <label htmlFor='ton-giao'>Tôn giáo</label>
                        <InputText id='ton-giao' value={sinhVien.ton_giao} onChange={(e) => handleChangeTXT(e, 'ton_giao')} className="w-full" />
                    </div>
                </div>
                <div className="grid">
                    <div className='field flex flex-column col-12'>
                        <label htmlFor='dia_chi'>Quê quán</label>
                        <InputText id='dia_chi' value={sinhVien.dia_chi} onChange={(e) => handleChangeTXT(e, 'dia_chi')} className="w-full" />
                        {errors.dia_chi && <small className="p-error">{errors.dia_chi}</small>}
                    </div>
                </div>
                <div className="grid flex">
                    <div className="grid flex col-12">
                        <div className='field flex flex-column col'>
                            <label htmlFor='nganh_hoc'>Ngành học</label>
                            <InputText id='nganh_hoc' value={sinhVien.nganh_hoc} onChange={(e) => handleChangeTXT(e, 'nganh_hoc')} className="w-full" />
                            {errors.nganh_hoc && <small className="p-error">{errors.nganh_hoc}</small>}
                        </div>
                        <div className='field flex flex-column col'>
                            <label htmlFor='chuyen_nganh'>Chuyên ngành</label>
                            <InputText id='chuyen_nganh' value={sinhVien.chuyen_nganh} onChange={(e) => handleChangeTXT(e, 'chuyen_nganh')} className="w-full" />
                            {errors.chuyen_nganh && <small className="p-error">{errors.chuyen_nganh}</small>}
                        </div>
                        <div className='field flex flex-column col'>
                            <label htmlFor='nien_khoa'>Niên khóa</label>
                            <InputText id='nien_khoa' value={sinhVien.nien_khoa} onChange={(e) => handleChangeTXT(e, 'nien_khoa')} className="w-full" />
                            {errors.nien_khoa && <small className="p-error">{errors.nien_khoa}</small>}
                        </div>
                        <div className='field flex flex-column col'>
                            <label htmlFor='khoa_hoc'>Khóa học</label>
                            <InputText id='khoa_hoc' value={sinhVien.khoa_hoc} onChange={(e) => handleChangeTXT(e, 'khoa_hoc')} className="w-full" />
                            {errors.khoa_hoc && <small className="p-error">{errors.khoa_hoc}</small>}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
