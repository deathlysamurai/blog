import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
  apiUrl = environment.baseUrl;
  welcomeImage: String = "images/welcome-image.png";

  constructor() { }

  ngOnInit(): void {
  }

}
