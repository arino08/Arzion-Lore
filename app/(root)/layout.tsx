import Navbar from "../../components/Navbar";
import { SanityProvider } from '@/components/SanityProvider';
export default function Layout({children}: Readonly<{children: React.ReactNode}> ) {
    return (
        <SanityProvider>
            <main className="font-work-sans">
                <Navbar />
                {children}
            </main>
        </SanityProvider>
    )
}