import { Injectable, BadRequestException } from '@nestjs/common';
import { IsEmail, IsString, IsOptional, IsPhoneNumber, IsUrl, Length, Matches } from 'class-validator';

export class BookingDataDto {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('FR')
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  company?: string;

  @IsOptional()
  @IsUrl()
  linkedinProfile?: string;

  @IsString()
  @Length(10, 500)
  message: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/)
  ipAddress?: string;
}

@Injectable()
export class BookingValidationService {
  validateBookingData(data: any): BookingDataDto {
    // Validation des champs obligatoires
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      throw new BadRequestException('Champs obligatoires manquants');
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new BadRequestException('Format d\'email invalide');
    }

    // Validation du téléphone si fourni
    if (data.phone) {
      const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
      if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        throw new BadRequestException('Format de téléphone invalide');
      }
    }

    // Validation de LinkedIn si fourni
    if (data.linkedinProfile && !data.linkedinProfile.includes('linkedin.com')) {
      throw new BadRequestException('URL LinkedIn invalide');
    }

    // Sanitisation des données
    const sanitizedData: BookingDataDto = {
      firstName: this.sanitizeString(data.firstName),
      lastName: this.sanitizeString(data.lastName),
      email: data.email.toLowerCase().trim(),
      phone: data.phone ? this.sanitizePhone(data.phone) : undefined,
      company: data.company ? this.sanitizeString(data.company) : undefined,
      linkedinProfile: data.linkedinProfile ? this.sanitizeUrl(data.linkedinProfile) : undefined,
      message: this.sanitizeString(data.message),
      ipAddress: data.ipAddress
    };

    return sanitizedData;
  }

  private sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Supprimer les balises HTML
      .substring(0, 1000); // Limiter la longueur
  }

  private sanitizePhone(phone: string): string {
    return phone.replace(/[^\d+]/g, '');
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
