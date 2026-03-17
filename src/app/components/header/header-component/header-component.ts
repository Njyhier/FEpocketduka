import { Component } from '@angular/core';
import { DesktopNavComponent } from '../../navbar/desktopNav/desktop-nav-component/desktop-nav-component';
import { LogoComponent } from '../../logo/logo-component/logo-component';
import { MobileNavComponent } from '../../navbar/mobileNav/mobile-nav-component/mobile-nav-component';
import { SearchbarComponent } from '../../searchbar/searchbar-component/searchbar-component';

@Component({
  selector: 'app-header-component',
  imports: [DesktopNavComponent, LogoComponent, MobileNavComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {}
