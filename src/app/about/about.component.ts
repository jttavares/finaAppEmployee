import { Component, OnInit } from '@angular/core';


import { faMicrosoft, faGoogle, faAmazon, faApple, faAngular, faCcMastercard, faCcVisa, faFedex, faGithub, faJava, faLess, faPaypal } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  faMicrosoft= faMicrosoft;
  faGoogle= faGoogle;
  faAmazon= faAmazon;
  faApple= faApple;
  faAngular= faAngular;
  faCcMastercard= faCcMastercard;
  faCcVisa= faCcVisa;
  faFedex= faFedex;
  faGithub= faGithub;
  faJava= faJava;
  faLess= faLess;
  faPaypal= faPaypal;

  constructor() { }

  ngOnInit() {
  }

}
