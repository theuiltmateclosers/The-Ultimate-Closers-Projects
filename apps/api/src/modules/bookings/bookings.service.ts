import { Injectable, Logger } from '@nestjs/common';
import { BookingDataDto } from '../../services/booking-validation.service';

export interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  linkedinProfile?: string;
  message: string;
  ipAddress?: string;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);
  private bookings: Booking[] = []; // TODO: Remplacer par une vraie base de données

  async createBooking(data: BookingDataDto): Promise<Booking> {
    // Log de sécurité
    this.logger.log(`Tentative de création de réservation pour ${data.email}`);
    
    // Vérification des doublons
    const existingBooking = this.bookings.find(
      booking => booking.email === data.email && 
      this.isRecentBooking(booking.createdAt)
    );
    
    if (existingBooking) {
      this.logger.warn(`Tentative de doublon détectée pour ${data.email}`);
      throw new Error('Une réservation récente existe déjà pour cet email');
    }

    // Création de la réservation
    const booking: Booking = {
      id: this.generateId(),
      ...data,
      createdAt: new Date(),
      status: 'pending',
    };

    this.bookings.push(booking);
    
    this.logger.log(`Réservation créée avec succès: ${booking.id}`);
    
    // TODO: Envoyer une notification email
    // TODO: Sauvegarder en base de données
    
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    // TODO: Implémenter la récupération depuis la base de données
    return this.bookings;
  }

  async getBookingById(id: string): Booking | undefined {
    return this.bookings.find(booking => booking.id === id);
  }

  private generateId(): string {
    return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private isRecentBooking(createdAt: Date): boolean {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return createdAt > oneHourAgo;
  }
}
