import Link from "next/link";

interface NavItemProps {
    href: string
    icon: string
    bgColor: string
    title: string
    description: string
}

const NavItem = ({ href, icon, bgColor, title, description }: NavItemProps) => (
    <Link
        href={href}
        className="w-full flex items-center py-5 border-gray-300 border-b"
    >
        <span
            className={`flex justify-center items-center ${bgColor} rounded-full h-14 w-14`}
        >
            <i className={`pi pi-fw ${icon} text-white text-2xl`}></i>
        </span>
        <span className="ml-4 flex flex-col">
            <span className="text-gray-900 lg:text-xl font-medium mb-1">{title}</span>
            <span className="text-gray-600 lg:text-lg">{description}</span>
        </span>
    </Link>)

export default function ErrorPath() {
    return (
        <div>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen min-w-full overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="mb-1 w-48 flex-shrink-0"
                    />
                    <div
                        className="rounded-[56px] p-1"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)",
                        }}
                    >
                        <div className="w-full bg-white py-8 px-5 sm:px-8 flex flex-col items-center rounded-[53px] shadow-lg">
                            <span className="text-blue-500 font-bold text-3xl">404</span>
                            <h1 className="text-gray-900 font-bold text-4xl mb-2">Not Found</h1>
                            <div className="text-gray-600 mb-5">
                                Đường dẫn không tồn tại
                            </div>

                            {/* Link Item */}
                            <NavItem
                                href="/"
                                icon="pi-table"
                                bgColor="bg-cyan-400"
                                title="Về trang chủ"
                                description=""
                            />
                            <NavItem
                                href="/"
                                icon="pi-question-circle"
                                bgColor="bg-orange-400"
                                title="Tới trang hỗ trợ"
                                description=""
                            />
                            <NavItem
                                href="/"
                                icon="pi-unlock"
                                bgColor="bg-indigo-400"
                                title="Tới trang đăng nhập"
                                description=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

