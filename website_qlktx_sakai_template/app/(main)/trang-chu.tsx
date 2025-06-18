import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import Link from 'next/link';
import { apiBaseUrl } from 'app/api/baseUrl';

const newsList = [
    {
        title: "Nhiệt liệt chào mừng đại hội đại biểu Đảng bộ",
        image: apiBaseUrl + "/uploads/tin-tuc/i1.png",
        link: "/"
    },
    {
        title: "Tư vấn hướng nghiệp - Kỹ năng mềm cho sinh viên",
        image: apiBaseUrl + "/uploads/tin-tuc/i2.png",
        link: "/"
    },
    {
        title: "Đại hội đại biểu Đảng bộ Trường Đại học SPKTHY",
        image: apiBaseUrl + "/uploads/tin-tuc/i3.png",
        link: "/"
    },
    {
        title: "Lễ ra quân mùa hè xanh 2025",
        image: apiBaseUrl + "/uploads/tin-tuc/i4.png",
        link: "/"
    },
    {
        title: "Cuộc thi Robocon 2025",
        image: apiBaseUrl + "/uploads/tin-tuc/i5.png",
        link: "/"
    },
    {
        title: "Hoạt động tuyên truyền phòng cháy chữa cháy",
        image: apiBaseUrl + "/uploads/tin-tuc/i6.jpg",
        link: "/"
    }
];

const partners = [
    {
        image: "/custom/images/trang-chu/viettinbank.png",
        title: "VietinBank",
        link: "https://vietinbank.vn"
    },
    {
        image: "/custom/images/trang-chu/mbbank.png",
        title: "MB Bank",
        link: "https://mbbank.com.vn"
    },
    {
        image: "/custom/images/trang-chu/tdhspkthy.png",
        title: "Trường Đại học Sư phạm Kỹ thuật Hưng Yên",
        link: "https://utehy.edu.vn/"
    }, {
        image: "/custom/images/trang-chu/cntt.png",
        title: "Khoa Công nghệ Thông tin",
        link: "https://utehy.edu.vn/"
    },
];

