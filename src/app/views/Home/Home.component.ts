import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
  reviews: any[] = [
    {
      name: 'Bhavin Joshi',
      img: 'https://via.placeholder.com/70',
      area: 'Surat,Gujarat',
      content: 'This is review content for demo which is fack but only for demo',
      rating: 4
    },
    {
      name: 'Bhavin Joshi',
      img: 'https://via.placeholder.com/70',
      area: 'Surat,Gujarat',
      content: 'This is review content for demo which is fack but only for demo',
      rating: 4
    },
    {
      name: 'Bhavin Joshi',
      img: 'https://via.placeholder.com/70',
      area: 'Surat,Gujarat',
      content: 'This is review content for demo which is fack but only for demo',
      rating: 4
    },
    {
      name: 'Bhavin Joshi',
      img: 'https://via.placeholder.com/70',
      area: 'Surat,Gujarat',
      content: 'This is review content for demo which is fack but only for demo',
      rating: 4
    },
    {
      name: 'Bhavin Joshi',
      img: 'https://via.placeholder.com/70',
      area: 'Surat,Gujarat',
      content: 'This is review content for demo which is fack but only for demo',
      rating: 4
    },
    {
      name: 'Bhavin Joshi',
      img: 'https://via.placeholder.com/70',
      area: 'Surat,Gujarat',
      content: 'This is review content for demo which is fack but only for demo',
      rating: 4
    },
    {
      name: 'Bhavin Joshi',
      img: 'https://via.placeholder.com/70',
      area: 'Surat,Gujarat',
      content: 'This is review content for demo which is fack but only for demo',
      rating: 4
    },
    {
      name: 'Bhavin Joshi',
      img: 'https://via.placeholder.com/70',
      area: 'Surat,Gujarat',
      content: 'This is review content for demo which is fack but only for demo',
      rating: 4
    }
  ]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoWidth: false,
    autoplayTimeout: 4000,
    autoplaySpeed: 700,
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   400: {
    //     items: 2
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 4
    //   }
    // },
    nav: false
  }

  constructor() { }

  ngOnInit() {
  }

}
