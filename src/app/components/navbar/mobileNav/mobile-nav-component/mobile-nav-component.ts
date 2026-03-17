import { Component } from '@angular/core';
import { SearchbarComponent } from '../../../searchbar/searchbar-component/searchbar-component';

@Component({
  selector: 'app-mobile-nav-component',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './mobile-nav-component.html',
  styleUrl: './mobile-nav-component.css',
})
export class MobileNavComponent {}
