'use client';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { ChartData, ChartOptions } from 'chart.js';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { randomInt } from 'crypto';
import FeatureTitle from '@components/FeatureTitle';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};
// ✅ 1. Thông tin tổng quan (Widgets/Stats)
// Hiển thị dưới dạng thẻ số liệu hoặc icon box, thường đặt trên đầu:
// 🔢 Số sinh viên đang ở: Ví dụ: 320 sinh viên
// 🏠 Số phòng còn trống: Ví dụ: 12 phòng
// 📑 Số đơn đăng ký chờ duyệt: Ví dụ: 24 đơn
// 💡 Công nợ điện nước tháng này: Ví dụ: 15 triệu đồng
// 👨‍💼 Số nhân viên đang hoạt động: Ví dụ: 5 nhân viên
// ✅ 2. Các bảng / biểu đồ quan trọng
// Hiển thị dưới phần tổng quan:
// 🟠 Bảng "Đơn đăng ký mới nhất"
// Hiển thị 5-10 đơn gần đây để admin duyệt nhanh.
// Cột: Mã SV, Họ tên, Phòng đăng ký, Ngày đăng ký, Trạng thái, Thao tác (duyệt/từ chối)
// 🟢 Biểu đồ phòng
// Biểu đồ tròn (Pie Chart): Tỷ lệ phòng đã đầy / còn trống.
// Biểu đồ cột: Số lượng sinh viên mỗi khu (Khu A, Khu B, Khu C…).
// 🔵 Thông báo gần đây
// Hiển thị 5-6 tin thông báo mới nhất.
// Có nút "Xem tất cả" dẫn về trang quản lý tin tức.
// ✅ 3. Chức năng nhanh (Quick Actions)
// Góc phải hoặc bên dưới:
// ➕ Thêm sinh viên
// 📝 Tạo đơn đăng ký phòng
// 📢 Tạo thông báo mới
// 📊 Xem thống kê chi tiết
// ✅ 4. Tùy chọn nâng cao (nếu muốn mở rộng)
// 📅 Lịch sự kiện (nhắc lịch đóng tiền điện/nước)

// 📈 Biểu đồ doanh thu từ tiền phòng, tiền điện nước
// 🚪 Lịch sử ra vào phòng gần đây
const Dashboard = () => {

    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const [tongSoSinhVien, setTongSoSinhVien] = useState(342);
    const [soPhongTrong, setSoPhongTrong] = useState(12);
    const [soDangKyChuaXuLy, setSoDangKyChuaXuLy] = useState(0);
    const [soHoaDonChuaThanhToan, setSoHoaDonChuaThanhToan] = useState(3);

    const chartData = {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
        datasets: [
            {
                label: 'Lượt ra',
                backgroundColor: '#42A5F5',
                data: [10, 14, 8, 6, 12],
            },
            {
                label: 'Lượt vào',
                backgroundColor: '#66BB6A',
                data: [9, 13, 7, 8, 11],
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê lượt ra vào phòng',
            },
        },
    };

    return (
        <>
            <Card className="">
                <FeatureTitle title={'Tổng quan'} ></FeatureTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                    <Card className="hover:shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/ql-sinh-vien')}>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Tổng số sinh viên</span>
                            <i className="pi pi-users text-2xl text-primary" />
                        </div>
                        <div className="text-3xl font-bold mt-2 text-blue-500">{tongSoSinhVien}</div>
                    </Card>

                    <Card className="hover:shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/ql-phong')}>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Phòng còn trống</span>
                            <i className="pi pi-home text-2xl text-green-500" />
                        </div>
                        <div className="text-3xl font-bold mt-2 text-green-500">{soPhongTrong}</div>
                    </Card>

                    <Card className="hover:shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/ql-dang-ky-phong')}>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Đăng ký chưa xử lý</span>
                            <i className="pi pi-inbox text-2xl text-orange-500" />
                        </div>
                        <div className="text-3xl font-bold mt-2 text-orange-500">{soDangKyChuaXuLy}</div>
                    </Card>

                    <Card className="hover:shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/ql-hoa-don')}>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Hóa đơn chưa thanh toán</span>
                            <i className="pi pi-credit-card text-2xl text-red-500" />
                        </div>
                        <div className="text-3xl font-bold mt-2 text-red-500">{soHoaDonChuaThanhToan}</div>
                    </Card>
                </div>

                <Card>
                    <div className="text-xl font-semibold mb-3">Biểu đồ lượt ra vào phòng</div>
                    <Chart type="bar" data={chartData} options={chartOptions} />
                </Card>
            </Card>

        </>
    );
};

export default Dashboard;
