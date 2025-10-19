import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'dar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.ai': 'IA & Humain',
    'nav.testimonials': 'Témoignages',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Convertir sans forcer. Performer avec conscience.',
    'hero.subtitle': "L'alliance entre psychologie, IA et éthique pour une vente augmentée.",
    'hero.cta.primary': 'Découvrir notre approche',
    'hero.cta.secondary': 'Réserver un audit gratuit',
    
    // Mission
    'mission.title': "L'éthique comme stratégie.",
    'mission.text': "Chez The Ultimate Closers, chaque conversion est une conversation honnête. L'IA amplifie la compréhension, jamais la manipulation.",
    'mission.value1': 'Bienveillance',
    'mission.value2': 'Transparence',
    'mission.value3': 'Souveraineté',
    'mission.value4': 'Excellence',
    
    // Services
    'services.title': 'Des solutions humaines, soutenues par la technologie.',
    'services.card1.title': 'Closing à la performance',
    'services.card1.text': 'Payez uniquement quand vous signez.',
    'services.card2.title': 'Coaching & Scripts',
    'services.card2.text': 'Vente consciente et éthique.',
    'services.card3.title': 'Audit Funnel & IA',
    'services.card3.text': 'Analyse comportementale & automatisation.',
    'services.card4.title': 'Automatisation IA Darija',
    'services.card4.text': 'Une IA formée à votre culture.',
    
    // AI
    'ai.title': 'Une intelligence locale au service de votre croissance.',
    'ai.text': 'Notre IA Darija comprend vos émotions, votre culture et vos valeurs.',
    'ai.feature1': 'Chatbot empathique',
    'ai.feature2': 'CRM intelligent',
    'ai.feature3': 'LLM culturel',
    
    // Results
    'results.title': 'Des résultats mesurables, une éthique non négociable.',
    'results.metric1': '+70 % de taux de closing',
    'results.metric2': '0 % de forcing',
    'results.metric3': '100 % de satisfaction client',
    'results.quote': "L'éthique n'est pas un frein à la performance, c'est son fondement.",
    'results.author': 'A. Maredj',
    
    // Testimonials
    'testimonials.title': 'Ils nous ont fait confiance.',
    'testimonials.card1': "J'ai signé deux fois plus sans me sentir commerciale.",
    'testimonials.card2': 'They made my process human and efficient.',
    'testimonials.card3': 'خدمتهم راقية و فيها نية.',
    'testimonials.name1': 'Sofia',
    'testimonials.name2': 'Marc',
    'testimonials.name3': 'Yasmine',
    
    // CTA
    'cta.title': 'Prêt à transformer votre manière de vendre ?',
    'cta.button': 'Réserver un audit gratuit',
    
    // Footer
    'footer.quote': 'La sagesse dans la vente, la lumière dans la croissance.',
    'footer.legal': 'Mentions légales',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.ai': 'AI & Human',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Convert without pressure. Perform with conscience.',
    'hero.subtitle': 'Merging psychology, AI, and ethics to reinvent selling.',
    'hero.cta.primary': 'Discover our approach',
    'hero.cta.secondary': 'Book your free audit',
    
    // Mission
    'mission.title': 'Ethics as strategy.',
    'mission.text': 'At The Ultimate Closers, every conversion is an honest conversation. AI amplifies understanding, never manipulation.',
    'mission.value1': 'Benevolence',
    'mission.value2': 'Transparency',
    'mission.value3': 'Sovereignty',
    'mission.value4': 'Excellence',
    
    // Services
    'services.title': 'Human solutions, powered by technology.',
    'services.card1.title': 'Performance-based closing',
    'services.card1.text': 'Pay only when you sign.',
    'services.card2.title': 'Coaching & Scripts',
    'services.card2.text': 'Conscious and ethical selling.',
    'services.card3.title': 'Funnel & AI Audit',
    'services.card3.text': 'Behavioral analysis & automation.',
    'services.card4.title': 'Darija AI Automation',
    'services.card4.text': 'An AI trained on your culture.',
    
    // AI
    'ai.title': 'Local intelligence serving your growth.',
    'ai.text': 'Our Darija AI understands your emotions, culture, and values.',
    'ai.feature1': 'Empathetic chatbot',
    'ai.feature2': 'Smart CRM',
    'ai.feature3': 'Cultural LLM',
    
    // Results
    'results.title': 'Measurable results, non-negotiable ethics.',
    'results.metric1': '+70% closing rate',
    'results.metric2': '0% pressure',
    'results.metric3': '100% client satisfaction',
    'results.quote': 'Ethics is not a barrier to performance, it is its foundation.',
    'results.author': 'A. Maredj',
    
    // Testimonials
    'testimonials.title': 'They trusted us.',
    'testimonials.card1': 'I signed twice as much without feeling pushy.',
    'testimonials.card2': 'They made my process human and efficient.',
    'testimonials.card3': 'Their service is premium and intentional.',
    'testimonials.name1': 'Sofia',
    'testimonials.name2': 'Marc',
    'testimonials.name3': 'Yasmine',
    
    // CTA
    'cta.title': 'Ready to transform the way you sell?',
    'cta.button': 'Book your free audit',
    
    // Footer
    'footer.quote': 'Wisdom in sales, light in growth.',
    'footer.legal': 'Legal',
  },
  dar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.ai': 'الذكاء الاصطناعي',
    'nav.testimonials': 'الشهادات',
    'nav.contact': 'تواصل',
    
    // Hero
    'hero.title': 'نحوّل الزبائن بلا ضغط، و نخدمو بالنية و الفهم.',
    'hero.subtitle': 'البيع الواعي بالذكاء الاصطناعي و النية الصافية.',
    'hero.cta.primary': 'اكتشف طريقتنا',
    'hero.cta.secondary': 'دير معانا مكالمة مجانية',
    
    // Mission
    'mission.title': 'النية الصافية هي الاستراتيجية.',
    'mission.text': 'عندنا في The Ultimate Closers، كل عملية بيع هي محادثة صادقة. الذكاء الاصطناعي يعزز الفهم، ماشي التلاعب.',
    'mission.value1': 'النية الطيبة',
    'mission.value2': 'الشفافية',
    'mission.value3': 'الاستقلالية',
    'mission.value4': 'التميز',
    
    // Services
    'services.title': 'حلول إنسانية مدعومة بالتكنولوجيا.',
    'services.card1.title': 'البيع على الأداء',
    'services.card1.text': 'تخلص فقط كي توقع.',
    'services.card2.title': 'التدريب و السكريبتات',
    'services.card2.text': 'بيع واعي و أخلاقي.',
    'services.card3.title': 'تحليل الفانل و الذكاء الاصطناعي',
    'services.card3.text': 'تحليل سلوكي و أتمتة.',
    'services.card4.title': 'أتمتة بالذكاء الاصطناعي بالدارجة',
    'services.card4.text': 'ذكاء اصطناعي متدرب على ثقافتك.',
    
    // AI
    'ai.title': 'ذكاء اصطناعي محلي في خدمة نموك.',
    'ai.text': 'الذكاء الاصطناعي ديالنا بالدارجة يفهم عواطفك و ثقافتك و قيمك.',
    'ai.feature1': 'شات بوت متفاهم',
    'ai.feature2': 'CRM ذكي',
    'ai.feature3': 'ذكاء اصطناعي ثقافي',
    
    // Results
    'results.title': 'نتائج قابلة للقياس، و أخلاق غير قابلة للتفاوض.',
    'results.metric1': '+70% نسبة البيع',
    'results.metric2': '0% ضغط',
    'results.metric3': '100% رضا العملاء',
    'results.quote': 'الأخلاق ماشي عائق للنجاح، هي أساسه.',
    'results.author': 'أ. مارج',
    
    // Testimonials
    'testimonials.title': 'وثقوا فينا.',
    'testimonials.card1': 'وقعت ضعف العقود بلا ما نحس روحي كومرسيال.',
    'testimonials.card2': 'خلاو العملية ديالي إنسانية و فعالة.',
    'testimonials.card3': 'خدمتهم راقية و فيها نية.',
    'testimonials.name1': 'صوفيا',
    'testimonials.name2': 'مارك',
    'testimonials.name3': 'ياسمين',
    
    // CTA
    'cta.title': 'جاهز تبدل طريقة البيع تاعك؟',
    'cta.button': 'دير معانا مكالمة مجانية',
    
    // Footer
    'footer.quote': 'الحكمة في البيع، النور في النمو.',
    'footer.legal': 'قانوني',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
