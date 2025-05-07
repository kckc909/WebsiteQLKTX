'use client';
import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import FunctionTitle from '@components/function_title';
import { tb_dang_ky_phong, tb_phong, tb_sinh_vien, tb_trong_phong } from '@custom';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { api_tb_dang_ky_phong_add, api_tb_dang_ky_phong_deleteMany, api_tb_dang_ky_phong_getAll, api_tb_dang_ky_phong_getByTrangThai, api_tb_dang_ky_phong_update } from 'app/api/dashboard/api_tb_dang_ky_phong';
import ChonPhong from '@components/ChonPhong';
import { api_tb_phong_getAll } from 'app/api/dashboard/api_tb_phong';
import { join } from 'path';
import { api_tb_sinh_vien_add, api_tb_sinh_vien_CheckByMSV, api_tb_sinh_vien_search } from 'app/api/dashboard/api_tb_sinh_vien';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { api_tb_trong_phong_add } from 'app/api/dashboard/api_tb_trong_phong';


// hiển thị dnah sách đăng ký phòng
// xem thông tin chi tiết đăng ký phòng
// thêm mới đăng ký phòng -> nếu nhập mã sinh viên đã nằm trong hệ thống -> hiển thị thong tin sinh viên
// nếu trạng thái là đã duyệt thì thực hiện thêm vào phòng luôn
// xóa đăng ký phòng
// duyệt đăng ký phòng + từ chối đăng ký phòng => khi duyệt sẽ thêm sinh viên vào phòng
// nếu mà sinh viên này đã có phòng trong ký túc xá thì thực hiện đổi phòng    
// xóa sinh viên ra khỏi phòng => khi xóa sẽ xóa sinh viên ra khỏi phòng
// ở dưới hiển thị danh sách sinh viên đã đăng ký phòng đầy

