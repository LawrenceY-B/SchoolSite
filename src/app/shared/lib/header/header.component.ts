import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;

  navigation = [
    {name:"Home", tag:'/home'},
    {name:"About", tag:'/about'},
    {name:"Academics", tag:'/academics'},
    {name:"Admission", tag:'/admission'},
    {name:"Contact", tag:'/contact'},

   
 
  ]
  updateUrl(nav : any){
    window.location.href = "/"+ nav.tag
}
@HostListener('window:resize', ['$event'])
onResize(event: any) {
  if (event.target.innerWidth > 768) {
    this.menuOpen = false;
  }
}

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}
  constructor() { }

  ngOnInit(): void {
  }

}
