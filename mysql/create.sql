
create database website_qlktx;

use website_qlktx;

-- 0 = còn trống | 1 = full
create table tb_nguoi_dung (
    id_tb_nguoi_dung int auto_increment primary key,
    ten_tai_khoan varchar(50) unique not null,
    mat_khau varchar(255) not null,
    quyen enum('ad', 'nv', 'sv') not null
);

create table tb_phong (
    id_tb_phong int auto_increment primary key,
    day_nha varchar(10) not null,
    ten_phong varchar(50) not null,
    so_luong int default 0,
    kich_thuoc_toi_da int not null,
    trang_thai enum('0', '1') default '0', -- 0 trống 1 đầy
    mat_khau varchar(20),
    day_nha nvarchar(10) not null,
    tang int not null default 1,
    gioi_tinh_phong enum('0','1') null,
    ghi_chu nvarchar(50)
);

create table tb_gia_phong (
    id_tb_gia_phong int auto_increment primary key,
    id_tb_phong int not null,
    thoi_gian_ap_dung date not null,
    gia decimal(10,2) not null,
    foreign key (id_tb_phong) references tb_phong(id_tb_phong) on delete cascade on update cascade 
);

create table tb_sinh_vien (
    id_tb_nguoi_dung int primary key,
    ma_sinh_vien varchar(20) unique not null,
    ho_ten varchar(100) not null,
    gioi_tinh enum('0', '1'),
    email varchar(100) unique not null,
    ngay_sinh date not null,
    dia_chi varchar(255),
    sdt varchar(20) unique not null,
    ghi_chu nvarchar(20),
    foreign key (id_tb_nguoi_dung) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade 
);

create table tb_nhan_vien (
    id_tb_nguoi_dung int primary key,
    ma_nhan_vien int,
    ho_ten varchar(100) not null,
    gioi_tinh enum('0', '1'),
    email varchar(100) unique not null,
    ngay_sinh date not null,
    dia_chi varchar(255),
    sdt varchar(20) unique not null,
    chuc_vu varchar(50) not null,
    ghi_chu nvarchar(20),
    foreign key (id_tb_nguoi_dung) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade 
);

create table tb_trong_phong(
	id_tb_phong int,
    id_tb_nguoi_dung int,
    ghi_chu nvarchar(20),
    primary key (id_tb_phong, id_tb_nguoi_dung),
    foreign key (id_tb_phong) references tb_phong(id_tb_phong) on delete	cascade on update cascade , 
    foreign key (id_tb_nguoi_dung) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade 
);

create table tb_lich_su_ra_vao (
    id_tb_lich_su_ra_vao int auto_increment primary key,
    id_tb_nguoi_dung int,
    thoi_gian datetime not null,
    phuong_thuc enum('khuon_mat', 'van_tay', 'mat_khau') not null,
    trang_thai enum('vao', 'ra') not null,
    thiet_bi_quet varchar(50),
    foreign key (id_tb_nguoi_dung) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade 
);

create table tb_khuon_mat (
    id_tb_khuon_mat int auto_increment primary key,
    id_tb_nguoi_dung int not null,
    du_lieu_vector text not null,
    anh varchar(255),
    foreign key (id_tb_nguoi_dung) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade 
);

create table tb_van_tay (
    id_tb_van_tay int auto_increment primary key,
    id_tb_nguoi_dung int not null,
    du_lieu_van text not null,
    foreign key (id_tb_nguoi_dung) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade 
);

create table tb_thong_bao (
    id_tb_thong_bao int auto_increment primary key,
    noi_dung text not null,
    id_tb_nguoi_gui int not null,
    thoi_gian_gui datetime default current_timestamp,
    id_tb_nguoi_nhan int not null,
    foreign key (id_tb_nguoi_gui) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade ,
    foreign key (id_tb_nguoi_nhan) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade 
);
-- 0 -> chưa thanh toán | 1 -> đã thanh toán
create table tb_hoa_don_phong (
    id_tb_hoa_don_phong int auto_increment primary key,
    id_tb_gia_phong int not null,
    thoi_gian date not null,
    trang_thai enum('0', '1') default '0', 
    ghi_chu text,
    foreign key (id_tb_gia_phong) references tb_gia_phong(id_tb_gia_phong) on delete	cascade on update cascade 
);

create table tb_so_dien_nuoc (
    id_tb_so_dien_nuoc int auto_increment primary key,
    id_tb_phong int not null,
    thoi_gian date not null,
    so_dien int not null,
    so_nuoc int not null,
    foreign key (id_tb_phong) references tb_phong(id_tb_phong) on delete cascade on update cascade 
);

