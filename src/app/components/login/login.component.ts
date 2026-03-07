import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeIn } from '../../animations';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeIn]
})
export class LoginComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLogin = true;
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/songs']);
    }
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  submit(): void {
    if (this.isLogin) {
      this.login();
    } else {
      this.signup();
    }
  }

  private login(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.snackBar.open('Please fill in all fields', 'OK', { duration: 3000, panelClass: 'dark-snackbar' });
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const result = this.userService.login(this.email, this.password);
      this.loading = false;
      if (result.success) {
        this.snackBar.open('Welcome back!', '🎵', { duration: 2000, panelClass: 'dark-snackbar' });
        this.router.navigate(['/songs']);
      } else {
        this.snackBar.open(result.error || 'Login failed', 'OK', { duration: 3000, panelClass: 'dark-snackbar' });
      }
    }, 600);
  }

  continueAsGuest(): void {
    this.snackBar.open('Browsing as guest', '🎵', { duration: 2000, panelClass: 'dark-snackbar' });
    this.router.navigate(['/songs']);
  }

  private signup(): void {
    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      this.snackBar.open('Please fill in all fields', 'OK', { duration: 3000, panelClass: 'dark-snackbar' });
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'OK', { duration: 3000, panelClass: 'dark-snackbar' });
      return;
    }
    if (this.password.length < 6) {
      this.snackBar.open('Password must be at least 6 characters', 'OK', { duration: 3000, panelClass: 'dark-snackbar' });
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const result = this.userService.signup(this.name, this.email, this.password);
      this.loading = false;
      if (result.success) {
        this.snackBar.open('Account created! Welcome to Musico 🎶', '✨', { duration: 3000, panelClass: 'dark-snackbar' });
        this.router.navigate(['/songs']);
      } else {
        this.snackBar.open(result.error || 'Signup failed', 'OK', { duration: 3000, panelClass: 'dark-snackbar' });
      }
    }, 600);
  }
}
