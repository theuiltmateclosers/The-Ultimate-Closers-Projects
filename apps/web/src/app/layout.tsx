import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Ultimate Closers',
  description: 'Closing éthique & IA consciente',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get('x-nonce') || undefined;

  return (
    <html lang="fr">
      <body>
        {/* Exemple: charger Sentry/Analytics avec le nonce */}
        {/* <Script id="sentry" nonce={nonce} src="https://browser.sentry-cdn.com/xyz.min.js" strategy="afterInteractive" /> */}
        {children}
      </body>
    </html>
  );
}
