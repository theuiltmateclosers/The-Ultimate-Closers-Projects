import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus, ForbiddenException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileValidationService } from '../../services/profile-validation.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ProfileGuard } from '../../guards/profile.guard';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly validationService: ProfileValidationService,
  ) {}

  @Get(':userId')
  @UseGuards(ProfileGuard)
  async getProfile(@Param('userId') userId: string) {
    // Seuls les propriétaires du profil ou les admins peuvent accéder
    const profile = await this.profilesService.getProfile(userId);
    
    if (!profile) {
      throw new ForbiddenException('Profil non trouvé ou accès refusé');
    }

    return {
      success: true,
      data: profile,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProfile(@Body() profileData: any) {
    // Validation stricte des données du profil
    const validatedData = this.validationService.validateProfileData(profileData);
    
    // Création sécurisée du profil
    const profile = await this.profilesService.createProfile(validatedData);
    
    return {
      success: true,
      message: 'Profil créé avec succès',
      profileId: profile.id,
    };
  }

  @Put(':userId')
  @UseGuards(ProfileGuard)
  async updateProfile(@Param('userId') userId: string, @Body() profileData: any) {
    // Validation stricte des données du profil
    const validatedData = this.validationService.validateProfileData(profileData);
    
    // Mise à jour sécurisée du profil
    const profile = await this.profilesService.updateProfile(userId, validatedData);
    
    return {
      success: true,
      message: 'Profil mis à jour avec succès',
      data: profile,
    };
  }

  @Delete(':userId')
  @UseGuards(ProfileGuard)
  async deleteProfile(@Param('userId') userId: string) {
    // Suppression sécurisée du profil
    await this.profilesService.deleteProfile(userId);
    
    return {
      success: true,
      message: 'Profil supprimé avec succès',
    };
  }

  @Get('admin/list')
  @UseGuards(ProfileGuard) // Vérifier que c'est un admin
  async listProfiles() {
    // Seuls les admins peuvent lister tous les profils
    const profiles = await this.profilesService.listProfiles();
    
    return {
      success: true,
      data: profiles,
    };
  }
}
