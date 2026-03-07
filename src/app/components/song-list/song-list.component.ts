import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { AudioService } from '../../services/audio.service';
import { QueueService } from '../../services/queue.service';
import { Song, Playlist } from '../../models/models';
import { staggerList } from '../../animations';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  animations: [staggerList]
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  searchQuery = '';
  selectedGenre = '';
  genres: string[] = [];
  playlists: Playlist[] = [];
  currentSong: Song | null = null;

  constructor(
    private musicService: MusicService,
    private audioService: AudioService,
    private queueService: QueueService
  ) {}

  ngOnInit(): void {
    this.musicService.getSongs().subscribe(songs => {
      this.songs = songs;
      const genreSet = new Set(songs.map(s => s.genre));
      this.genres = Array.from(genreSet).sort((a, b) => a.localeCompare(b));
    });
    this.audioService.getCurrentSong().subscribe(song => {
      this.currentSong = song;
    });
    this.loadPlaylists();
  }

  get filteredSongs(): Song[] {
    let result = this.songs;
    if (this.selectedGenre) {
      result = result.filter(s => s.genre.toLowerCase() === this.selectedGenre.toLowerCase());
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(s => s.title.toLowerCase().includes(q));
    }
    return result;
  }

  get featuredSongs(): Song[] {
    return this.songs.slice(0, 5);
  }

  get trendingSongs(): Song[] {
    return this.songs.slice(5, 20);
  }

  selectGenre(genre: string): void {
    this.selectedGenre = this.selectedGenre === genre ? '' : genre;
  }

  playSong(song: Song): void {
    this.queueService.playSong(song);
  }

  playAndQueue(song: Song): void {
    const list = this.filteredSongs;
    const idx = list.findIndex(s => s.id === song.id);
    this.queueService.setQueue(list, idx);
    this.queueService.playSong(song);
  }

  toggleFavorite(song: Song): void {
    this.queueService.toggleFavorite(song.id);
  }

  isFavorite(song: Song): boolean {
    return this.queueService.isFavorite(song.id);
  }

  addToQueue(song: Song): void {
    this.queueService.addToQueue(song);
  }

  addToPlaylist(song: Song, playlist: Playlist): void {
    if (!playlist.songIds.includes(song.id)) {
      playlist.songIds.push(song.id);
      this.musicService.updatePlaylist(playlist);
    }
  }

  loadPlaylists(): void {
    this.playlists = this.musicService.getPlaylists();
  }

  isPlaying(song: Song): boolean {
    return this.currentSong?.id === song.id;
  }

  formatTime(seconds: number): string {
    return this.audioService.formatTime(seconds);
  }
}
