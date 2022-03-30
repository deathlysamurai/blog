import { Component, OnInit } from '@angular/core';
import { faFacebookF, faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faFacebookF = faFacebookF;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faInstagram = faInstagram;

  constructor() { }

  ngOnInit(): void {
  }

}
