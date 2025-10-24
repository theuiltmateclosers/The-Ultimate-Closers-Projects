import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ProfileGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Vérifier l'authentification
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ForbiddenException('Authentification requise pour accéder aux profils');
    }

    // TODO: Extraire l'userId du token JWT
    const token = authHeader.substring(7);
    const userId = this.extractUserIdFromToken(token);
    
    if (!userId) {
      throw new ForbiddenException('Token d\'authentification invalide');
    }

    // Vérifier les permissions pour accéder au profil
    const requestedUserId = request.params.userId;
    
    // Autoriser l'accès si :
    // 1. L'utilisateur accède à son propre profil
    // 2. L'utilisateur est un admin
    if (requestedUserId === userId || this.isAdmin(userId)) {
      return true;
    }

    // Vérifier si le profil est public
    if (this.isPublicProfile(requestedUserId)) {
      return true;
    }

    throw new ForbiddenException('Accès refusé à ce profil');
  }

  private extractUserIdFromToken(token: string): string | null {
    // TODO: Implémenter l'extraction de l'userId depuis le JWT
    // Pour l'instant, on simule l'extraction
    try {
      // Simulation d'extraction d'userId
      return 'user_' + Math.random().toString(36).substr(2, 9);
    } catch {
      return null;
    }
  }

  private isAdmin(userId: string): boolean {
    // TODO: Vérifier si l'utilisateur est un admin
    // Pour l'instant, on simule la vérification
    return userId.startsWith('admin_');
  }

  private isPublicProfile(userId: string): boolean {
    // TODO: Vérifier si le profil est public
    // Pour l'instant, on considère que tous les profils sont privés par défaut
    return false;
  }
}
