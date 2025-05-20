'use client';

import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Image from 'next/image';

export default function HomePage() {
    const images = [
        { src: '/custom/slide1.jpg' },
        { src: '/custom/slide2.jpg' },
        { src: '/custom/slide3.jpg' }
    ];

    const statistics = [
        { label: 'Tổng số phòng', value: 120 },
        { label: 'Số sinh viên đang ở', value: 450 },
        { label: 'Phòng còn trống', value: 15 }
    ];

    const feedbacks = [
        { name: 'Nguyễn Văn A', comment: 'Ký túc xá sạch sẽ, tiện nghi và an toàn.' },
        { name: 'Trần Thị B', comment: 'Dịch vụ hỗ trợ rất nhiệt tình, cảm thấy như ở nhà.' }
    ];

    const imageTemplate = (item: any) => (
        <div className="w-full h-64 relative">
            <Image src={item.src} alt="Slide" layout="fill" className="object-cover rounded-xl" />
        </div>
    );

    return (
        <div className="flex flex-col gap-6 px-4 py-6">
            {/* Slide hình ảnh */}
            <div className="container mx-auto">
                <Carousel value={images} itemTemplate={imageTemplate} numVisible={1} circular autoplayInterval={5000} />
            </div>

            {/* Thống kê nhanh */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {statistics.map((item, i) => (
                    <Card key={i} className="shadow-lg">
                        <div className="text-3xl font-bold text-red-600">{item.value}</div>
                        <div className="text-gray-600">{item.label}</div>
                    </Card>
                ))}
            </div>

            {/* Feedback */}
            <div className="container mx-auto bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">CẢM NHẬN SINH VIÊN</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feedbacks.map((f, i) => (
                        <div key={i} className="p-4 border-l-4 border-red-600 bg-gray-50 rounded">
                            <p className="italic">“{f.comment}”</p>
                            <p className="text-right font-semibold mt-2">– {f.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tin tức & Thông báo */}
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="col-span-2">
                    <Card title="TIN TỨC - SỰ KIỆN" className="shadow">
                        <ul className="list-disc pl-5 text-sm">
                            <li><a href="#" className="hover:text-red-600 font-medium">Hướng dẫn đăng ký phòng năm học mới</a></li>
                            <li><a href="#" className="hover:text-red-600 font-medium">Hoạt động ngoại khóa tháng 5</a></li>
                        </ul>
                    </Card>
                </div>
                <div>
                    <Card title="THÔNG BÁO" className="shadow">
                        <ul className="text-sm space-y-2">
                            <li>→ Hạn cuối đóng tiền tháng này</li>
                            <li>→ Lịch bảo trì hệ thống điện</li>
                        </ul>
                    </Card>
                </div>
            </div>

            {/* Giới thiệu KTX */}
            <div className="container mx-auto bg-white rounded-2xl shadow p-6 text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-600">GIỚI THIỆU KÝ TÚC XÁ</h2>
                <p className="text-gray-700">
                    Ký túc xá hiện đại, tiện nghi, đầy đủ các khu vực sinh hoạt, thể thao, internet tốc độ cao...
                </p>
            </div>

            {/* Thư viện ảnh */}
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">HÌNH ẢNH KÝ TÚC XÁ</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Image src="/custom/phong1.jpg" width={300} height={200} alt="Phong 1" className="rounded-xl" />
                    <Image src="/custom/phong2.jpg" width={300} height={200} alt="Phong 2" className="rounded-xl" />
                    <Image src="/custom/kv1.jpg" width={300} height={200} alt="Khuôn viên 1" className="rounded-xl" />
                    <Image src="/custom/kv2.jpg" width={300} height={200} alt="Khuôn viên 2" className="rounded-xl" />
                </div>
            </div>

            {/* CTA đăng ký phòng */}
            <div className="text-center mt-8">
                <Button label="ĐĂNG KÝ PHÒNG Ở NGAY" className="p-button-lg p-button-danger" onClick={() => window.location.href = "/dang-ky-phong"} />
            </div>
        </div>
    );
}
