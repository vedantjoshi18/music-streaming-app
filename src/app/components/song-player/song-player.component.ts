import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioService, StreamState } from '../../services/audio.service';
import { QueueService } from '../../services/queue.service';
import { Song } from '../../models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-song-player',
  templateUrl: './song-player.component.html',
  styleUrls: ['./song-player.component.scss']
})
export class SongPlayerComponent implements OnInit, OnDestroy {
  state!: StreamState;
  currentSong: Song | null = null;
  shuffleActive = false;
  repeatActive = false;
  isMuted = false;
  private previousVolume = 0.7;
  private subscriptions: Subscription[] = [];

  constructor(
    private audioService: AudioService,
    private queueService: QueueService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.audioService.getState().subscribe(s => this.state = s),
      this.audioService.getCurrentSong().subscribe(s => this.currentSong = s),
      this.audioService.getSongEnded().subscribe(() => this.onSongEnded())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  togglePlay(): void {
    if (this.state.playing) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
  }

  next(): void {
    this.queueService.next();
  }

  previous(): void {
    this.queueService.previous();
  }

  onSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioService.seekTo(Number(input.value));
  }

  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const vol = Number(input.value);
    this.audioService.setVolume(vol);
    this.isMuted = vol === 0;
  }

  toggleMute(): void {
    if (this.isMuted) {
      this.audioService.setVolume(this.previousVolume);
      this.isMuted = false;
    } else {
      this.previousVolume = this.audioService.getVolume();
      this.audioService.setVolume(0);
      this.isMuted = true;
    }
  }

  toggleShuffle(): void {
    this.shuffleActive = !this.shuffleActive;
    this.queueService.setShuffle(this.shuffleActive);
  }

  toggleRepeat(): void {
    this.repeatActive = !this.repeatActive;
  }

  toggleFavorite(): void {
    if (this.currentSong) {
      this.queueService.toggleFavorite(this.currentSong.id);
    }
  }

  isFavorite(): boolean {
    return this.currentSong ? this.queueService.isFavorite(this.currentSong.id) : false;
  }

  private onSongEnded(): void {
    if (this.repeatActive) {
      this.audioService.seekTo(0);
      this.audioService.play();
    } else {
      this.queueService.next();
    }
  }

  getVolumeIcon(): string {
    if (this.isMuted || this.state?.volume === 0) return 'volume_off';
    if (this.state?.volume < 0.5) return 'volume_down';
    return 'volume_up';
  }
}
