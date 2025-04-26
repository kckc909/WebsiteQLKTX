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

const Dashboard = () => {
    
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const [tongSoSinhVien, setTongSoSinhVien] = useState(0);
    const [soPhongTrong, setSoPhongTrong] = useState(0);
    const [soDangKyChuaXuLy, setSoDangKyChuaXuLy] = useState(0);
    const [soHoaDonChuaThanhToan, setSoHoaDonChuaThanhToan] = useState(0);

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
            <Card className="p-4">
                <div className="text-2xl font-semibold mb-4">Tổng quan hệ thống</div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                    <Card className="hover:shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/ql-sinh-vien')}>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Tổng số sinh viên</span>
                            <i className="pi pi-users text-2xl text-primary" />
                        </div>
                        <div className="text-3xl font-bold mt-2">{tongSoSinhVien}</div>
                    </Card>

                    <Card className="hover:shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/ql-phong')}>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Phòng còn trống</span>
                            <i className="pi pi-home text-2xl text-green-500" />
                        </div>
                        <div className="text-3xl font-bold mt-2">{soPhongTrong}</div>
                    </Card>

                    <Card className="hover:shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/ql-dang-ky-phong')}>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Đăng ký chưa xử lý</span>
                            <i className="pi pi-inbox text-2xl text-orange-500" />
                        </div>
                        <div className="text-3xl font-bold mt-2">{soDangKyChuaXuLy}</div>
                    </Card>

                    <Card className="hover:shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/ql-hoa-don')}>
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Hóa đơn chưa thanh toán</span>
                            <i className="pi pi-credit-card text-2xl text-red-500" />
                        </div>
                        <div className="text-3xl font-bold mt-2">{soHoaDonChuaThanhToan}</div>
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
