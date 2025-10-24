import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ProfileValidationService, ProfileDataDto } from '../../services/profile-validation.service';

export interface Profile {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  isVerified: boolean;
}

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name);
  private profiles: Profile[] = []; // TODO: Remplacer par une vraie base de données

  async getProfile(userId: string): Promise<Profile | null> {
    const profile = this.profiles.find(p => p.userId === userId);
    
    if (!profile) {
      return null;
    }

    // Log d'accès pour audit
    this.logger.log(`Accès au profil: ${userId}`);
    
    return profile;
  }

  async createProfile(data: ProfileDataDto): Promise<Profile> {
    // Vérifier qu'un profil n'existe pas déjà pour cet utilisateur
    const existingProfile = this.profiles.find(p => p.userId === data.userId);
    if (existingProfile) {
      throw new ForbiddenException('Un profil existe déjà pour cet utilisateur');
    }

    // Créer le profil
    const profile: Profile = {
      id: this.generateId(),
      userId: data.userId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false, // Par défaut, les profils sont privés
      isVerified: false,
    };

    this.profiles.push(profile);
    
    this.logger.log(`Profil créé avec succès: ${profile.id}`);
    
    return profile;
  }

  async updateProfile(userId: string, data: Partial<ProfileDataDto>): Promise<Profile> {
    const profileIndex = this.profiles.findIndex(p => p.userId === userId);
    
    if (profileIndex === -1) {
      throw new NotFoundException('Profil non trouvé');
    }

    // Mettre à jour le profil
    const profile = this.profiles[profileIndex];
    profile.firstName = data.firstName || profile.firstName;
    profile.lastName = data.lastName || profile.lastName;
    profile.avatarUrl = data.avatarUrl || profile.avatarUrl;
    profile.bio = data.bio || profile.bio;
    profile.updatedAt = new Date();

    this.profiles[profileIndex] = profile;
    
    this.logger.log(`Profil mis à jour: ${profile.id}`);
    
    return profile;
  }

  async deleteProfile(userId: string): Promise<void> {
    const profileIndex = this.profiles.findIndex(p => p.userId === userId);
    
    if (profileIndex === -1) {
      throw new NotFoundException('Profil non trouvé');
    }

    // Supprimer le profil
    this.profiles.splice(profileIndex, 1);
    
    this.logger.log(`Profil supprimé: ${userId}`);
  }

  async listProfiles(): Promise<Profile[]> {
    // Seuls les admins peuvent lister tous les profils
    this.logger.log('Liste des profils demandée par un admin');
    
    return this.profiles;
  }

  async makeProfilePublic(userId: string): Promise<Profile> {
    const profile = await this.getProfile(userId);
    
    if (!profile) {
      throw new NotFoundException('Profil non trouvé');
    }

    profile.isPublic = true;
    profile.updatedAt = new Date();
    
    this.logger.log(`Profil rendu public: ${userId}`);
    
    return profile;
  }

  async makeProfilePrivate(userId: string): Promise<Profile> {
    const profile = await this.getProfile(userId);
    
    if (!profile) {
      throw new NotFoundException('Profil non trouvé');
    }

    profile.isPublic = false;
    profile.updatedAt = new Date();
    
    this.logger.log(`Profil rendu privé: ${userId}`);
    
    return profile;
  }

  private generateId(): string {
    return `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
