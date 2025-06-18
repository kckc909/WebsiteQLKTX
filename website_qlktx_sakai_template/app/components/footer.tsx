// Cột giới thiệu : chính sách, điều khoản, thông tin về chúng tôi, 
// Địa chỉ : địa chỉ ký túc xá, có bản đổ (khi nhấn vào thì sang trang google map)
// Liên hệ : số điện thoại 
// Mạng xã hội : facebook, zalo, youtube

import Link from "next/link";

const col_gt = [
    "Điền nội dung giới thiệu ở đây...",
    "Thông tin về chúng tôi",
    "Chính sách & Điều khoản"
];

const col_lh = [
    { icon: "pi pi-facebook", label: "Facebook", link: "/" }
];

const col_mxh = [
    { icon: "pi pi-facebook", label: "Facebook", link: "https://www.facebook.com/utehy.org" },
];

const Footer = () => {
    return (
        <>
            <footer className="w-full bg-gray-900 text-white py-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
                    {/* Cột 1: Logo & Social */}
                    <div className="flex flex-col items-center md:items-start">
                        <img src="/custom/logo.png" alt="Logo" className="w-20 h-20 mb-4" />
                        <div className="flex gap-4 mb-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                                <i className="pi pi-facebook text-2xl"></i>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                                <i className="pi pi-youtube text-2xl"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
                                <i className="pi pi-twitter text-2xl"></i>
                            </a>
                        </div>
                        <div className="text-sm">
                            <b>Liên hệ</b><br />
                            Địa chỉ: ĐT379, Dân Tiến, Khoái Châu, Hưng Yên, Việt Nam<br />
                            Điện thoại: 0221.3689.888<br />
                            Email: kckc253261@gmail.com
                        </div>
                    </div>

                    {/* Cột 2: Giới thiệu */}
                    <div>
                        <h3 className="text-lg font-bold uppercase mb-4">Giới thiệu</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:underline">Về Trường Đại học SPKT Hưng Yên</a></li>
                            <li><a href="/" className="hover:underline">Tổ chức đoàn thể</a></li>
                            <li><a href="/" className="hover:underline">Công đoàn</a></li>
                            <li><a href="/" className="hover:underline">Chi đoàn</a></li>
                            <li><a href="/" className="hover:underline">Hội cựu chiến binh</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold uppercase mb-4">Đơn vị trực thuộc</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:underline">Phòng Quản trị - Thiết bị</a></li>
                            <li><a href="/" className="hover:underline">Phòng Chăm sóc sức khỏe</a></li>
                            <li><a href="/" className="hover:underline">Phòng An ninh trật tự</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold uppercase mb-4">Ban quản lý KTX</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:underline">Ký túc xá CS1</a></li>
                            <li><a href="/" className="hover:underline">Ký túc xá CS2</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
            <div className="text-center bg-gray-800 py-2 text-sm text-gray-500">
                © 2025 - Chu Đức Minh
            </div>
        </>
    );
};

export default Footer;
