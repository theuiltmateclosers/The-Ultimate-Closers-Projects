import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Eye, Handshake, Zap } from 'lucide-react';

const Mission = () => {
  const { t } = useLanguage();

  const values = [
    { key: 'mission.value1', icon: Heart, color: 'text-secondary' },
    { key: 'mission.value2', icon: Eye, color: 'text-accent' },
    { key: 'mission.value3', icon: Handshake, color: 'text-primary' },
    { key: 'mission.value4', icon: Zap, color: 'text-secondary' },
  ];

  return (
    <section id="mission" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-primary mb-6">
            {t('mission.title')}
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('mission.text')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map(({ key, icon: Icon, color }, index) => (
            <div
              key={key}
              className="group relative p-8 rounded-2xl bg-card backdrop-blur-sm border border-border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className={`p-4 rounded-full bg-background border-2 border-border group-hover:border-secondary transition-all ${color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className="font-inter font-semibold text-sm md:text-base text-foreground">
                  {t(key)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
