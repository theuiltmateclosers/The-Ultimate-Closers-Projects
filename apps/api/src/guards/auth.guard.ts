import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    // TODO: parse JWT (Authorization: Bearer), vérifier signature & scopes
    // Autoriser GET /health|/ready sans auth:
    if (['/health', '/ready'].includes(req.path) && req.method === 'GET') return true;
    return true; // passer à true/false selon ta logique
  }
}
