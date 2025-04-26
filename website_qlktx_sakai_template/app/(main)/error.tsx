'use client'

export default function Error() {
    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center min-w-full overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                    <img src="/custom/logo.png" alt="UTEHY logo" className="mb-1 w-48 flex-shrink-0" />
                    <div
                        className="rounded-[56px] p-1"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)",
                        }}
                    >
                        <div className="w-full bg-white py-8 px-5 sm:px-8 flex flex-col items-center rounded-[53px] shadow-lg">
                            <div className="flex justify-center items-center bg-pink-500 rounded-full h-12 w-12 mb-1">
                                <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                            </div>
                            <h1 className="text-gray-900 font-bold text-4xl mb-2">Đã xảy ra lỗi</h1>
                            {/* <div className="text-gray-600 mb-5">Something went wrong.</div> */}
                            <img src="/custom/images/error/asset-error.svg" alt="Error" className="mb-5 w-4/5" />
                            <button onClick={() => { window.location.href = '/' }} className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
                                <i className="pi pi-arrow-left mr-2"></i>
                                Về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}