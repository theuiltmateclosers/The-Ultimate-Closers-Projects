import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { UsersModule } from './modules/users/users.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ProfilesModule } from './modules/profiles/profiles.module';

@Module({
  imports: [UsersModule, BookingsModule, AnalyticsModule, ProfilesModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
