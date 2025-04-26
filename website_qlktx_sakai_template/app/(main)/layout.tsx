import { Metadata } from 'next';
import LayoutDashboard from '../../layout/LayoutDashboard';
import Header from '../components/header';
import Footer from '../components/footer';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Ký túc xá UTEHY',
    description: 'UTEHY DOM',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    icons: {
        icon: '/custom/logo.png'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    )
}
