import { Metadata } from 'next';
import LayoutDashboard from '../../layout/LayoutDashboard';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Quản trị hệ thống ký túc xá UTEHY',
    description: 'Trang quản trị UTEHY DOM',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (   
        <LayoutDashboard>{children}</LayoutDashboard>
    )
}
