import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISchoolData } from '../model/result.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient,
      ) {
       
     
      }

     postmessage(data : ISchoolData){
        return  this.http.post('http://localhost:3003/api/addmessage', data).subscribe(
          response => {
            console.log('Response:', response);
          },
          error => {
            console.error('Error:', error);
          }
        );
      
      }

}
