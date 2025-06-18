import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { api_tb_dang_ky_phong_add } from 'app/api/dashboard/api_tb_dang_ky_phong';
import { api_tb_sinh_vien_CheckByMSV, api_tb_sinh_vien_add, api_tb_sinh_vien_getById } from 'app/api/dashboard/api_tb_sinh_vien';
import { tb_dang_ky_phong, tb_nhan_vien, tb_sinh_vien } from '@custom';
import { api_tb_nhan_vien_add, api_tb_nhan_vien_getById } from 'app/api/dashboard/api_tb_nhan_vien';

export default function C_ThongTinSinhVien(
    {
        id_tb_phong,
        onBack
    }:
        {
            id_tb_phong: number,
            onBack: () => void
        }) {
    const newForm = {
        ma_sinh_vien: '',
        ho_ten: '',
        gioi_tinh: '',
        email: '',
        ngay_sinh: '',
        dia_chi: '',
        sdt: '',
        ghi_chu: '',
        quoc_tich: '',
        dan_toc: '',
        ton_giao: '',
        nganh_hoc: '',
        chuyen_nganh: '',
        nien_khoa: '',
        khoa_hoc: '',
        id_tb_phong: id_tb_phong,
    }
    const [form, setForm] = useState(newForm);

    const toast = useRef<Toast>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [minhChung, setMinhChung] = useState<File | null>(null);
    const [minhChungPreview, setMinhChungPreview] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const userInfo = localStorage.getItem("user_info");
            if (userInfo) {
                const user = JSON.parse(userInfo) as {
                    iat: string,
                    id_tb_nguoi_dung: number,
                    quyen: string
                };
                // lấy thông tin người dùng theo quyền
                if (user.quyen === 'nv') {
                    const userdata = await api_tb_nhan_vien_getById(user.id_tb_nguoi_dung);
                    const currentUser = userdata[0];
                    if (currentUser) {
                        setForm(prev => ({
                            ...prev,
                            ho_ten: currentUser.ho_ten || "",
                            email: currentUser.email || "",
                            ngay_sinh: currentUser.ngay_sinh ? String(currentUser.ngay_sinh).slice(0, 10) : "",
                            gioi_tinh: currentUser.gioi_tinh == 1 ? "Nam" : (currentUser.gioi_tinh === 0 ? "Nữ" : ""),
                            dia_chi: currentUser.dia_chi || "",
                            sdt: currentUser.sdt || "",
                            ghi_chu: currentUser.ghi_chu || "",
                        }));
                    }
                } else {
                    const currentUser = await api_tb_sinh_vien_getById(user.id_tb_nguoi_dung);
                    if (currentUser) {
                        setForm(prev => ({
                            ...prev,
                            ma_sinh_vien: currentUser.ma_sinh_vien || "",
                            ho_ten: currentUser.ho_ten || "",
                            email: currentUser.email || "",
                            ngay_sinh: currentUser.ngay_sinh ? String(currentUser.ngay_sinh).slice(0, 10) : "",
                            gioi_tinh: typeof currentUser.gioi_tinh === "number"
                                ? (currentUser.gioi_tinh === 1 ? "Nam" : (currentUser.gioi_tinh === 0 ? "Nữ" : ""))
                                : (currentUser.gioi_tinh || ""),
                            dia_chi: currentUser.dia_chi || "",
                            sdt: currentUser.sdt || "",
                            ghi_chu: currentUser.ghi_chu || "",
                            quoc_tich: currentUser.quoc_tich || "",
                            dan_toc: currentUser.dan_toc || "",
                            ton_giao: currentUser.ton_giao || "",
                            nganh_hoc: currentUser.nganh_hoc || "",
                            chuyen_nganh: currentUser.chuyen_nganh || "",
                            nien_khoa: currentUser.nien_khoa || "",
                            khoa_hoc: currentUser.khoa_hoc || "",
                        }));
                    }
                }
            }
        }
        fetchData();
    }, []);

    // Validate dữ liệu đầu vào
    const validateForm = (data: Partial<any>) => {
        let newErrors: { [key: string]: string } = {};
        const phoneRegex = /^(0|\+84)[0-9]{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.ma_sinh_vien || data.ma_sinh_vien.trim() === '') {
            newErrors.ma_sinh_vien = 'Mã sinh viên không được để trống.';
        }
        if (typeof data.id_tb_phong !== 'number' || data.id_tb_phong <= 0) {
            newErrors.id_tb_phong = 'Vui lòng chọn phòng ở!';
        }
        if (!data.ho_ten || data.ho_ten.trim() === '') {
            newErrors.ho_ten = 'Họ tên không được để trống.';
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
            newErrors.gioi_tinh = 'Vui lòng chọn giới tính';
        }
        if (!data.ngay_sinh || data.ngay_sinh.trim() === '') {
            newErrors.ngay_sinh = 'Vui lòng nhập ngày sinh.';
        }
        if (!data.dan_toc || data.dan_toc.trim() === '') {
            newErrors.dan_toc = 'Dân tộc không được để trống.';
        }
        if (!data.ton_giao || data.ton_giao.trim() === '') {
            newErrors.ton_giao = 'Tôn giáo không được để trống.';
        }
        if (!data.nien_khoa || data.nien_khoa.trim() === '') {
            newErrors.nien_khoa = 'Niên khóa không được để trống.';
        }
        if (!avatar) {
            newErrors.avatar = 'Vui lòng tải lên ảnh chân dung.';
        }
        if (!minhChung) {
            newErrors.minhChung = 'Vui lòng tải ảnh minh chứng.';
        }
        if (Object.keys(newErrors).length > 0) {
            console.log("newErrors", newErrors)
            setErrors(newErrors);
            toast.current?.show({
                severity: "error",
                summary: "Lỗi",
                detail: 'Thông tin không hợp lệ!',
                life: 4000,
            });
            return false;
        }
        setErrors({});
        return true;
    };

    // Xử lý gửi đăng ký
    const handleSubmit = async () => {

        const valCheck = validateForm(form);
        if (!valCheck) {
            return;
        };

        try {
            // Kiểm tra sinh viên đã tồn tại chưa
            const existedSVs = await api_tb_sinh_vien_CheckByMSV(form.ma_sinh_vien);
            let idNguoiDung = existedSVs[0]?.id_tb_nguoi_dung;
            if (!idNguoiDung) {
                // Thêm mới sinh viên
                const newSV = {
                    ma_sinh_vien: form.ma_sinh_vien,
                    ho_ten: form.ho_ten,
                    sdt: form.sdt,
                    email: form.email,
                    gioi_tinh: form.gioi_tinh,
                    ngay_sinh: form.ngay_sinh,
                    dan_toc: form.dan_toc,
                    ton_giao: form.ton_giao,
                    nien_khoa: form.nien_khoa,
                };
                const idNewSV = await api_tb_sinh_vien_add(newSV);
                idNguoiDung = idNewSV.id_tb_nguoi_dung;
            }

            const newDKP = {
                id_tb_dang_ky_phong: 0,
                id_tb_nguoi_dung: idNguoiDung,
                ma_sinh_vien: form.ma_sinh_vien,
                ho_ten: form.ho_ten,
                gioi_tinh: form.gioi_tinh,
                email: form.email,
                sdt: form.sdt,
                id_tb_phong: id_tb_phong,
                trang_thai: 'cho',
                thoi_gian_dang_ky: new Date().toISOString().split('T')[0],
                id_tb_hoc_ki: 0,
                ghi_chu: form.ghi_chu,
            } as tb_dang_ky_phong;

            console.log("New DKP", newDKP);
            const nnn = await api_tb_dang_ky_phong_add(newDKP);
            console.log("DKP added", nnn);

            toast.current?.show({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Đã gửi đăng ký phòng thành công!',
                life: 3000,
            });

            setForm(newForm);
            setAvatar(null); setAvatarPreview(null);
            setMinhChung(null); setMinhChungPreview(null);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Có lỗi xảy ra khi gửi đăng ký!',
                life: 4000,
            });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <Button
                icon="pi pi-arrow-left"
                label="Quay lại"
                className="p-button-text mx-4"
                onClick={
                    () => {
                        onBack()
                    }
                } />
            <div className="p-4 pt-0 flex justify-content-center">
                <div className="max-w-[1200px]">
                    {/*  */}
                    <h5 className="text-lg font-medium">I. Thông tin cá nhân</h5>
                    <div className="text-sm text-orange-700 bg-yellow-100 p-2 border-round mb-3">
                        <ul style={{ marginTop: 16, color: "#d35400", fontSize: 14 }}>
                            <li>Ảnh mới chụp: không quá 6 tháng.</li>
                            <li>Tỉ lệ ảnh: 4 x 6.</li>
                            <li>Tỉ lệ diện tích khuôn mặt: chiếm khoảng 75% diện tích ảnh.</li>
                            <li>Chiều cao từ mắt lên mép trên của ảnh: xấp xỉ 2/3 chiều cao từ mắt xuống mép dưới của ảnh.</li>
                            <li>Góc chụp: Mặt nhìn thẳng.</li>
                            <li>Trang phục: Đầu để trần, không đeo kính, trang phục gọn gàng lịch sự.</li>
                            <li>Phông nền: màu trắng hoặc màu xanh.</li>
                            <li>Định dạng file: .jpeg, .png.</li>
                            <li>Ảnh gốc: Ảnh được chụp từ điện thoại, không qua các ứng dụng chỉnh sửa ảnh. (ví dụ bên dưới)</li>
                            <li>Tuyệt đối không được chụp lại ảnh thẻ 3x4 và 4x6</li>
                        </ul>
                        <br />Ảnh được sử dụng cho thẻ và hệ thống nhận diện FaceID.
                    </div>
                    <>
                        {avatarPreview && (
                            <div
                                className='flex justify-content-center'
                                style={{ marginTop: 12 }}>
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    style={{
                                        width: 150,
                                        height: 150,
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </div>
                        )}
                        <FileUpload mode="basic" name="avatar" chooseLabel="Tải ảnh chân dung (*)" customUpload
                            uploadHandler={(event) => {
                                const file = event.files && event.files[0];
                                setAvatar(file || null);
                                setAvatarPreview(file ? URL.createObjectURL(file) : null);
                                event.options.clear();
                            }} className="my-2 flex justify-content-center" />
                        {errors.avatar && <small className="p-error flex justify-content-center">{errors.avatar}</small>}
                    </>
                    <div className="grid">
                        <Button onClick={() => {
                            console.log("form", form);
                        }
                        }>Show</Button>
                        <div className="col-12">
                            <label>Họ và tên <span className="text-red-500">(*)</span></label>
                            <InputText className="w-full" value={form.ho_ten} onChange={e => setForm({ ...form, ho_ten: e.target.value })} />
                            {errors.ho_ten && <small className="p-error">{errors.ho_ten}</small>}
                        </div>
                        <div className="col-12">
                            <label>Giới tính <span className="text-red-500">(*)</span></label>
                            <div className="flex gap-3">
                                <RadioButton
                                    inputId="Nam"
                                    name="gioi_tinh"
                                    value="1"
                                    onChange={(e) => {
                                        setForm({ ...form, gioi_tinh: e.value });
                                    }}
                                    checked={form.gioi_tinh === '1' ? true : false}
                                />
                                <label htmlFor="Nam">Nam</label>
                                <RadioButton
                                    inputId="Nu"
                                    name="gioi_tinh"
                                    value="0"
                                    onChange={(e) => {
                                        setForm({ ...form, gioi_tinh: e.value });
                                    }}
                                    checked={form.gioi_tinh === '0' ? true : false}
                                />
                                <label htmlFor="Nu">Nữ</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <label>Ngày sinh <span className="text-red-500">(*)</span></label>
                            <InputText className="w-full" type="date" value={form.ngay_sinh} onChange={e => setForm({ ...form, ngay_sinh: e.target.value })} />
                            {errors.ngay_sinh && <small className="p-error">{errors.ngay_sinh}</small>}
                        </div>
                        <div className="col-12">
                            <label>Email <span className="text-red-500">(*)</span></label>
                            <InputText className="w-full" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            {errors.email && <small className="p-error">{errors.email}</small>}
                        </div>
                        <div className="col-12">
                            <label>Số điện thoại <span className="text-red-500">(*)</span></label>
                            <InputText className="w-full" value={form.sdt} onChange={e => setForm({ ...form, sdt: e.target.value })} />
                            {errors.sdt && <small className="p-error">{errors.sdt}</small>}
                        </div>
                        <div className="col-12">
                            <label>Dân tộc <span className="text-red-500">(*)</span></label>
                            <InputText className="w-full" value={form.dan_toc} onChange={e => setForm({ ...form, dan_toc: e.target.value })} placeholder="Nhập dân tộc" />
                            {errors.dan_toc && <small className="p-error">{errors.dan_toc}</small>}
                        </div>
                        <div className="col-12">
                            <label>Tôn giáo <span className="text-red-500">(*)</span></label>
                            <InputText className="w-full" value={form.ton_giao} onChange={e => setForm({ ...form, ton_giao: e.target.value })} placeholder="Nhập tôn giáo" />
                            {errors.ton_giao && <small className="p-error">{errors.ton_giao}</small>}
                        </div>
                        <div className="col-12">
                            <label>Diện chính sách (nếu có)</label>
                            <InputText className="w-full" value={form.ghi_chu} onChange={e => setForm({ ...form, ghi_chu: e.target.value })} />
                        </div>
                    </div>

                    {/*  */}
                    <h5 className="text-lg font-medium">II. Thông tin sinh viên tại trường</h5>
                    <div className="text-sm text-orange-700 bg-yellow-100 p-2 border-round mb-3">
                        <div style={{ background: "#f9f9e3", padding: 16, borderRadius: 8, border: "1px solid #f1c40f" }}>
                            <strong>Lưu ý</strong>
                            <ul style={{ marginTop: 8, color: "#7f8c8d", fontSize: 14 }}>
                                <li>
                                    <b>Đối với tân sinh viên:</b> Thẻ sinh viên, hình ảnh minh chứng đã làm thủ tục nhập học tại CSĐT (Biên nhận hồ sơ nhập học, giấy xác nhận nhập học, đơn đăng ký ở KTX, giấy giới thiệu, giấy xác nhận, giấy chứng nhận của nhà trường, biên nhận tiền, ...)
                                </li>
                                <li>
                                    <b>Đối với sinh viên năm 2 trở lên thuộc TĐHSPKTHY:</b> Thẻ sinh viên/Giấy xác nhận sinh viên/thời khóa biểu học tập<span className="text-red-500">(*)</span>.
                                </li>
                                <li>
                                    <b>Đối với sinh viên năm 2 trở lên ngoài TĐHSPKTHY:</b> Giấy xác nhận, có đóng dấu của nhà trường
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full items-center">
                        {minhChungPreview && (
                            <div
                                className='flex justify-content-center'
                                style={{ marginTop: 12 }}>
                                <img
                                    src={minhChungPreview}
                                    alt="Minh Chứng Preview"
                                    style={{
                                        maxWidth: 300,
                                        maxHeight: 300,
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </div>
                        )}
                        <FileUpload
                            mode="basic"
                            name="minhchung"
                            chooseLabel="Tải ảnh minh chứng (*)"
                            customUpload
                            uploadHandler={(event) => {
                                const file = event.files && event.files[0];
                                setMinhChung(file || null);
                                setMinhChungPreview(file ? URL.createObjectURL(file) : null);
                                event.options.clear();
                            }}
                            className='flex justify-content-center my-2'
                        />
                        {errors.minhChung && <small className="p-error flex justify-content-center">{errors.minhChung}</small>}
                    </div>

                    <div className="grid">
                        <div className="col-12">
                            <label>Mã số sinh viên <span className="text-red-500">(*)</span></label>
                            <InputText className="w-full" value={form.ma_sinh_vien} onChange={e => setForm({ ...form, ma_sinh_vien: e.target.value })} />
                            {errors.ma_sinh_vien && <small className="p-error">{errors.ma_sinh_vien}</small>}
                        </div>
                        <div className="col-12">
                            <label>Sinh viên niên khóa <span className="text-red-500">(*)</span></label>
                            <InputText className="w-full" value={form.nien_khoa} onChange={e => setForm({ ...form, nien_khoa: e.target.value })} placeholder="Nhập niên khóa" />
                            {errors.nien_khoa && <small className="p-error">{errors.nien_khoa}</small>}
                        </div>
                    </div>

                    {/*  */}
                    {/* <h5 className="text-lg font-medium">III. Thông tin tài khoản ngân hàng</h5>
                    <div className="flex align-items-center mb-2">
                        <RadioButton inputId="coTK" name="taikhoan" value={true} onChange={() => setForm({ ...form, coTaiKhoanNH: true })} checked={form.coTaiKhoanNH === true} />
                        <label htmlFor="coTK" className="ml-2 mr-4">Đã có tài khoản</label>
                        <RadioButton inputId="chuaTK" name="taikhoan" value={false} onChange={() => setForm({ ...form, coTaiKhoanNH: false })} checked={form.coTaiKhoanNH === false} />
                        <label htmlFor="chuaTK" className="ml-2">Chưa có tài khoản</label>
                    </div>

                    {form.coTaiKhoanNH && (
                        <div className="grid">
                            <div className="col-12">
                                <label>Tên ngân hàng</label>
                                <InputText className="w-full" value={form.tenNganHang} onChange={e => setForm({ ...form, tenNganHang: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label>Chi nhánh (không bắt buộc)</label>
                                <InputText className="w-full" value={form.chiNhanh} onChange={e => setForm({ ...form, chiNhanh: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label>Số tài khoản</label>
                                <InputText className="w-full" value={form.soTK} onChange={e => setForm({ ...form, soTK: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label>Tên chủ tài khoản</label>
                                <InputText className="w-full" value={form.tenChuTK} onChange={e => setForm({ ...form, tenChuTK: e.target.value })} />
                            </div>
                        </div>
                    )} */}

                    {/* Gửi */}
                    <div className="mt-5 text-center">
                        <Button label="Gửi đăng ký" icon="pi pi-send"
                            onClick={() => {
                                handleSubmit()
                            }} />
                    </div>
                </div>
            </div>
        </>

    );
}
