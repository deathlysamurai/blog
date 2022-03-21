import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerButtons = document.querySelector("#header-buttons");
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  @ViewChild('hamburger') hamburger!: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.getCurrentUser()) {
      this.isLoggedIn = true;
    }
    if(this.authService.getAdmin()) {
      this.isAdmin = true;
    }

    this.authService.loginChanged()
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });

    this.authService.adminChanged()
      .subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      })
  }

  toggleMobileMenu() {
    var hamburger = document.querySelector(".hamburger");
    hamburger?.classList.toggle("is-active");

    var headerButtons = document.querySelector("#header-buttons");
    headerButtons?.classList.toggle("dropdown-menu");
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    var headerButtons = document.querySelector("#header-buttons");
    var hamburger = document.querySelector(".hamburger");
    if(window.innerWidth > 1000) {
      headerButtons?.classList.remove("dropdown-menu");
    } else {
      if(hamburger?.classList.contains("is-active")) {
        headerButtons?.classList.add("dropdown-menu");
      } else {
        headerButtons?.classList.remove("dropdown-menu");
      }
    }
  }
  
  @HostListener('window:click', ['$event'])
  onClick(event: Event) {
    if(event.target == document.querySelector(".hamburger-box") || 
        event.target == document.querySelector(".hamburger-inner") ||
        this.hamburger.nativeElement.offsetHeight == 0 || 
        !document.querySelector(".hamburger")?.classList.contains("is-active")) {
      return;
    } else {
      this.toggleMobileMenu();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
