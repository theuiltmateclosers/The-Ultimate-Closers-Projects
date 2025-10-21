import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

export function middleware(req: NextRequest) {
  const nonce = crypto.randomBytes(16).toString('base64');

  // Passe le nonce au client (en header) pour l'utiliser dans <Script nonce=...>
  const res = NextResponse.next({
    request: { headers: req.headers },
  });
  res.headers.set('x-nonce', nonce);

  // --- CSP PRÊTE À COLLER (ajuste domains selon tes besoins) ---
  // Utilise 'strict-dynamic' pour autoriser les scripts chargés par des scripts de confiance.
  // Ajoute les domaines (analytics, fonts, img CDN, API) que tu utilises réellement.
  const csp = [
    `default-src 'self'`,
    // Autorise scripts du même domaine + nonce + strict-dynamic. Interdit 'unsafe-inline'.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:`,
    // Styles autorisés; si tu utilises inline styles de Tailwind (rare), garde 'unsafe-inline'
    `style-src 'self' 'unsafe-inline' https:`,
    // Images depuis self, data (logos inline), et tes CDN
    `img-src 'self' data: https:`,
    // Fonts (Google Fonts si nécessaire)
    `font-src 'self' https: data:`,
    // Connections (API Nest, Sentry, analytics)
    `connect-src 'self' https://theultimateclosers.com https://api.theultimateclosers.com https://o123.ingest.sentry.io`,
    // Frames (évite sauf paiement/embeds nécessaires)
    `frame-src 'self'`,
    // Bloque tout objet
    `object-src 'none'`,
    // Empêche le site d'être en iframe (cliquejacking)
    // X-Frame-Options est redondant si frame-ancestors est présent
    `frame-ancestors 'none'`,
    // Désactive sniffing
    // X-Content-Type-Options: nosniff (ajouté en header séparé ci-dessous)
    // Balance le rapport (optionnel)
    // `report-uri https://report.theultimateclosers.com/csp`
  ].join('; ');

  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
