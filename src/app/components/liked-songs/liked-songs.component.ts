import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { QueueService } from '../../services/queue.service';
import { AudioService } from '../../services/audio.service';
import { Song } from '../../models/models';
import { fadeIn } from '../../animations';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.scss'],
  animations: [fadeIn]
})
export class LikedSongsComponent implements OnInit {
  likedSongs: Song[] = [];
  allSongs: Song[] = [];

  constructor(
    private musicService: MusicService,
    private queueService: QueueService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.musicService.getSongs().subscribe(songs => {
      this.allSongs = songs;
      this.loadLikedSongs();
    });
  }

  loadLikedSongs(): void {
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.likedSongs = this.allSongs.filter(s => favorites.includes(s.id));
  }

  playSong(song: Song): void {
    this.queueService.setQueue(this.likedSongs, this.likedSongs.indexOf(song));
    this.queueService.playSong(song);
  }

  playAll(): void {
    if (this.likedSongs.length > 0) {
      this.queueService.setQueue(this.likedSongs, 0);
      this.queueService.playSong(this.likedSongs[0]);
    }
  }

  removeFavorite(song: Song): void {
    this.queueService.toggleFavorite(song.id);
    this.loadLikedSongs();
  }

  formatTime(seconds: number): string {
    return this.audioService.formatTime(seconds);
  }
}
