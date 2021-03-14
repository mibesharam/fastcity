import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService, private logging: LoggingService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const currentuser = this.authService.currentUserValue;
        if (currentuser) {
            const userPayload = this.authService.parseJwt(currentuser.token);
            if (userPayload.role && (userPayload.role as string).toLowerCase() == 'admin') {
                return of(true);
            } else {
                this.logging.notify('Unauthorised Access');
                this.authService.logOut();
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return of(false);
            }
        } else {
            this.authService.logOut();
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return of(false);
        }

    }
}
