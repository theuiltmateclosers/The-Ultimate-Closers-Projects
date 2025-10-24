import { CanActivate, ExecutionContext, Injectable, TooManyRequestsException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly attempts = new Map<string, { count: number; resetTime: number }>();
  private readonly maxAttempts = 5; // 5 tentatives par fenêtre
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clientIp = this.getClientIp(request);
    const now = Date.now();

    // Nettoyer les anciennes entrées
    this.cleanupExpiredEntries(now);

    // Vérifier le rate limit
    const clientData = this.attempts.get(clientIp);
    
    if (!clientData) {
      // Premier essai
      this.attempts.set(clientIp, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (now > clientData.resetTime) {
      // Fenêtre expirée, reset
      this.attempts.set(clientIp, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (clientData.count >= this.maxAttempts) {
      const remainingTime = Math.ceil((clientData.resetTime - now) / 1000 / 60);
      throw new TooManyRequestsException(
        `Trop de tentatives. Réessayez dans ${remainingTime} minutes.`
      );
    }

    // Incrémenter le compteur
    clientData.count++;
    return true;
  }

  private getClientIp(request: Request): string {
    return (
      request.headers['x-forwarded-for'] as string ||
      request.headers['x-real-ip'] as string ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      'unknown'
    );
  }

  private cleanupExpiredEntries(now: number): void {
    for (const [ip, data] of this.attempts.entries()) {
      if (now > data.resetTime) {
        this.attempts.delete(ip);
      }
    }
  }
}
