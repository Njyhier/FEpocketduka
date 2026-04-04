import { inject, Injectable, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = signal(false);
  private router = inject(Router);
  private requestCount = 0;
  private navCount = 0;
  showLoader() {
    this.requestCount++;
    this.isLoading.set(true);
  }
  hideLoader() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.isLoading.set(false);
      this.requestCount = 0;
    }
  }

  constructor() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.navCount++;
        this.isLoading.set(true);
      }

      if (
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      ) {
        this.navCount--;

        if (this.navCount <= 0) {
          this.isLoading.set(false);
          this.navCount = 0; // safety reset
        }
      }
    });
  }
}
