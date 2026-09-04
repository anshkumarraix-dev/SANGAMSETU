import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-hindi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SangamSetu - Innovation Procurement Platform',
  description: 'Government of India initiative connecting departments with DPIIT-recognized startups through transparent AI scoring, testing, and pilot scaling.',
  openGraph: {
    title: 'SangamSetu - Innovation Procurement Platform',
    description: 'Government of India initiative connecting departments with DPIIT-recognized startups through transparent AI scoring, testing, and pilot scaling.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SangamSetu - Innovation Procurement Platform',
    description: 'Government of India initiative connecting departments with DPIIT-recognized startups through transparent AI scoring, testing, and pilot scaling.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable} ${notoSansDevanagari.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
