
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay,Pagination, Navigation} from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay,Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements OnInit {
  
  
  onSlideChange() {
    console.log('slide change');
  }

  constructor() { }

  ngOnInit(): void {
  }
 
}
