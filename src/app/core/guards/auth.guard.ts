import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@core/http/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getIdentity();
        if (currentUser) {
            // logged in so return true
            // Ha iniciado sessión entonces puede seguir
            return true;
        }

        // Not logged in so redirect to login page with the return url
        // No ha iniciado sesión, así que redirija a la página de inicio de sesión con la URL de retorno
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        this.router.navigate(['/login']);
        return false;
    }
}