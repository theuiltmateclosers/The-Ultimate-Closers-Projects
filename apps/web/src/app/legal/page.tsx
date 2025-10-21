import Legal from '@/components/Legal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales & Politique de Confidentialité | The Ultimate Closers',
  description:
    'Politique de confidentialité, mentions légales et politique de sécurité conformes RGPD pour The Ultimate Closers. Protection des données, cookies et droits utilisateurs.',
  keywords:
    'RGPD, confidentialité, IA, closing, éthique, sécurité données, mentions légales, politique cookies, protection données',
};

export default function LegalPage() {
  return <Legal />;
}
