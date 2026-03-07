import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudioService } from './services/audio.service';
import { fadeIn } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeIn]
})
export class AppComponent {
  title = 'Musico';

  constructor(private audioService: AudioService, private snackBar: MatSnackBar) {
    this.audioService.getState().subscribe(state => {
      if (state.error) {
        this.snackBar.open('Playback error. Skipping…', 'OK', { duration: 3000 });
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
