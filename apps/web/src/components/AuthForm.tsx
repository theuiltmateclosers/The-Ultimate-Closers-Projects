'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Sparkles, Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AuthForm = () => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 77, 68, 0.85), rgba(18, 18, 18, 0.9)), url(/assets/hero-cosmic.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Animated particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-secondary/30">
              <Sparkles className="w-4 h-4 text-secondary animate-glow-pulse" />
              <span className="font-inter text-xs text-secondary font-medium">
                The Ultimate Closers
              </span>
            </div>
            <h1 className="font-playfair font-bold text-3xl text-background mb-2">
              Bienvenue
            </h1>
            <p className="font-inter text-background/80">
              Accédez à votre espace personnel
            </p>
          </div>

          {/* Auth Form Card */}
          <Card className="backdrop-blur-md bg-background/10 border-secondary/20 shadow-2xl animate-fade-in-scale">
            <CardHeader className="text-center pb-6">
              <CardTitle className="font-playfair text-xl text-background">
                Connexion / Inscription
              </CardTitle>
              <CardDescription className="text-background/70">
                Rejoignez la communauté des Ultimate Closers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-background/20 mb-6">
                  <TabsTrigger 
                    value="login" 
                    className="text-background data-[state=active]:bg-secondary data-[state=active]:text-primary"
                  >
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    className="text-background data-[state=active]:bg-secondary data-[state=active]:text-primary"
                  >
                    Inscription
                  </TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login" className="space-y-4">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-background font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 bg-background/20 border-secondary/30 text-background placeholder:text-background/50 focus:border-secondary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-background font-medium">
                        Mot de passe
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-background/20 border-secondary/30 text-background placeholder:text-background/50 focus:border-secondary"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary/60 hover:text-secondary transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-secondary/30 bg-background/20 text-secondary focus:ring-secondary"
                        />
                        <span className="text-background/80">Se souvenir de moi</span>
                      </label>
                      <button
                        type="button"
                        className="text-secondary hover:text-secondary/80 transition-colors"
                      >
                        Mot de passe oublié ?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
                    >
                      Se connecter
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register" className="space-y-4">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-firstname" className="text-background font-medium">
                          Prénom
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                          <Input
                            id="register-firstname"
                            type="text"
                            placeholder="Jean"
                            className="pl-10 bg-background/20 border-secondary/30 text-background placeholder:text-background/50 focus:border-secondary"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-lastname" className="text-background font-medium">
                          Nom
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                          <Input
                            id="register-lastname"
                            type="text"
                            placeholder="Dupont"
                            className="pl-10 bg-background/20 border-secondary/30 text-background placeholder:text-background/50 focus:border-secondary"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-background font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 bg-background/20 border-secondary/30 text-background placeholder:text-background/50 focus:border-secondary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-background font-medium">
                        Mot de passe
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-background/20 border-secondary/30 text-background placeholder:text-background/50 focus:border-secondary"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary/60 hover:text-secondary transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password" className="text-background font-medium">
                        Confirmer le mot de passe
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-background/20 border-secondary/30 text-background placeholder:text-background/50 focus:border-secondary"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary/60 hover:text-secondary transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-secondary/30 bg-background/20 text-secondary focus:ring-secondary"
                          required
                        />
                        <span className="text-background/80 text-sm">
                          J'accepte les{' '}
                          <button type="button" className="text-secondary hover:text-secondary/80 underline">
                            conditions d'utilisation
                          </button>{' '}
                          et la{' '}
                          <button type="button" className="text-secondary hover:text-secondary/80 underline">
                            politique de confidentialité
                          </button>
                        </span>
                      </label>

                      <Button
                        type="submit"
                        className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
                      >
                        Créer mon compte
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-secondary/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-background/60">
                      Ou continuer avec
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="bg-background/20 border-secondary/30 text-background hover:bg-secondary hover:text-primary"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-background/20 border-secondary/30 text-background hover:bg-secondary hover:text-primary"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to home */}
          <div className="text-center mt-8 animate-fade-in">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-background/80 hover:text-background hover:bg-background/10"
              >
                ← Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
