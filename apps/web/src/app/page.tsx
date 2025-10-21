export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">The Ultimate Closers</h1>
        <p className="text-xl mb-8">Closing éthique & IA consciente</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Sécurité intégrée</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>CSP strict avec nonce dynamique</li>
            <li>Headers de sécurité (HSTS, X-Frame-Options, etc.)</li>
            <li>Rate limiting API</li>
            <li>Helmet.js protection</li>
            <li>Scans de sécurité automatisés (CodeQL, Semgrep, OSV)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
