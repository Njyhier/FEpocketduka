import { Component } from '@angular/core';
import { SearchbarComponent } from '../../../searchbar/searchbar-component/searchbar-component';

@Component({
  selector: 'app-desktop-nav-component',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './desktop-nav-component.html',
  styleUrl: './desktop-nav-component.css',
})
export class DesktopNavComponent {}
