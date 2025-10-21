import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Ultimate Closers | Closing éthique & IA consciente',
  description: "L'alliance entre psychologie, IA et éthique pour une vente augmentée.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'The Ultimate Closers',
    description: 'Closing éthique & IA consciente',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get('x-nonce') || undefined;

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {/* Exemple: charger Sentry/Analytics avec le nonce */}
        {/* <Script id="sentry" nonce={nonce} src="https://browser.sentry-cdn.com/xyz.min.js" strategy="afterInteractive" /> */}
        {children}
      </body>
    </html>
  );
}
