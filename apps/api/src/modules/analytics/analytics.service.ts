import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { AnalyticsValidationService, AnalyticsEventDto } from '../../services/analytics-validation.service';

export interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: string;
  eventData: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  isValidated: boolean;
}

export interface AnalyticsStats {
  totalEvents: number;
  uniqueUsers: number;
  topEvents: Array<{ eventType: string; count: number }>;
  period: string;
}

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);
  private events: AnalyticsEvent[] = []; // TODO: Remplacer par une vraie base de données

  async trackEvent(data: AnalyticsEventDto): Promise<AnalyticsEvent> {
    // Log de sécurité
    this.logger.log(`Tentative d'enregistrement d'événement analytics pour user ${data.userId}`);
    
    // Vérification anti-spam
    if (this.isSpamAttempt(data)) {
      this.logger.warn(`Tentative de spam détectée pour user ${data.userId}`);
      throw new ForbiddenException('Trop de tentatives d\'enregistrement d\'événements');
    }

    // Validation de l'événement
    if (!this.isValidEventType(data.eventType)) {
      this.logger.warn(`Type d'événement invalide: ${data.eventType}`);
      throw new ForbiddenException('Type d\'événement non autorisé');
    }

    // Création de l'événement
    const event: AnalyticsEvent = {
      id: this.generateId(),
      userId: data.userId,
      eventType: data.eventType,
      eventData: data.eventData,
      timestamp: new Date(),
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      sessionId: data.sessionId,
      isValidated: true,
    };

    this.events.push(event);
    
    this.logger.log(`Événement analytics enregistré avec succès: ${event.id}`);
    
    return event;
  }

  async getAnalyticsStats(period: string): Promise<AnalyticsStats> {
    // Seuls les utilisateurs authentifiés peuvent accéder aux stats
    const cutoffDate = this.getCutoffDate(period);
    const periodEvents = this.events.filter(event => event.timestamp >= cutoffDate);
    
    const uniqueUsers = new Set(periodEvents.map(event => event.userId)).size;
    
    const eventCounts = periodEvents.reduce((acc, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topEvents = Object.entries(eventCounts)
      .map(([eventType, count]) => ({ eventType, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalEvents: periodEvents.length,
      uniqueUsers,
      topEvents,
      period,
    };
  }

  private isSpamAttempt(data: AnalyticsEventDto): boolean {
    // Vérifier s'il y a trop d'événements récents pour cet utilisateur
    const recentEvents = this.events.filter(
      event => event.userId === data.userId && 
      event.timestamp > new Date(Date.now() - 60000) // 1 minute
    );
    
    return recentEvents.length > 10; // Max 10 événements par minute
  }

  private isValidEventType(eventType: string): boolean {
    // Liste des types d'événements autorisés
    const allowedEventTypes = [
      'page_view',
      'button_click',
      'form_submit',
      'download',
      'scroll',
      'session_start',
      'session_end',
    ];
    
    return allowedEventTypes.includes(eventType);
  }

  private getCutoffDate(period: string): Date {
    const now = new Date();
    switch (period) {
      case '1d':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  }

  private generateId(): string {
    return `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
