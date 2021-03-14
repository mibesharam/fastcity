import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  showNav: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(data => {
      if (data) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  onLogout() {
    this.authService.logOut();
    this.showNav = false;
  }

  onClickProfile() {
    this.router.navigate(['/dashboard']);
    this.showNav = false;
  }

}