export default function HomePage() {
    const slideImages = [
        '/custom/images/trang-chu/slide1.png',
        '/custom/images/trang-chu/slide2.jpg',
        '/custom/images/trang-chu/slide3.jpg',
    ];

    const statistics = [
        { count: '3000+', label: 'Sinh viên nội trú' },
        { count: '1000+', label: 'Miễn giảm lệ phí' },
        { count: '300+', label: 'Phòng ở' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
    const nextSlide = () => setCurrentSlide((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));

    // Auto slide chuyển động sau 3 giây
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearTimeout(timer);
    }, [currentSlide, slideImages.length]);


    return (
        <div className="flex flex-col w-full">
            {/* Slide ảnh */}
            <div className="relative group w-full">
                <Image
                    src={slideImages[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    width={1920}
                    height={600}
                    className="w-full object-cover h-[600px] transition-all duration-500"
                />
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/30 group-hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                    aria-label="Previous slide"
                >
                    &#8592;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/30 group-hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                    aria-label="Next slide"
                >
                    &#8594;
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slideImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full border border-white ${currentSlide === idx ? 'bg-white' : 'bg-transparent'} transition`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Thống kê */}
            <section
                className="w-full py-12"
                style={{
                    background: "linear-gradient(135deg, rgb(255, 0, 0) 0%, rgb(47, 147, 204) 65%)"
                }}
            >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-around">
                    {statistics.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-white">
                            <span className="text-6xl font-bold drop-shadow">{stat.count}</span>
                            <span className="text-lg font-medium drop-shadow">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quảng cáo */}
            <div
                className="relative w-full h-[600px] flex items-center justify-center mb-3"
                style={{
                    backgroundImage: `url(${'/custom/images/trang-chu/bg_qc.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 "></div>
                <div className="relative flex flex-col justify-content-end h-full w-full max-w-6xl pb-24">
                    <h2 className="text-3xl font-bold text-red-700 p-4">Tham quan trực tuyến ký túc xá</h2>
                    <div className="flex items-center gap-4 pl-4">
                        <button className="w-14 h-14 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700  shadow-lg" aria-label="Xem video giới thiệu">
                            <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
                                <circle cx="24" cy="24" r="24" fill="#fff" fillOpacity="0.15" />
                                <path d="M20 16L32 24L20 32V16Z" fill="#fff" />
                            </svg>
                        </button>
                        <p className="text-lg font-medium text-white">Video về ký túc xá</p>
                    </div>
                </div>
            </div>

            {/* Tin tức */}
            <div className="w-full max-w-6xl mx-auto px-2 my-6">
                <div className='flex mb-6 '>
                    <div className="text-4xl text-blue-700 font-bold">
                        Tin tức
                    </div>
                    <div className="text-4xl font-bold">
                        -
                    </div>
                    <div className="text-4xl text-red-400 font-bold">
                        Sự kiện
                    </div>
                </div>
                <div className="w-full max-w-6xl mx-auto px-2 mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {newsList.map((news, idx) => (
                            <Link
                                href={news.link}
                                key={idx}
                                className="relative group rounded-lg overflow-hidden min-h-[160px] shadow-md flex"
                            >
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <h4 className="text-white text-lg font-semibold drop-shadow">{news.title}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feedback */}
            <div className="relative bg-cover bg-center py-24" style={{ backgroundImage: `url('/custom/images/trang-chu/bg_fb.jpg')` }}>
                <div className="max-w-xl bg-white ml-24 p-5 rounded shadow">
                    <blockquote className="italic">
                        "Cơ sở vật chất của ký túc xá rất khang trang và tiện nghi, tạo ra môi trường sống thoải mái và thuận lợi cho sinh viên."
                    </blockquote>
                    <div className="mt-4 flex items-center gap-4">
                        <Image src="/custom/duck.png" alt="avatar" width={40} height={40} className="rounded-full" />
                        <div>
                            <div className="font-bold">Trần Quang Minh Đức</div>
                            <div className="text-sm text-gray-600">Sinh viên Trường Đại học SPKTHY</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Đối tác */}
            <div className="bg-[#fefefe] py-10 text-center ">
                <div className="text-4xl font-bold mb-6 text-green-800">
                    Đối tác
                </div>
                <div>
                    <ul className="flex flex-wrap gap-6 justify-content-around">
                        {partners.map((partner, idx) => (
                            <li key={partner.title + idx} className="flex flex-col items-center">
                                <a href={partner.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={partner.image}
                                        alt={partner.title}
                                        className="w-24 h-24 object-contain mb-2 hover:scale-110 transition-transform duration-300"
                                    />
                                </a>
                                <span className="text-base font-medium">{partner.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Maps */}
            <div>

                <div className="flex flex-row gap-6 py-5 justify-center">
                    {/* Dòng 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 text-sm text-left md:text-right">
                            <div><b>Cơ sở 1:</b> Ký túc xá Đại học SPKT Hưng Yên CS1</div>
                            <div><b>Điện thoại:</b> 0934 206 983</div>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2636.5575945131404!2d106.00570357402805!3d20.84561300165985!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135bbe260966dd5%3A0x42b6a698976fa5ea!2zS8O9IHTDumMgeMOhIHRyxrDhu51uZyBESFNQS1QgSMawbmcgWcOqbg!5e0!3m2!1svi!2s!4v1749911716556!5m2!1svi!2s"
                                width="504"
                                height="378"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Map 1"
                            />
                        </div>
                    </div>
                    {/* Dòng 2 */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 text-sm text-left md:text-right">
                            <div><b>Cơ sở 2:</b> Ký túc xá Đại học SPKT Hưng Yên CS2</div>
                            <div><b>Điện thoại:</b> 0987 654 321</div>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3726.2561772303497!2d106.060003!3d20.942225!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a47fb0bc86b1%3A0xd9f1b34ea05c931c!2zS1RYIHRyxrDhu51uZyDEkOG6oWkgaOG7jWMgU8awIHBo4bqhbSBL4bu5IHRodeG6rXQgSMawbmcgWcOqbg!5e0!3m2!1svi!2sus!4v1749912553028!5m2!1svi!2sus"
                                width="504"
                                height="378"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Map 2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
