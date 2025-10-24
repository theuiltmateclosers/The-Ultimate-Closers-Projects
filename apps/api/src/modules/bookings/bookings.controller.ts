import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingGuard } from '../../guards/booking.guard';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { BookingValidationService, BookingDataDto } from '../../services/booking-validation.service';

@Controller('bookings')
@UseGuards(BookingGuard, RateLimitGuard)
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly validationService: BookingValidationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBooking(@Body() bookingData: any) {
    // Validation stricte des données
    const validatedData = this.validationService.validateBookingData(bookingData);
    
    // Création sécurisée de la réservation
    const booking = await this.bookingsService.createBooking(validatedData);
    
    return {
      success: true,
      message: 'Réservation créée avec succès',
      bookingId: booking.id,
    };
  }
}
