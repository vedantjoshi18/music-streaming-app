import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeIn } from '../../animations';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [fadeIn]
})
export class FeedbackComponent {
  name = '';
  email = '';
  message = '';
  rating = 5;

  constructor(private snackBar: MatSnackBar) {}

  submit(): void {
    if (!this.name.trim() || !this.message.trim()) return;
    this.snackBar.open('Thank you for your feedback!', 'Close', { duration: 3000 });
    this.name = '';
    this.email = '';
    this.message = '';
    this.rating = 5;
  }
}
