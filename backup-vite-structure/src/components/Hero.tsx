import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-cosmic.jpg';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 77, 68, 0.85), rgba(18, 18, 18, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Animated particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary rounded-full animate-particle-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Neural halo effect */}
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-primary/20 backdrop-blur-sm border border-secondary/30">
            <Sparkles className="w-5 h-5 text-secondary animate-glow-pulse" />
            <span className="font-inter text-sm text-secondary font-medium">
              Closing Éthique & IA Consciente
            </span>
          </div>

          {/* Main title */}
          <h1 className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl text-background mb-6 leading-tight">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-lg md:text-xl text-background/90 mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background/10 backdrop-blur-sm border-2 border-secondary hover:bg-secondary hover:text-primary text-background font-semibold px-8 py-6 rounded-full transition-all"
            >
              {t('hero.cta.secondary')}
            </Button>
          </div>

          {/* Floating animation hint */}
          <div className="mt-16 animate-float">
            <div className="w-6 h-10 border-2 border-secondary/50 rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
