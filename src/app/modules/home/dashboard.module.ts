import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../components/about/about.component';
import { AcademicComponent } from '../components/academic/academic.component';
import { AdmissionComponent } from '../components/admission/admission.component';
import { ContactComponent } from '../components/contact/contact.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    AcademicComponent,
    AdmissionComponent,
    ContactComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
  ]
})
export class HomeModule { }
