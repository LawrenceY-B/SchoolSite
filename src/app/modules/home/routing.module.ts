import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { AcademicComponent } from '../components/academic/academic.component';
import { AdmissionComponent } from '../components/admission/admission.component';
import { ContactComponent } from '../components/contact/contact.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'academics', component:AcademicComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'admission', component:AdmissionComponent},
  {path: 'home',   redirectTo: '/', pathMatch: 'full'},
  {path: '**', component:PageNotFoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
   RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class RoutingModule { }
