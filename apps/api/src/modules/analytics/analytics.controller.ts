import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsValidationService } from '../../services/analytics-validation.service';
import { AuthGuard } from '../../guards/auth.guard';
import { RateLimitGuard } from '../../guards/rate-limit.guard';

@Controller('analytics')
@UseGuards(AuthGuard, RateLimitGuard)
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly validationService: AnalyticsValidationService,
  ) {}

  @Post('track')
  @HttpCode(HttpStatus.CREATED)
  async trackEvent(@Body() eventData: any) {
    // Validation stricte des données d'analytics
    const validatedData = this.validationService.validateAnalyticsData(eventData);
    
    // Vérification de l'authenticité de l'événement
    if (!this.validationService.isLegitimateEvent(validatedData)) {
      throw new Error('Événement suspect détecté - tracking bloqué');
    }
    
    // Enregistrement sécurisé de l'événement
    const event = await this.analyticsService.trackEvent(validatedData);
    
    return {
      success: true,
      message: 'Événement enregistré avec succès',
      eventId: event.id,
    };
  }

  @Get('stats')
  async getAnalyticsStats(@Query('period') period: string = '7d') {
    // Seuls les utilisateurs authentifiés peuvent voir les stats
    const stats = await this.analyticsService.getAnalyticsStats(period);
    
    return {
      success: true,
      data: stats,
      period,
    };
  }
}
