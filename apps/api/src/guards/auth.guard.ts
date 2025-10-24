import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request>();
    
    // Autoriser les endpoints de santé sans authentification
    if (['/health', '/ready'].includes(req.path) && req.method === 'GET') {
      return true;
    }

    // Vérifier la présence du token d'authentification
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token d\'authentification requis');
    }

    // TODO: Valider le JWT token
    const token = authHeader.substring(7);
    
    // Pour l'instant, on accepte tous les tokens (à implémenter la validation JWT)
    if (!token || token.length < 10) {
      throw new UnauthorizedException('Token d\'authentification invalide');
    }

    return true;
  }
}
