import { Injectable, BadRequestException } from '@nestjs/common';
import { IsString, IsObject, IsOptional, Length, Matches, IsIn } from 'class-validator';

export class AnalyticsEventDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+$/)
  userId: string;

  @IsString()
  @IsIn(['page_view', 'button_click', 'form_submit', 'download', 'scroll', 'session_start', 'session_end'])
  eventType: string;

  @IsObject()
  eventData: Record<string, any>;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/)
  ipAddress?: string;

  @IsOptional()
  @IsString()
  @Length(10, 500)
  userAgent?: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{20,}$/)
  sessionId: string;
}

@Injectable()
export class AnalyticsValidationService {
  validateAnalyticsData(data: any): AnalyticsEventDto {
    // Validation des champs obligatoires
    if (!data.userId || !data.eventType || !data.sessionId) {
      throw new BadRequestException('Champs obligatoires manquants');
    }

    // Validation du format de l'userId
    if (!/^[a-zA-Z0-9_-]+$/.test(data.userId)) {
      throw new BadRequestException('Format d\'userId invalide');
    }

    // Validation du type d'événement
    const allowedEventTypes = [
      'page_view', 'button_click', 'form_submit', 'download', 
      'scroll', 'session_start', 'session_end'
    ];
    if (!allowedEventTypes.includes(data.eventType)) {
      throw new BadRequestException('Type d\'événement non autorisé');
    }

    // Validation de la sessionId
    if (!/^[a-zA-Z0-9_-]{20,}$/.test(data.sessionId)) {
      throw new BadRequestException('Format de sessionId invalide');
    }

    // Sanitisation des données
    const sanitizedData: AnalyticsEventDto = {
      userId: this.sanitizeString(data.userId),
      eventType: data.eventType,
      eventData: this.sanitizeEventData(data.eventData),
      ipAddress: data.ipAddress ? this.sanitizeIpAddress(data.ipAddress) : undefined,
      userAgent: data.userAgent ? this.sanitizeString(data.userAgent) : undefined,
      sessionId: data.sessionId,
    };

    return sanitizedData;
  }

  isLegitimateEvent(data: AnalyticsEventDto): boolean {
    // Vérifications de légitimité
    try {
      // 1. Vérifier que l'événement n'est pas suspect
      if (this.isSuspiciousEvent(data)) {
        return false;
      }

      // 2. Vérifier la cohérence des données
      if (!this.isDataConsistent(data)) {
        return false;
      }

      // 3. Vérifier que l'événement respecte les limites
      if (!this.isWithinLimits(data)) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  private isSuspiciousEvent(data: AnalyticsEventDto): boolean {
    // Détecter des patterns suspects
    const suspiciousPatterns = [
      /script/i,
      /<script/i,
      /javascript:/i,
      /onclick/i,
      /onload/i,
      /eval\(/i,
      /document\.cookie/i,
    ];

    const eventDataStr = JSON.stringify(data.eventData);
    return suspiciousPatterns.some(pattern => pattern.test(eventDataStr));
  }

  private isDataConsistent(data: AnalyticsEventDto): boolean {
    // Vérifier la cohérence des données
    if (data.eventType === 'session_start' && !data.userAgent) {
      return false;
    }

    if (data.eventType === 'page_view' && !data.eventData?.url) {
      return false;
    }

    if (data.eventType === 'button_click' && !data.eventData?.element) {
      return false;
    }

    return true;
  }

  private isWithinLimits(data: AnalyticsEventDto): boolean {
    // Vérifier que les données respectent les limites
    if (data.userId.length > 100) return false;
    if (data.sessionId.length > 200) return false;
    if (JSON.stringify(data.eventData).length > 5000) return false;
    
    return true;
  }

  private sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Supprimer les balises HTML
      .substring(0, 1000); // Limiter la longueur
  }

  private sanitizeEventData(eventData: any): Record<string, any> {
    if (typeof eventData !== 'object' || eventData === null) {
      return {};
    }

    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(eventData)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key] = value;
      } else if (typeof value === 'object') {
        sanitized[key] = this.sanitizeEventData(value);
      }
    }

    return sanitized;
  }

  private sanitizeIpAddress(ip: string): string {
    const ipRegex = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    if (!ipRegex.test(ip)) {
      throw new BadRequestException('Format d\'adresse IP invalide');
    }
    return ip;
  }
}
