import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ProfileValidationService } from '../../services/profile-validation.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileValidationService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
