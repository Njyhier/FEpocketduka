import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  showMobileNav = signal(true);
}
