import { Injectable, BadRequestException } from '@nestjs/common';
import { IsString, IsEmail, IsOptional, IsUrl, Length, Matches } from 'class-validator';

export class ProfileDataDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+$/)
  userId: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  bio?: string;
}

@Injectable()
export class ProfileValidationService {
  validateProfileData(data: any): ProfileDataDto {
    // Validation des champs obligatoires
    if (!data.userId || !data.email || !data.firstName || !data.lastName) {
      throw new BadRequestException('Champs obligatoires manquants');
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new BadRequestException('Format d\'email invalide');
    }

    // Validation de l'userId
    if (!/^[a-zA-Z0-9_-]+$/.test(data.userId)) {
      throw new BadRequestException('Format d\'userId invalide');
    }

    // Validation de l'avatarUrl si fourni
    if (data.avatarUrl && !this.isValidUrl(data.avatarUrl)) {
      throw new BadRequestException('URL d\'avatar invalide');
    }

    // Sanitisation des données
    const sanitizedData: ProfileDataDto = {
      userId: this.sanitizeString(data.userId),
      email: data.email.toLowerCase().trim(),
      firstName: this.sanitizeString(data.firstName),
      lastName: this.sanitizeString(data.lastName),
      avatarUrl: data.avatarUrl ? this.sanitizeUrl(data.avatarUrl) : undefined,
      bio: data.bio ? this.sanitizeString(data.bio) : undefined,
    };

    return sanitizedData;
  }

  private isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
    } catch {
      return false;
    }
  }

  private sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Supprimer les balises HTML
      .substring(0, 1000); // Limiter la longueur
  }

  private sanitizeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      if (urlObj.protocol !== 'https:') {
        throw new Error('URL non sécurisée');
      }
      return urlObj.toString();
    } catch {
      throw new BadRequestException('URL invalide');
    }
  }
}
