import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request['user']?.role;

    if (role === 'admin') {
      return true; // Pode acessar a rota
    }

    return false; // Não pode acessar a rota
  }
}
