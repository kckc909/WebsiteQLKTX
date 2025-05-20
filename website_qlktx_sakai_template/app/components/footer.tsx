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
        <footer className="bg-gray-700 w-full text-white pt-5">
            <div className="grid grid-cols-4 m-0 px-10">
                {/* Logo ? */}
                <div>
                
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Địa chỉ</h3>
                    <ul className="list-none space-y-1">
                        {col_gt.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Liên hệ</h3>
                    <ul className="list-none space-y-1">
                        {col_lh.map((item, index) => (
                            <li key={index}>{item.label}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Mạng xã hội</h3>
                    <div className="flex gap-3">
                        {col_mxh.map((item, index) => (
                            <Link href={item.link} target="_blank">
                                <i key={index} className={`${item.icon} text-2xl`} title={item.label}>
                                </i>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="">
                <p className="text-sm text-center text-xs font-light my-2">
                    &copy; 2025 - Chu đức Minh
                </p>
            </div>
        </footer>
    );
};

export default Footer;
