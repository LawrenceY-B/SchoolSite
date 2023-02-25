import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SchoolSite';
  
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
