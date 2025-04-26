'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { api_tb_nhan_vien_getById, api_tb_nhan_vien_update } from 'app/api/dashboard/api_tb_nhan_vien';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { tb_nhan_vien } from '@custom';
import { FileUpload, FileUploadFilesEvent } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { apiBaseUrl } from 'app/api/baseUrl';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

export default function ChiTietNhanVien() {
    const { id } = useParams();
    const [nhanVien, setNhanVien] = useState<tb_nhan_vien | null>(null);
    const [isEdited, setIsEdited] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useRef<Toast>(null);
    const [selectedFile, setSelectedFile] = useState<File>();
    const optionGioiTinh = [
        { value: '0', label: 'Nữ' },
        { value: '1', label: 'Nam' },
        { value: '2', label: 'Khác' }
    ];

    useEffect(() => {
        if (id) {
            api_tb_nhan_vien_getById(Number(id))
                .then((data) => {
                    const nvFound = data[0];
                    if (nvFound) {
                        nvFound.avatar = `${apiBaseUrl}/uploads/avatar/${nvFound.id_tb_nguoi_dung}.png`;
                        setNhanVien(nvFound);
                    } else {
                        setNhanVien(null);
                    }
                });
        }
    }, [id]);

    const handleChangeTXT = (e: React.ChangeEvent<HTMLInputElement>, field: keyof tb_nhan_vien) => {
        setNhanVien(prev => ({
            ...prev!,
            [field]: e.target.value || "?"
        }));
        setIsEdited(true);
    };

    const handleChangeCalendar = (e: CalendarChangeEvent, field: keyof tb_nhan_vien) => {
        const date = e.value as Date;
        setNhanVien(prev => ({
            ...prev!,
            [field]: date.toISOString().split("T")[0]
        }));
        setIsEdited(true);
    };

    const handleUpload = async (event: FileUploadFilesEvent) => {
        const file = event.files[0];
        if (file) {
            setNhanVien(prev => ({
                ...prev!,
                avatar: URL.createObjectURL(file)
            }));
            setSelectedFile(file);
            setIsEdited(true);
        }
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
        if (!nhanVien) {
            toast.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không tìm thấy nhân viên', life: 3000 });
            return;
        }

        try {
            const updatedNhanVien = { ...nhanVien };

            updatedNhanVien.ngay_sinh = new Date(updatedNhanVien.ngay_sinh).toISOString().split("T")[0];
            await api_tb_nhan_vien_update(updatedNhanVien);

            if (selectedFile) {
                const formData = new FormData();
                formData.append('avatar', selectedFile);
                formData.append('id', nhanVien.id_tb_nguoi_dung.toString());
                await fetch(`${apiBaseUrl}/uploads/avatar`, { method: 'POST', body: formData });
            }

            toast.current?.show({ severity: 'success', summary: 'Sửa thành công', detail: `Thông tin nhân viên ${nhanVien.ho_ten} đã được cập nhật`, life: 3000 });
            setIsEdited(false);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể lưu thông tin mới của nhân viên', life: 3000 });
        }
    };

    if (!nhanVien) {
        return <Card className="p-4 text-center"><h2>Không tìm thấy nhân viên</h2></Card>;
    }

    return (
        <Card className="p-4">
            <ConfirmDialog />
            <div className='flex justify-content-between'>
                <div className="flex align-items-center gap-3 flex-column mb-2">
                    <Avatar
                        image={nhanVien.avatar || '/custom/default-avatar.png'}
                        shape="circle"
                        style={{ width: '150px', height: '150px' }} />
                    <FileUpload
                        name="avatar"
                        accept="image/*"
                        onSelect={handleUpload}
                        chooseLabel="Chọn ảnh"
                        auto
                        mode="basic" />
                </div>
                <div>
                    <Button icon='pi pi-pencil' className='p-button-success' label="Lưu" disabled={!isEdited} onClick={() => confirmSave()} />
                </div>
            </div>
            <div className="grid flex">
                <div className="flex flex-column col">
                    <label htmlFor="ma_nhan_vien">Mã nhân viên</label>
                    <InputText id='ma_nhan_vien' value={String(nhanVien.ma_nhan_vien)} onChange={(e) => handleChangeTXT(e, 'ma_nhan_vien')} placeholder="Mã nhân viên" />
                </div>
                <div className="flex flex-column col">
                    <label htmlFor="ho_ten">Họ tên</label>
                    <InputText id='ho_ten' value={nhanVien.ho_ten} onChange={(e) => handleChangeTXT(e, 'ho_ten')} placeholder="Họ và tên" />
                </div>
                <div className="flex flex-column col">
                    <label htmlFor="ngay_sinh">Ngày sinh</label>
                    <Calendar id='ngay_sinh' value={new Date(nhanVien.ngay_sinh)} onChange={(e) => handleChangeCalendar(e, 'ngay_sinh')} dateFormat="yy-mm-dd" className="w-full" />
                </div>
                <div className="flex flex-column col">
                    <label htmlFor="gioi_tinh">Giới tính</label>
                    <Dropdown id='gioi_tinh' value={nhanVien.gioi_tinh} onChange={
                        (e) => {
                            setNhanVien(prev => ({
                                ...prev!,
                                gioi_tinh: e.target.value || "?"
                            }));
                            setIsEdited(true);
                        }
                    } options={optionGioiTinh} placeholder='Chọn giới tính' />
                </div>
            </div>
            <div className='flex grid'>
                <div className="flex flex-column col">
                    <label htmlFor="email">Email</label>
                    <InputText id='email' value={nhanVien.email} onChange={(e) => handleChangeTXT(e, 'email')} placeholder="Email" />
                </div>
                <div className="flex flex-column col">
                    <label htmlFor="sdt">Số điện thoại</label>
                    <InputText id='sdt' value={nhanVien.sdt} onChange={(e) => handleChangeTXT(e, 'sdt')} placeholder="Số điện thoại" />
                </div>
                <div className="flex flex-column col">
                    <label htmlFor="cv">Chức vụ</label>
                    <InputText id='cv' value={nhanVien.chuc_vu} onChange={
                        (e) => { handleChangeTXT(e, 'chuc_vu') }} />
                </div>
            </div>
            <div className="flex flex-column col">
                <label htmlFor="dia_chi">Quê quán</label>
                <InputText id='dia_chi' value={nhanVien.dia_chi} onChange={(e) => handleChangeTXT(e, 'dia_chi')} placeholder="Địa chỉ" />
            </div>
            <div className="flex flex-column col">
                <label htmlFor="ghi_chu">Ghi chú</label>
                <InputText id='ghi_chu' value={nhanVien.ghi_chu} onChange={(e) => handleChangeTXT(e, 'ghi_chu')} placeholder="Ghi chú" />
            </div>
        </Card>
    );
}