export interface LoginRequest {
    username: string;
    password: string;
}

export interface tb_bai_dang {
    id_tb_bai_dang: number;
    id_tb_nguoi_dung: number;
    tieu_de: string;
    noi_dung: any;
    ngay_dang: Date;
    luot_xem: number;
    trang_thai: number; // 1: Hiển thị, 0: Ẩn
}

export interface tb_gia_phong {
    id_tb_gia_phong: number;
    id_tb_phong: number;
    thoi_gian_ap_dung: Date;
    gia: number;
}

export interface tb_hoa_don_dien_nuoc {
    id_tb_hoa_don_dien_nuoc: number;
    id_tb_phong: number;
    thoi_gian: Date;
    so_dien_tieu_thu: number;
    so_nuoc_tieu_thu: number;
    thanh_tien: number;
    trang_thai: any | undefined;
}

export interface tb_hoa_don_phong {
    id_tb_hoa_don_phong: number;
    id_tb_gia_phong: number;
    thoi_gian: Date;
    trang_thai: any | undefined;
    ghi_chu: string | undefined;
}

export interface tb_khuon_mat {
    id_tb_khuon_mat: number;
    id_tb_nguoi_dung: number;
    du_lieu_vector: string;
    anh: string | undefined;
}

export interface tb_lich_su_ra_vao {
    id_tb_lich_su_ra_vao: number;
    id_tb_nguoi_dung: number | undefined;
    thoi_gian: Date;
    phuong_thuc: any;
    trang_thai: any;
    thiet_bi_quet: string | undefined;
}

export interface tb_nguoi_dung {
    id_tb_nguoi_dung: number;
    ten_tai_khoan: string;
    mat_khau: string;
    quyen: any;
}

export interface tb_nhan_vien {
    id_tb_nguoi_dung: number;
    ma_nhan_vien: string;
    ho_ten: string;
    email: string;
    ngay_sinh: DateOnly;
    gioi_tinh: number | null;
    dia_chi: string | undefined;
    sdt: string;
    chuc_vu: string;
    ghi_chu: string | undefined;
    avatar: string;
}

export interface tb_phong {
    id_tb_phong: number;
    day_nha: string;
    ten_phong: string;
    kich_thuoc_toi_da: number;
    trang_thai: string | undefined; // 0: trống, 1: có người ở, 2: đang sửa chữa
    mat_khau: string | undefined;
    so_luong: number;
    gioi_tinh_phong: string | null | undefined; // 0 nữ hoặc 1 nam
    day_nha: string | undefined;
    tang: number;
}

export interface tb_sinh_vien {
    gioi_tinh: string;
    quoc_tich: string;
    dan_toc: string;
    ton_giao: string;
    nganh_hoc: string;
    chuyen_nganh: string;
    nien_khoa: string;
    khoa_hoc: string;
    avatar: string;
    id_tb_nguoi_dung: number;
    ma_sinh_vien: string;
    ho_ten: string;
    email: string;
    ngay_sinh: DateOnly;
    dia_chi: string | undefined;
    sdt: string;
    ghi_chu: string | undefined;
}

export interface tb_so_dien_nuoc {
    id_tb_so_dien_nuoc: number;
    id_tb_phong: number;
    thoi_gian: Date;
    so_dien: number;
    so_nuoc: number;
}

export interface tb_thong_bao {
    id_tb_thong_bao: number;
    noi_dung: string;
    id_tb_nguoi_gui: number;
    thoi_gian_gui: Date | undefined;
    id_tb_nguoi_nhan: number;
}

export interface tb_trong_phong {
    id_tb_phong: number | undefined;
    id_tb_nguoi_dung: number | undefined;
    ghi_chu: string | undefined;
}

export interface tb_van_tay {
    id_tb_van_tay: number;
    id_tb_nguoi_dung: number;
    du_lieu_van: string;
}

export interface tb_dang_ky_phong {
    id_tb_dang_ky_phong: number,
    ma_sinh_vien: string,
    ho_ten: string,
    gioi_tinh: string,
    email: string,
    sdt: string,
    id_tb_phong: number,
    trang_thai: string,
    thoi_gian_dang_ky: Date | string,
    ghi_chu: string | null,
    id_tb_nguoi_dung: number
}