const QuanLyDangKyPhong = () => {
    const newDKP = {
        id_tb_dang_ky_phong: 0,
        id_tb_phong: 0,
        trang_thai: 'cho',
        gioi_tinh: '',
    } as tb_dang_ky_phong;
    const newSV = {

    } as tb_sinh_vien;

    const toast = useRef<Toast>(null);
    const [visible, setVisible] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('')
    const [ds_dkp, setds_Dkp] = useState<tb_dang_ky_phong[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [dsPhong, setDsPhong] = useState<tb_phong[]>([]);
    const [selectedRows, setSelectedRows] = useState<tb_dang_ky_phong[]>([]);
    const [currentDkp, setCurrentDkp] = useState<tb_dang_ky_phong>(newDKP);
    const [filter, setFilter] = useState<tb_dang_ky_phong[]>([]);
    const [trang_thai, setTrangThai] = useState<string>();
    const dsTT = [
        {
            label: 'Chờ duyệt',
            value: 'cho'
        },
        {
            label: 'Đã duyệt',
            value: 'da'
        },
        {
            label: 'Đã từ chối',
            value: 'tu'
        }
    ]
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<tb_sinh_vien[]>([]);
    let searchTimeout: NodeJS.Timeout;
    const [selectedSV, setSelectedSV] = useState<tb_sinh_vien>()

    useEffect(() => {
        getAll();
    }, []);

    useEffect(() => {
        setFilter(ds_dkp.filter((dkp) => dkp.trang_thai === trang_thai));
    }, [trang_thai]);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSearchResults([]);
            return;
        }

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            try {
                const results: tb_sinh_vien[] = await api_tb_sinh_vien_search(searchTerm);
                console.log(results)
                setSearchResults(results);
            } catch (err) {
                console.error("Lỗi tìm kiếm sinh viên:", err);
            }
        }, 15);

        return () => clearTimeout(searchTimeout);
    }, [searchTerm]);

    // func
    const getAll = async () => {
        const dataDSDKP = await api_tb_dang_ky_phong_getAll();
        setds_Dkp(dataDSDKP);
        const dataDSPhong = await api_tb_phong_getAll();
        setDsPhong(dataDSPhong);
        setTrangThai('cho');
    }

    const lamMoi = async () => {
        const dataDSDKP = await api_tb_dang_ky_phong_getAll();
        setds_Dkp(dataDSDKP);
        setFilter(ds_dkp.filter((dkp) => dkp.trang_thai === trang_thai));
    }

    const openCreateDialog = (_selectedDKP: tb_dang_ky_phong) => {
        setCurrentDkp(_selectedDKP);
        setVisible(true);
    }

    const validateDangKyPhong = (data: Partial<tb_dang_ky_phong>) => {
        let newErrors: { [key: string]: string } = {};
        const phoneRegex = /^(0|\+84)[0-9]{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // kiểm tra trùng đơn đăng ký (1 đơn / 1 người / 1 kì )
        // kiểm tra thông tin
        if (!data.ma_sinh_vien || data.ma_sinh_vien.trim() === '') {
            newErrors.ma_sinh_vien = 'Mã sinh viên không được để trống.'
        }
        if (typeof data.id_tb_phong != 'number' || data.id_tb_phong <= 0) {
            newErrors.id_tb_phong = 'Vui lòng chọn phòng ở!'
        }
        if (!data.ho_ten || data.ho_ten.trim() === '') {
            newErrors.ho_ten = 'Họ tên không được để trống.'
        }
        if (!data.sdt || data.sdt.trim() === '') {
            newErrors.sdt = 'Số điện thoại không được để trống.';
        } else if (!phoneRegex.test(data.sdt.trim())) {
            newErrors.sdt = 'Số điện thoại không hợp lệ.';
        }
        if (!data.email || data.email.trim() === '') {
            newErrors.email = 'Email không được để trống.';
        } else if (!emailRegex.test(data.email.trim())) {
            newErrors.email = 'Email không hợp lệ.';
        }
        if (!data.gioi_tinh || (data.gioi_tinh.trim() !== '1' && data.gioi_tinh.trim() !== '0')) {
            newErrors.gioi_tinh = 'Vui lòng chọn giới tính'
        }
        // kiểm tra phòng
        let p_ok = false;
        const p = dsPhong.find(p => { p.id_tb_phong == data.id_tb_phong });
        if (p) {
            const tongNguoi = p.so_luong + ds_dkp.filter(dkp => dkp.id_tb_phong === p.id_tb_phong).length;
            if (tongNguoi < p.kich_thuoc_toi_da) {
                p_ok = true
            }
        }
        if (!p_ok) {
            newErrors.phong_day = 'Vui lòng chọn phòng còn chỗ trống'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;
    }

    const chonSinhVien = (sv: tb_sinh_vien) => {
        setSelectedSV(sv);
        console.log(sv)
        if (sv) {
            currentDkp.id_tb_nguoi_dung = sv.id_tb_nguoi_dung
            currentDkp.ma_sinh_vien = sv.ma_sinh_vien
            currentDkp.ho_ten = sv.ho_ten
            currentDkp.gioi_tinh = sv.gioi_tinh
            currentDkp.email = sv.email
            currentDkp.sdt = sv.sdt
        }
    }

    const handleCreate = async (newDangKyPhong: tb_dang_ky_phong) => {
        try {
            newDangKyPhong.thoi_gian_dang_ky = new Date().toISOString().split('T')[0];
            await api_tb_dang_ky_phong_add(newDangKyPhong);
            toast.current?.show({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Đã lưu thông tin đăng ký phòng',
                life: 3000,
            })
            if (newDangKyPhong.trang_thai === 'da') {
                const sinhViens = await api_tb_sinh_vien_CheckByMSV(newDangKyPhong.ma_sinh_vien);
                console.log(sinhViens)
                if (!sinhViens || sinhViens.length === 0) {
                    // Nếu chưa có -> Thêm mới sinh viên vào hệ thống
                    const newSinhVien = {
                        ma_sinh_vien: newDangKyPhong.ma_sinh_vien,
                        ho_ten: newDangKyPhong.ho_ten,
                        sdt: newDangKyPhong.sdt,
                        email: newDangKyPhong.email,
                        gioi_tinh: newDangKyPhong.gioi_tinh,
                    } as Partial<tb_sinh_vien>;
                    const idNewSinhVien = await api_tb_sinh_vien_add(newSinhVien);
                    console.log(idNewSinhVien)
                    debugger;
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Thông báo',
                        detail: 'Đã thêm mới sinh viên vào hệ thống',
                        life: 3000,
                    });
                }
                // sau đó thêm sinh viên vào phòng
                const phong = dsPhong.find((phong) => phong.id_tb_phong === newDangKyPhong.id_tb_phong);
                if (phong) {
                    const newTrongPhong = {
                        id_tb_phong: phong.id_tb_phong,
                        id_tb_nguoi_dung: sinhViens[0].id_tb_nguoi_dung,
                    } as tb_trong_phong;
                    await api_tb_trong_phong_add(newTrongPhong);

                    toast.current?.show({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Đã thêm sinh viên vào phòng',
                        life: 3000,
                    })
                }
            }
        }
        catch (error) {
            console.error("Lỗi khi thêm đăng ký phòng:", error);
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Đã xảy ra lỗi khi thêm đăng ký phòng',
                life: 3000,
            })
        }
    }

    const handleUpdate = (updatedDangKyPhong: tb_dang_ky_phong) => {
        // kiểm tra tồn tại -> kiểm tra nếu sinh viên đã đang ký 1 lần trong cùng 1 học kì thì -> cho lựa chọn giữ cũ hay thay mới hoặc không làm gì cả
        // giữ cũ thì xóa đơn này giữ mới thì xóa đơn cũ

        // cập nhật + duyệt
        handleDuyet(updatedDangKyPhong);
    }

    const handleDeleteSelected = () => {
        const deleteIds = selectedRows.map(row => row.id_tb_dang_ky_phong)
        api_tb_dang_ky_phong_deleteMany(deleteIds)
            .then(res => {
                setds_Dkp(ds_dkp.filter(dkp => !deleteIds.includes(dkp.id_tb_dang_ky_phong)));
                setFilter(ds_dkp.filter((dkp) => dkp.trang_thai === trang_thai));
                toast.current?.show({
                    severity: 'success',
                    summary: 'Xóa thành công',
                    detail: 'Xóa đăng ký phòng thành công!',
                    life: 3000,
                })
            })
            .catch(ero => {
                console.log(ero)
                toast.current?.show({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Xóa đăng ký phòng thất bại!',
                    life: 3000,
                })
            });
        setDeleteDialogVisible(false)
    }

    const handleDuyet = async (dangKyPhong: tb_dang_ky_phong) => {
        // Cập nhật trạng thái đơn
        const updatedDangKyPhong: tb_dang_ky_phong = { ...dangKyPhong, trang_thai: 'da' };

        api_tb_dang_ky_phong_update(updatedDangKyPhong)
            .then(async (res: any) => {
                if (res) {
                    // kiểm tra sinh viên đã tồn tại hay chưa -> tạo mới nếu chưa có
                    await api_tb_sinh_vien_CheckByMSV(updatedDangKyPhong.ma_sinh_vien)
                        .then(async (existedSV: Partial<tb_sinh_vien>) => {
                            if (!(existedSV && existedSV.id_tb_nguoi_dung)) {
                                const newSV: Partial<tb_sinh_vien> = {
                                    gioi_tinh: updatedDangKyPhong.gioi_tinh,
                                    ma_sinh_vien: updatedDangKyPhong.ma_sinh_vien,
                                    ho_ten: updatedDangKyPhong.ho_ten,
                                    email: updatedDangKyPhong.email,
                                    sdt: updatedDangKyPhong.sdt,
                                    ghi_chu: 'Thêm mới khi duyệt vào phòng'
                                }
                                await api_tb_sinh_vien_add(newSV);
                            }
                        })
                        .catch((err: any) => {
                            console.error(err);
                            toast.current?.show({
                                severity: 'error',
                                summary: 'Lỗi',
                                detail: 'Lỗi trong quá trình kiểm tra tồn tại sinh viên!',
                                life: 3000,
                            });
                        })
                    // thêm sinh viên vào phòng
                    const tbPhong: tb_trong_phong = {
                        id_tb_phong: updatedDangKyPhong.id_tb_phong,
                        id_tb_nguoi_dung: updatedDangKyPhong.id_tb_nguoi_dung,
                        ghi_chu: ''
                    }
                    api_tb_trong_phong_add(tbPhong)
                        .then((restp: any) => {

                        })
                        .catch((err: any) => {

                        })
                }
            })
            .catch((err: any) => {
                console.error(err);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Duyệt không thành công',
                    life: 3000,
                });
            });
    };

    const headerDSDKP = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0 text-xl">Danh sách đăng ký phòng</h2>
            <div className="flex gap-3">
                <Dropdown
                    id="trang_thai"
                    className=""
                    value={trang_thai}
                    options={dsTT.map(tt => ({ label: tt.label, value: tt.value }))}
                    onChange={(e) => setTrangThai(e.value)}
                    placeholder="Chọn trạng thái"
                />
                <span className="block mt-2 md:mt-0 p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
                </span>
            </div>
        </div>
    );

    const footerDKP = (<div className="flex justify-content-end gap-2">
        <Button label="Show" icon="pi pi-times" onClick={() => console.log(currentDkp)} className="p-button-text" />
        <Button label="Hủy" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        <Button label="Lưu" icon="pi pi-check" onClick={() => {
            // kiểm tra thông tin đầu vào
            if (!validateDangKyPhong(currentDkp)) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Vui lòng kiểm tra lại thông tin đăng ký phòng',
                    life: 3000,
                })
                return;
            }

            if (currentDkp.id_tb_dang_ky_phong || currentDkp.id_tb_dang_ky_phong != 0) {
                handleUpdate(currentDkp as tb_dang_ky_phong);
            }
            else {
                handleCreate(currentDkp as tb_dang_ky_phong);
            }

            setVisible(false);
            toast.current?.show({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Đã lưu thông tin đăng ký phòng',
                life: 3000,
            })
        }} autoFocus />
    </div>)
    return (
        <div>
            <Toast ref={toast} />
            <FunctionTitle title="Quản lý đăng ký phòng" />
            <Toolbar className="mb-4" left={() => (
                <>
                    <Button label="Làm mới" icon="pi pi-refresh" onClick={lamMoi} className="mr-2" />
                    <Button label="Thêm mới" icon="pi pi-plus" onClick={() => {
                        openCreateDialog(newDKP);
                    }} className="mr-2 bg-primary" />
                    <Button label="Xóa đã chọn" icon="pi pi-trash" onClick={() => setDeleteDialogVisible(true)} severity="danger" className="mr-2" disabled={selectedRows.length === 0} />
                </>
            )} />
            <Dialog
                header="Thêm đăng ký phòng"
                visible={visible}
                style={{ width: '60vw' }}
                onHide={() => {
                    setVisible(false)
                    selectedSV && setSelectedSV(undefined)
                    setCurrentDkp(newDKP)
                    setSearchTerm('')
                    setSearchResults([])
                    setErrors({})
                }}
                footer={footerDKP}
            >
                <div className="">
                    <div className="flex justify-content-start">
                        <h2 className="text-lg font-bold mb-2 py-2 pr-1">Tìm kiếm sinh viên </h2>

                        <InputText
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Nhập tên hoặc mã sinh viên..."
                            className="mb-2 w-1/2 ml-1"
                        />
                    </div>

                    {searchResults.length > 0 && (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">Mã SV</th>
                                    <th className="border p-2">Họ tên</th>
                                    <th className="border p-2">Ngày sinh </th>
                                    <th className="border p-2">Giới tính</th>
                                    <th className="border p-2">Số điện thoại</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((student) => (
                                    <tr key={student.id_tb_nguoi_dung} className="hover:bg-gray-50" onClick={() => {
                                        chonSinhVien(student);
                                    }}>
                                        <td className="border p-2">{student.ma_sinh_vien}</td>
                                        <td className="border p-2">{student.ho_ten}</td>
                                        <td className="border p-2">{(new Date(student.ngay_sinh)).toLocaleDateString('vi-VN')}</td>
                                        <td className="border p-2">{student.gioi_tinh == '0' ? 'Nữ' : student.gioi_tinh == '1' ? 'Nam' : 'Chọn giới tính'}</td>
                                        <td className="border p-2">{student.sdt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="flex grid pt-1">
                    <div className="grid formgrid flex col-6">
                        <div className="col-12 grid flex">
                        </div>
                        <div className="col-12">
                            <label htmlFor="ma_sinh_vien" className="block mb-2">Mã sinh viên</label>
                            <InputText id="ma_sinh_vien" className="w-full" value={currentDkp.ma_sinh_vien || ''} onChange={(e) => setCurrentDkp({ ...currentDkp, ma_sinh_vien: e.target.value })} />
                            {errors.ma_sinh_vien && <small className="p-error">{errors.ma_sinh_vien}</small>}
                        </div>
                        <div className="flex col-12 p-0">
                            <div className="col-8">
                                <label htmlFor="ho_ten" className="block mb-2">Họ tên</label>
                                <InputText id="ho_ten" className="w-full" value={currentDkp.ho_ten || ''} onChange={(e) => setCurrentDkp({ ...currentDkp, ho_ten: e.target.value })} />
                                {errors.ho_ten && <small className="p-error">{errors.ho_ten}</small>}
                            </div>
                            <div className="col-4">
                                <label htmlFor="gioi_tinh" className="block mb-2">Giới tính</label>
                                <Dropdown
                                    id="gioi_tinh"
                                    className="w-full"
                                    value={currentDkp.gioi_tinh}
                                    options={[
                                        { label: 'Chọn giới tính', value: '' },
                                        { label: 'Nữ', value: '0' },
                                        { label: 'Nam', value: '1' }
                                    ]}
                                    onChange={(e) => setCurrentDkp({ ...currentDkp, gioi_tinh: e.value })}
                                    placeholder="Chọn giới tính"
                                />
                                {errors.gioi_tinh && <small className="p-error">{errors.gioi_tinh}</small>}
                            </div>
                        </div>

                        <div className="col-12 ">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <InputText id="email" className="w-full" value={currentDkp.email || ''} onChange={(e) => setCurrentDkp({ ...currentDkp, email: e.target.value })} />
                            {errors.email && <small className="p-error">{errors.email}</small>}
                        </div>

                        <div className="col-12 ">
                            <label htmlFor="sdt" className="block mb-2">Số điện thoại</label>
                            <InputText id="sdt" className="w-full" value={currentDkp.sdt || ''} onChange={(e) => setCurrentDkp({ ...currentDkp, sdt: e.target.value })} />
                            {errors.sdt && <small className="p-error">{errors.sdt}</small>}
                        </div>

                        <div className="col-12 md:col-6">
                            <label htmlFor="trang_thai" className="block mb-2">Trạng thái</label>
                            <Dropdown
                                id="trang_thai"
                                className="w-full"
                                value={currentDkp.trang_thai}
                                options={[
                                    { label: 'Chờ duyệt', value: 'cho' },
                                    { label: 'Đã duyệt', value: 'da' },
                                    { label: 'Từ chối', value: 'tu' }
                                ]}
                                onChange={(e) => setCurrentDkp({ ...currentDkp, trang_thai: e.value })}
                                placeholder="Chọn trạng thái"
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="ghi_chu" className="block mb-2">Ghi chú</label>
                            <InputTextarea
                                id="ghi_chu"
                                className="w-full"
                                rows={3}
                                value={currentDkp.ghi_chu || ''}
                                onChange={(e) => setCurrentDkp({ ...currentDkp, ghi_chu: e.target.value })}
                                autoResize
                            />
                        </div>
                    </div>
                    <div className="flex col-6">
                        <ChonPhong
                            dsPhong={dsPhong}
                            dsDKP={ds_dkp.filter((dkp) => dkp.trang_thai === 'cho')}
                            onChonPhong={(p) => {
                                setCurrentDkp({ ...currentDkp, id_tb_phong: p.id_tb_phong });
                            }}
                            sltPhong={currentDkp.id_tb_phong}
                        />
                        {errors.id_tb_phong && <small className="p-error">{errors.id_tb_phong}</small>}
                        {errors.phong_day && <small className="p-error">{errors.phong_day}</small>}
                    </div>
                </div>
            </Dialog>

            <DataTable
                value={filter}
                selection={selectedRows}
                onSelectionChange={(e) => setSelectedRows(e.value)}
                paginator rows={10}
                selectionMode="checkbox"
                dataKey="id_tb_dang_ky_phong"
                globalFilter={globalFilter}
                header={headerDSDKP}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="ma_sinh_vien" header="Mã sinh viên" />
                <Column field="ho_ten" header="Tên sinh viên" />
                <Column field="id_tb_phong"
                    body={(rowData) => {
                        return dsPhong.find((phong) => phong.id_tb_phong === rowData.id_tb_phong)?.ten_phong || 'Chưa có phòng';
                    }}
                    header="Phòng đăng ký" />
                <Column
                    field="trang_thai"
                    header="Trạng thái"
                    body={(rowData) => (
                        rowData.trang_thai === 'cho' ? 'Chờ duyệt' :
                            rowData.trang_thai === 'da' ? 'Đã duyệt' :
                                rowData.trang_thai === 'tu' ? 'Từ chối' :
                                    'Không xác định'
                    )}
                />
                <Column
                    body={(rowData) => (
                        <Button
                            label=""
                            icon="pi pi-info"
                            className="p-button-rounded p-button-primary mr-2"
                            onClick={() => openCreateDialog(rowData)}
                        />
                    )}
                />
            </DataTable>
            <Dialog visible={deleteDialogVisible} header="Xác nhận"
                modal
                footer={<Button label="Xóa" icon="pi pi-check" onClick={handleDeleteSelected} />}
                onHide={() => setDeleteDialogVisible(false)}>
                <span>Bạn có chắc chắn muốn xóa những đăng ký phòng này?</span>
            </Dialog>
        </div>
    );
};
export default QuanLyDangKyPhong;
