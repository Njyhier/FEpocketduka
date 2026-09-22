import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Authservice } from '../../../services/auth/authservice';
import { IUser } from '../../../interfaces/iuser';
import { sampleUserProfile, UserService } from '../../../services/user/user-service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile-component.html',
})
export class UserProfileComponent implements OnInit {
  private readonly authService = inject(Authservice);
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // ------------------------------------------------------------
  // State
  // ------------------------------------------------------------

  user = signal<IUser | null>(sampleUserProfile);

  isEditing = signal(false);
  isLoading = signal(true);
  isSaving = signal(false);

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  isViewingOtherUser = signal(false);

  /**
   * Whether the currently authenticated user is an admin.
   *
   * Change 'admin' if your actual role name is different.
   */
  isAdmin = this.authService.isAuthorised('admin');

  // ------------------------------------------------------------
  // Available roles
  // ------------------------------------------------------------

  /**
   * Temporary hard-coded roles.
   *
   * In production, these should eventually come from:
   * GET /roles
   */
  availableRoles = ['customer', 'seller', 'admin', 'manager'];

  // ------------------------------------------------------------
  // Profile form
  // ------------------------------------------------------------

  profileForm = this.fb.nonNullable.group({
    first_name: ['', [Validators.required, Validators.maxLength(100)]],

    last_name: ['', [Validators.required, Validators.maxLength(100)]],

    username: ['', [Validators.required, Validators.maxLength(60)]],

    email: ['', [Validators.required, Validators.email]],

    role_names: this.fb.nonNullable.control<string[]>([]),
  });

  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------

  ngOnInit(): void {
    this.loadProfile();
  }

  // ------------------------------------------------------------
  // Loading profile
  // ------------------------------------------------------------

  private loadProfile(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    /**
     * If the route contains a user_id, an admin is viewing
     * another user's profile.
     *
     * Example:
     * /users/abc123/profile
     */
    const userId = this.route.snapshot.paramMap.get('user_id');

    if (userId) {
      if (!this.isAdmin) {
        this.errorMessage.set('You are not authorised to view this profile.');

        this.isLoading.set(false);
        return;
      }

      this.isViewingOtherUser.set(true);

      this.loadUserById(userId);

      return;
    }

    /**
     * No user_id means the currently authenticated user
     * is viewing their own profile.
     */
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      this.errorMessage.set('You must be logged in to view your profile.');

      this.isLoading.set(false);
      return;
    }

    this.user.set(currentUser);
    this.populateForm(currentUser);

    this.isLoading.set(false);
  }

  // ------------------------------------------------------------
  // Load another user
  // ------------------------------------------------------------

  private loadUserById(userId: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user.set(user);

        this.populateForm(user);

        this.isLoading.set(false);
      },

      error: (error) => {
        this.errorMessage.set(error?.error?.detail ?? 'Failed to load user profile.');

        this.isLoading.set(false);
      },
    });
  }

  // ------------------------------------------------------------
  // Populate form
  // ------------------------------------------------------------

  private populateForm(user: IUser): void {
    this.profileForm.patchValue({
      first_name: user.first_name ?? '',
      last_name: user.last_name ?? '',
      username: user.username ?? '',
      email: user.email ?? '',
      role_names: user.role_names ?? [],
    });
  }

  // ------------------------------------------------------------
  // Editing
  // ------------------------------------------------------------

  startEditing(): void {
    const currentUser = this.user();

    if (!currentUser) {
      return;
    }

    this.errorMessage.set(null);
    this.successMessage.set(null);

    /**
     * Reset the form to the currently saved values before
     * entering edit mode.
     */
    this.populateForm(currentUser);

    this.isEditing.set(true);
  }

  cancelEditing(): void {
    const currentUser = this.user();

    if (currentUser) {
      this.populateForm(currentUser);
    }

    this.isEditing.set(false);
    this.errorMessage.set(null);
  }

  // ------------------------------------------------------------
  // Roles
  // ------------------------------------------------------------

  toggleRole(role: string): void {
    /**
     * Only admins should be able to modify roles.
     */
    if (!this.isAdmin) {
      return;
    }

    const currentRoles = this.profileForm.controls.role_names.value;

    if (currentRoles.includes(role)) {
      /**
       * Remove role
       */
      this.profileForm.controls.role_names.setValue(
        currentRoles.filter((currentRole) => currentRole !== role),
      );
    } else {
      /**
       * Add role
       */
      this.profileForm.controls.role_names.setValue([...currentRoles, role]);
    }
  }

  hasRole(role: string): boolean {
    return this.profileForm.controls.role_names.value.includes(role);
  }

  // ------------------------------------------------------------
  // Save profile
  // ------------------------------------------------------------

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const currentUser = this.user();

    if (!currentUser) {
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const { first_name, last_name, username, email, role_names } = this.profileForm.getRawValue();

    /**
     * Roles are deliberately excluded from the normal
     * profile update request.
     */
    const profileData = {
      first_name,
      last_name,
      username,
      email,
    };

    // ----------------------------------------------------------
    // Update normal profile information
    // ----------------------------------------------------------

    this.userService.updateUser(currentUser.id ?? '', profileData).subscribe({
      next: (updatedUser) => {
        /**
         * If this is an admin, update roles as a separate
         * operation using the dedicated roles endpoint.
         */
        if (this.isAdmin) {
          this.updateRoles(currentUser.id ?? '', role_names, updatedUser);

          return;
        }

        /**
         * Normal user.
         */
        this.user.set(updatedUser);

        if (!this.isViewingOtherUser()) {
          this.authService.setCurrentUser(updatedUser);
        }

        this.isEditing.set(false);
        this.isSaving.set(false);

        this.successMessage.set('Profile updated successfully.');
      },

      error: (error) => {
        this.isSaving.set(false);

        this.errorMessage.set(error?.error?.detail ?? 'Failed to update profile.');
      },
    });
  }

  // ------------------------------------------------------------
  // Update roles
  // ------------------------------------------------------------

  private updateRoles(userId: string, role_names: string[], updatedUser: IUser): void {
    this.userService
      .updateUserRoles(userId, {
        role_names,
      })
      .subscribe({
        next: (userWithRoles) => {
          /**
           * Prefer the response from the roles endpoint because
           * it should contain the latest role assignments.
           */
          const finalUser: IUser = {
            ...updatedUser,
            ...userWithRoles,
            role_names: userWithRoles.role_names ?? role_names,
          };

          this.user.set(finalUser);

          /**
           * If the admin is editing their own account,
           * update the authenticated user's local state.
           */
          if (!this.isViewingOtherUser()) {
            this.authService.setCurrentUser(finalUser);
          }

          this.isEditing.set(false);
          this.isSaving.set(false);

          this.successMessage.set('Profile and roles updated successfully.');
        },

        error: (error) => {
          this.isSaving.set(false);

          this.errorMessage.set(
            error?.error?.detail ?? 'Profile was updated, but roles could not be updated.',
          );
        },
      });
  }

  // ------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------

  goBack(): void {
    this.router.navigate(['/']);
  }

  // ------------------------------------------------------------
  // Validation helpers
  // ------------------------------------------------------------

  hasError(controlName: string, error: string): boolean {
    const control = this.profileForm.get(controlName);

    return !!(control && control.touched && control.hasError(error));
  }
}
