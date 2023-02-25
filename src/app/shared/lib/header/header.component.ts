import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navigation = [
    {name:"Home", tag:'home'},
    {name:"About", tag:'about'},
    {name:"Admission", tag:'admission'},
    {name:"Academics", tag:'academics'},
    {name:"Contact", tag:'contact'},

   
 
  ]
  updateUrl(nav : any){
    window.location.href = "/"+ nav.tag
}
  constructor() { }

  ngOnInit(): void {
  }

}
