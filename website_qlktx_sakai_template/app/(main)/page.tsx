'use client'

import Image from "next/image"
import Login from "./auth/login/page"

export default function HomePage() {
    return (
        <Login />

        // <>
        //     <div className="flex flex-col gap-5">
        //         {/* Banner */}
        //         <div className="w-full">
        //             <Image src="/custom/bg_header.png" alt="Banner" width={1920} height={500} className="w-full object-cover" />
        //         </div>

        //         {/* Tin tức - Thông báo */}
        //         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
        //             {/* Tin tức */}
        //             <div className="col-span-2">
        //                 <div className="bg-white rounded-2xl shadow p-4">
        //                     <h2 className="text-xl font-bold border-b mb-3 pb-2 text-red-600">TIN TỨC - SỰ KIỆN</h2>
        //                     <ul className="flex flex-col gap-3">
        //                         <li className="border-b pb-2">
        //                             <a href="#" className="font-semibold hover:text-red-600">Hướng dẫn đăng ký phòng ký túc xá năm học 2025</a>
        //                             <p className="text-gray-500 text-sm">Ngày đăng: 05/04/2025</p>
        //                         </li>
        //                         <li className="border-b pb-2">
        //                             <a href="#" className="font-semibold hover:text-red-600">Thông báo chiêu sinh CLB thể thao KTX</a>
        //                             <p className="text-gray-500 text-sm">Ngày đăng: 03/04/2025</p>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>

        //             {/* Thông báo nhanh */}
        //             <div>
        //                 <div className="bg-white rounded-2xl shadow p-4">
        //                     <h2 className="text-xl font-bold border-b mb-3 pb-2 text-red-600">THÔNG BÁO</h2>
        //                     <ul className="flex flex-col gap-2 text-sm">
        //                         <li>→ Hạn cuối đóng tiền phòng tháng 4</li>
        //                         <li>→ Cập nhật lịch bảo trì điện nước</li>
        //                         <li>→ Lịch hoạt động ngoại khóa tháng 4</li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* Giới thiệu ký túc xá */}
        //         <div className="container mx-auto">
        //             <div className="bg-white rounded-2xl shadow p-6 text-center">
        //                 <h2 className="text-2xl font-bold mb-4 text-red-600">GIỚI THIỆU KÝ TÚC XÁ</h2>
        //                 <p className="text-gray-700 leading-relaxed">
        //                     Ký túc xá Trường Đại học Sư phạm Kỹ thuật Hưng Yên là nơi cung cấp chỗ ở tiện nghi, hiện đại và an toàn cho sinh viên. Với nhiều tiện ích như: Phòng ở sạch đẹp, khu sinh hoạt chung, khu thể thao, internet tốc độ cao...
        //                 </p>
        //             </div>
        //         </div>

        //         {/* Hình ảnh hoạt động */}
        //         <div className="container mx-auto">
        //             <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">HÌNH ẢNH HOẠT ĐỘNG</h2>
        //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        //             </div>
        //         </div>
        //     </div>
        // </>
    )
}

// trang chủ trên có slide giới thiệu, số lượng phòng 