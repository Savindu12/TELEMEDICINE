import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  istoggleMenuOpen: boolean = false;

  toggleMenu() {
    this.istoggleMenuOpen = !this.istoggleMenuOpen;
  }
  constructor(private authService: AuthService) {}


}
