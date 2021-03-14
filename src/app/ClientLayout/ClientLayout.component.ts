import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-ClientLayout',
  templateUrl: './ClientLayout.component.html',
  styleUrls: ['./ClientLayout.component.css']
})
export class ClientLayoutComponent implements OnInit {

  isNavigating = false;
  constructor(private router: Router, private spinner: NgxSpinnerService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isNavigating = true;
        this.spinner.show();
      }

      if (event instanceof NavigationEnd) {
        this.isNavigating = false;
        this.spinner.hide();
        this.scrollToTop();
      }

      if (event instanceof NavigationError) {
        this.isNavigating = false;
      }

    });
  }


  scrollToTop() {
    window.scrollTo(0, 0); // how far to scroll on each step
  }


  ngOnInit() {
  }

}
