import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/UserRegister';
import { ApiResponse } from '../models/apiResponse';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router) {
    const UserStr = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(UserStr) as User);
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }



  login(email: string, password: string) {
    const obj = {
      email,
      password
    };
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}auth/login`, obj).pipe(
      map((res) => {
        if (res.success) {
          const objUser: User = {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            token: res.data.token,
            refreshToken: res.data.refreshToken
          };
          const en = JSON.stringify(objUser);
          localStorage.setItem('token', objUser.token);
          localStorage.setItem('user', en);
          this.currentUserSubject.next(objUser);

        }
        return res;
      })
    );
  }

  register(obj: UserRegister) {
    const objData = {
      ...obj
    };
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}auth/register`, objData);
  }

  resendVerification(email: string) {
    const objData = {
      email: email
    };
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}auth/resendVerification`, objData);
  }

  verifyUser(email: string, password: string) {
    const objdata = {
      email: email,
      token: password
    };
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}auth/verify`, objdata);
  }

  GetNewToken(user: User) {
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}auth/GetNewToken`, user).pipe(
      map(res => {
        if (res.success) {
          const objUser: User = {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            token: res.data.token,
            refreshToken: res.data.refreshToken
          };
          const en = JSON.stringify(objUser);
          localStorage.setItem('token', objUser.token);
          localStorage.setItem('user', en);
          this.currentUserSubject.next(objUser);
          return true;
        }
        else {
          return false;
        }
      })
    );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('');
  }

  isLogin() {
    const currentuser = this.currentUserValue;
    if (currentuser) {
      const currDate = new Date();
      const expiryDate = new Date(this.parseJwt(currentuser.token).exp * 1000);
      //check for token expiry
      if (expiryDate.getTime() - currDate.getTime() <= 60000) {
        //request new token
        return this.GetNewToken(currentuser);
      } else {
        return of(true);
      }
    } else {

      return of(false);
    }
  }

  parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  getUserProfile() {
    return this.http.get<ApiResponse>(`${environment.apiBaseURl}User/GetUserProfile`);
  }
}