create table tb_hoa_don_dien_nuoc (
    id_tb_hoa_don_dien_nuoc int auto_increment primary key,
    id_tb_phong int not null,
    thoi_gian date not null,
    so_dien_tieu_thu int not null,
    so_nuoc_tieu_thu int not null,
    thanh_tien decimal(10,2) not null,
    trang_thai enum('0', '1') default '0',
    foreign key (id_tb_phong) references tb_phong(id_tb_phong) on delete	cascade on update cascade 
);

create table tb_bai_dang(
	id_tb_bai_dang int primary key auto_increment,
    id_tb_nguoi_dung int,
    tieu_de nvarchar(50),
    noi_dung json,
    ngay_dang date default (current_date),
    luot_xem int default 0,
    foreign key (id_tb_nguoi_dung) references tb_nguoi_dung(id_tb_nguoi_dung) on delete	cascade on update cascade 
);

create table tb_dang_ky_phong(
	id_tb_dang_ky_phong int primary key auto_increment, 
    ma_sinh_vien varchar(20),
    ho_ten nvarchar(50),
    gioi_tinh enum('0','1'),
	email varchar(20),
    sdt varchar(10),
    id_tb_phong int,
    trang_thai varchar(5),
	thoi_gian_dang_ky date,
    ghi_chu nvarchar(100),
    id_tb_nguoi_dung int null,
    id_tb_hoc_ki int references tb_hoc_ki(id_tb_hoc_ki) on delete cascade on update cascade,
);

create tb_hoc_ki(
    id_tb_hoc_ki int primary key auto_increment,
    ki nvarchar(5),
    nam_hoc nvarchar(11),
    thoi_gian_bat_dau nvarchar(20),
    thoi_gian_ket_thuc nvarchar(20),
    ghi_chu nvarchar(100)
);
-- triggers 

delimiter $$ -- Điều chỉnh form ngày sinh => y-m-d
create trigger trg_format_ngay_sinh
before insert on tb_sinh_vien
for each row
begin
    set new.ngay_sinh = date_format(new.ngay_sinh, '%y-%m-%d');
end $$
delimiter ;

delimiter // 
create trigger trg_after_insert_tb_trong_phong
after insert on tb_trong_phong
for each row
begin
	-- Điều chỉnh số lượng + trạng thái
    declare current_count int;
    declare max_count int;

    select count(*) into current_count from tb_trong_phong where id_tb_phong = new.id_tb_phong;
    select kich_thuoc_toi_da into max_count from tb_phong where id_tb_phong = new.id_tb_phong;

    update tb_phong
    set so_luong = current_count,
        trang_thai = if(current_count >= max_count, '1', '0')
    where id_tb_phong = new.id_tb_phong;
    
    -- Chỉnh gioi_tinh_phong
    UPDATE tb_phong
    SET gioi_tinh_phong = (
        SELECT 
            CASE
                WHEN COUNT(DISTINCT sv.gioi_tinh) = 1 THEN MIN(sv.gioi_tinh)
                ELSE NULL
            END
        FROM tb_trong_phong tp
        JOIN tb_sinh_vien sv ON tp.ma_sinh_vien = sv.ma_sinh_vien
        WHERE tp.id_tb_phong = NEW.id_tb_phong
    )
    WHERE id_tb_phong = NEW.id_tb_phong;
end;
// delimiter ;

delimiter //
create trigger trg_after_delete_tb_trong_phong
after delete on tb_trong_phong
for each row
begin
	-- Chỉnh số lượng + trạng thái
    declare current_count int;
    declare max_count int;

    select count(*) into current_count from tb_trong_phong where id_tb_phong = old.id_tb_phong;
    select kich_thuoc_toi_da into max_count from tb_phong where id_tb_phong = old.id_tb_phong;

    update tb_phong
    set so_luong = current_count,
        trang_thai = if(current_count >= max_count, '1', '0')
    where id_tb_phong = old.id_tb_phong;
    
    -- Chỉnh gioi_tinh_phong
    UPDATE tb_phong
    SET gioi_tinh_phong = (
        SELECT 
            CASE
                WHEN COUNT(DISTINCT sv.gioi_tinh) = 1 THEN MIN(sv.gioi_tinh)
                ELSE NULL
            END
        FROM tb_trong_phong tp
        JOIN tb_sinh_vien sv ON tp.ma_sinh_vien = sv.ma_sinh_vien
        WHERE tp.id_tb_phong = OLD.id_tb_phong
    )
    WHERE id_tb_phong = OLD.id_tb_phong;
end;
// delimiter ;

delimiter // -- Tạo người dùng mới trước khi thêm nhân viên
create trigger trg_before_insert_tb_nhan_vien
before insert on tb_nhan_vien
for each row
begin
    insert into tb_nguoi_dung (ten_tai_khoan, mat_khau, quyen)
    values (new.sdt, new.sdt, 'nv');
    
    set new.id_tb_nguoi_dung = last_insert_id();
end;
// 
delimiter ;

