import { Injectable, signal } from '@angular/core';
import { sign } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  showMobileNav = signal(true);
}
