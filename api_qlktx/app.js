// import lib
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import route_tb_bai_dang from './routes/tb_bai_dang.route.js';
import route_tb_gia_phong from './routes/tb_gia_phong.route.js';
import route_tb_hoa_don_dien_nuoc from './routes/tb_hoa_don_dien_nuoc.route.js';
import route_tb_hoa_don_phong from './routes/tb_hoa_don_phong.route.js';
import route_tb_nguoi_dung from './routes/tb_nguoi_dung.route.js';
import route_tb_nhan_vien from './routes/tb_nhan_vien.route.js';
import route_tb_phong from './routes/tb_phong.route.js';
import route_tb_sinh_vien from './routes/tb_sinh_vien.route.js';
import route_tb_so_dien_nuoc from './routes/tb_so_dien_nuoc.route.js';
import route_tb_trong_phong from './routes/tb_trong_phong.route.js';
import route_auth_login from './routes/auth.route.js';
import route_upload from './routes/upload.js';
import route_tb_dang_ky_phong from './routes/tb_dang_ky_phong.js';
// Declare 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000
const SERVER = process.env.SERVER || 'http://localhost';

// Settings
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
}))

// Routes
app.use('/tb_bai_dang', route_tb_bai_dang);
app.use('/tb_gia_phong', route_tb_gia_phong);   
app.use('/tb_hoa_don_dien_nuoc', route_tb_hoa_don_dien_nuoc);
app.use('/tb_hoa_don_phong', route_tb_hoa_don_phong);
app.use('/tb_nguoi_dung', route_tb_nguoi_dung);
app.use('/tb_nhan_vien', route_tb_nhan_vien);
app.use('/tb_phong', route_tb_phong);
app.use('/tb_sinh_vien', route_tb_sinh_vien);
app.use('/tb_so_dien_nuoc', route_tb_so_dien_nuoc);
app.use('/tb_trong_phong', route_tb_trong_phong);
app.use('/auth/login', route_auth_login);
app.use('/tb_dang_ky_phong', route_tb_dang_ky_phong);

// Uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/uploads', route_upload);

// Run
app.listen(PORT, () => {
    console.log(SERVER + ":" + PORT);
})