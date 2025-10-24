import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsValidationService } from '../../services/analytics-validation.service';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsValidationService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
