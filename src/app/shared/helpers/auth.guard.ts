import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const currentuser = this.authService.currentUserValue;
        if (currentuser) {
            const currDate = new Date();
            const expiryDate = new Date(this.authService.parseJwt(currentuser.token).exp * 1000);
            //check for token expiry
            if (expiryDate.getTime() - currDate.getTime() <= 60000) {
                //request new token
                return this.authService.GetNewToken(currentuser).pipe(
                    map(c => {
                        if (!c) {
                            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                            return c;
                        }
                        return c;
                    })
                );
            } else {
                return of(true);
            }
        } else {
            this.authService.logOut();
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return of(false);
        }

        //const result = this.authService.isLogin();
        // console.log('result for page', result);
        // if (result) {
        //     this.router.navigate([state.url]);
        //     console.log('called true');
        //     return true;
        // } else {
        //     console.log('called false');
        //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //     return false;
        // }
    }
}
