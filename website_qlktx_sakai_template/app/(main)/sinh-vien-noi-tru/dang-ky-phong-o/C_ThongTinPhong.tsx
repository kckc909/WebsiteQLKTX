'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { tb_phong } from '@custom'

export default function C_Phong({
    phong,
    sltDangKy,
    onBack,
    onNext
}: {
    phong: tb_phong,
    sltDangKy: number,
    onBack: () => void,
    onNext: () => void
}) {
    const anhPhong = [
        '/custom/images/trang-chu/room.png'
    ]

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Button icon="pi pi-arrow-left" label="Quay lại" className="p-button-text"
                    onClick={
                        () => {
                            onBack()
                        }
                    } />
                <h2 className="text-xl font-bold text-center">THÔNG TIN PHÒNG {phong.ten_phong}</h2>
                <Button icon="pi pi-arrow-right" label="Tiếp tục" className="p-button-text"
                    onClick={
                        () => {
                            onNext();
                        }
                    } />
            </div>

            <div className="overflow-x-auto mb-6">
                <table className="w-full text-center border border-collapse border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Cơ sở</th>
                            <th className="border p-2">Tòa</th>
                            <th className="border p-2">Tầng</th>
                            <th className="border p-2">Loại phòng</th>
                            <th className="border p-2">Chỗ còn trống</th>
                            <th className="border p-2">Giới tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">{phong.co_so}</td>
                            <td className="border p-2">{phong.day_nha}</td>
                            <td className="border p-2">{phong.tang}</td>
                            <td className="border p-2">{phong.so_luong + sltDangKy}</td>
                            <td className="border p-2">{phong.kich_thuoc_toi_da}</td>
                            <td className="border p-2">{phong.gioi_tinh_phong}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-lg font-semibold text-center mb-4">MỘT SỐ HÌNH ẢNH</h3>
            <div className="flex justify-center">
                {anhPhong.map((src, idx) => (
                    <Image
                        key={idx}
                        src={src}
                        alt={`Hình phòng ${idx + 1}`}
                        width={600}
                        height={400}
                        className="rounded shadow"
                    />
                ))}
            </div>
        </div>
    )
}
