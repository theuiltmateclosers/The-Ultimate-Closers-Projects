'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Mail, 
  Calendar,
  Settings,
  Shield,
  BarChart3,
  UserPlus,
  MessageSquare,
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Activity,
  Target
} from 'lucide-react';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = [
    { title: 'Utilisateurs Actifs', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-500' },
    { title: 'Revenus Ce Mois', value: '€45,230', change: '+8.2%', icon: DollarSign, color: 'text-green-500' },
    { title: 'Nouvelles Inscriptions', value: '324', change: '+23%', icon: UserPlus, color: 'text-purple-500' },
    { title: 'Taux de Conversion', value: '68.5%', change: '+5.1%', icon: Target, color: 'text-orange-500' },
  ];

  const recentUsers = [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', status: 'Actif', joinDate: '2024-01-15', avatar: 'JD' },
    { id: 2, name: 'Marie Martin', email: 'marie@example.com', status: 'Actif', joinDate: '2024-01-14', avatar: 'MM' },
    { id: 3, name: 'Pierre Durand', email: 'pierre@example.com', status: 'Inactif', joinDate: '2024-01-13', avatar: 'PD' },
    { id: 4, name: 'Sophie Bernard', email: 'sophie@example.com', status: 'Actif', joinDate: '2024-01-12', avatar: 'SB' },
  ];

  const recentMessages = [
    { id: 1, from: 'Client Premium', subject: 'Demande de formation avancée', date: '2024-01-15', status: 'Nouveau' },
    { id: 2, from: 'Prospect', subject: 'Information sur les services', date: '2024-01-14', status: 'Répondu' },
    { id: 3, from: 'Partenaires', subject: 'Proposition de collaboration', date: '2024-01-13', status: 'En cours' },
  ];

  return (
    <section
      className="relative min-h-screen pt-20 pb-20"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 77, 68, 0.85), rgba(18, 18, 18, 0.9)), url(/assets/hero-cosmic.jpg)`,
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
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-secondary/30">
              <Shield className="w-4 h-4 text-secondary animate-glow-pulse" />
              <span className="font-inter text-xs text-secondary font-medium">
                Panel Administrateur
              </span>
            </div>
          </div>
          <h1 className="font-playfair font-bold text-4xl md:text-5xl text-background mb-2">
            Tableau de Bord
          </h1>
          <p className="font-inter text-background/80 text-lg">
            Gérez votre plateforme The Ultimate Closers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
          {stats.map((stat, index) => (
            <Card key={index} className="backdrop-blur-md bg-background/10 border-secondary/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-background/60 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-background mt-1">{stat.value}</p>
                    <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-secondary/20 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card className="backdrop-blur-md bg-background/10 border-secondary/20 shadow-2xl animate-fade-in-scale">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-background/20">
                <TabsTrigger 
                  value="overview" 
                  className="text-background data-[state=active]:bg-secondary data-[state=active]:text-primary"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Vue d'ensemble
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="text-background data-[state=active]:bg-secondary data-[state=active]:text-primary"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Utilisateurs
                </TabsTrigger>
                <TabsTrigger 
                  value="messages" 
                  className="text-background data-[state=active]:bg-secondary data-[state=active]:text-primary"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="text-background data-[state=active]:bg-secondary data-[state=active]:text-primary"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card className="bg-background/5 border-secondary/10">
                    <CardHeader>
                      <CardTitle className="text-background flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Activité Récente
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { action: 'Nouvel utilisateur inscrit', user: 'Marie Martin', time: 'Il y a 2 min' },
                        { action: 'Formation terminée', user: 'Jean Dupont', time: 'Il y a 5 min' },
                        { action: 'Message reçu', user: 'Pierre Durand', time: 'Il y a 10 min' },
                        { action: 'Paiement reçu', user: 'Sophie Bernard', time: 'Il y a 15 min' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/10">
                          <div className="w-2 h-2 bg-secondary rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-background text-sm">{activity.action}</p>
                            <p className="text-background/60 text-xs">{activity.user} • {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-background/5 border-secondary/10">
                    <CardHeader>
                      <CardTitle className="text-background flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Actions Rapides
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start bg-secondary/20 hover:bg-secondary/30 text-background border-secondary/30">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Ajouter un utilisateur
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-background/10 hover:bg-background/20 text-background border-secondary/30">
                        <Mail className="w-4 h-4 mr-2" />
                        Envoyer un email
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-background/10 hover:bg-background/20 text-background border-secondary/30">
                        <FileText className="w-4 h-4 mr-2" />
                        Générer un rapport
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-background/10 hover:bg-background/20 text-background border-secondary/30">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter les données
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                      <Input
                        placeholder="Rechercher un utilisateur..."
                        className="pl-10 w-64 bg-background/20 border-secondary/30 text-background placeholder:text-background/50"
                      />
                    </div>
                    <Button variant="outline" className="bg-background/10 hover:bg-background/20 text-background border-secondary/30">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtres
                    </Button>
                  </div>
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel utilisateur
                  </Button>
                </div>

                <div className="bg-background/5 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-background/10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-background/60 uppercase tracking-wider">
                            Utilisateur
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-background/60 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-background/60 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-background/60 uppercase tracking-wider">
                            Date d'inscription
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-background/60 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary/10">
                        {recentUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-background/10 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center mr-3">
                                  <span className="text-background text-sm font-medium">{user.avatar}</span>
                                </div>
                                <span className="text-background font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-background/80">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge 
                                variant={user.status === 'Actif' ? 'default' : 'secondary'}
                                className={user.status === 'Actif' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-background/80">
                              {user.joinDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost" className="text-background hover:bg-background/20">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-background hover:bg-background/20">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/20">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-4 h-4" />
                      <Input
                        placeholder="Rechercher un message..."
                        className="pl-10 w-64 bg-background/20 border-secondary/30 text-background placeholder:text-background/50"
                      />
                    </div>
                  </div>
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau message
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <Card key={message.id} className="bg-background/5 border-secondary/10 hover:bg-background/10 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-background font-medium">{message.from}</h3>
                              <Badge 
                                variant={message.status === 'Nouveau' ? 'default' : 'secondary'}
                                className={message.status === 'Nouveau' ? 'bg-secondary/20 text-secondary' : 'bg-background/20 text-background/60'}
                              >
                                {message.status}
                              </Badge>
                            </div>
                            <p className="text-background/80 mb-2">{message.subject}</p>
                            <p className="text-background/60 text-sm">{message.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="text-background hover:bg-background/20">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-primary">
                              Répondre
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-background/5 border-secondary/10">
                    <CardHeader>
                      <CardTitle className="text-background">Paramètres Généraux</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-background font-medium">Nom de la plateforme</label>
                        <Input 
                          defaultValue="The Ultimate Closers" 
                          className="bg-background/20 border-secondary/30 text-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-background font-medium">Email de contact</label>
                        <Input 
                          defaultValue="contact@theultimateclosers.com" 
                          className="bg-background/20 border-secondary/30 text-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-background font-medium">Description</label>
                        <textarea 
                          className="w-full p-3 rounded-md bg-background/20 border border-secondary/30 text-background placeholder:text-background/50"
                          rows={3}
                          defaultValue="Plateforme de formation en closing éthique avec IA consciente"
                        />
                      </div>
                      <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                        Sauvegarder les modifications
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/5 border-secondary/10">
                    <CardHeader>
                      <CardTitle className="text-background">Sécurité</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background/10">
                        <div>
                          <p className="text-background font-medium">Authentification à deux facteurs</p>
                          <p className="text-background/60 text-sm">Protégez votre compte avec 2FA</p>
                        </div>
                        <Button variant="outline" className="bg-background/10 hover:bg-background/20 text-background border-secondary/30">
                          Activer
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background/10">
                        <div>
                          <p className="text-background font-medium">Sessions actives</p>
                          <p className="text-background/60 text-sm">Gérez vos sessions de connexion</p>
                        </div>
                        <Button variant="outline" className="bg-background/10 hover:bg-background/20 text-background border-secondary/30">
                          Voir
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background/10">
                        <div>
                          <p className="text-background font-medium">Changer le mot de passe</p>
                          <p className="text-background/60 text-sm">Mettez à jour votre mot de passe</p>
                        </div>
                        <Button variant="outline" className="bg-background/10 hover:bg-background/20 text-background border-secondary/30">
                          Modifier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default AdminDashboard;
