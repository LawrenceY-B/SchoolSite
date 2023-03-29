import { Component, OnInit } from '@angular/core';
import { ISchoolData } from 'src/app/shared/model/result.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
message: string = '';
email: string = '';
name: string='';
formData!: ISchoolData;

  constructor(    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.formData= {
      name: this.name,
      email: this.email,
      message: this.message
    };
  this.formData
    this.apiService.postmessage(this.formData)
      console.log(this.formData)
  
  }
}
