import { Component, OnInit } from '@angular/core';

import { faMailBulk, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faTwitter,  faFacebookF, faInstagramSquare, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faMail=faMailBulk;
  faPhone=faPhone;
  faFacebook = faFacebookF;
  faInstagram = faInstagramSquare;
  faTwitter = faTwitter;
  faWhatsapp = faWhatsapp;
  faGlobe=faGlobe;

  constructor() { }

  ngOnInit() {
  }

}
