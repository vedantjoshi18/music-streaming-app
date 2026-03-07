import { Injectable } from '@angular/core';
import { Song } from '../models/models';
import { AudioService } from './audio.service';

@Injectable({ providedIn: 'root' })
export class QueueService {
  private queue: Song[] = [];
  private currentIndex = 0;
  private shuffleEnabled = false;

  constructor(private audioService: AudioService) {}

  setQueue(songs: Song[], startIndex: number = 0): void {
    this.queue = [...songs];
    this.currentIndex = startIndex;
  }

  getQueue(): Song[] {
    return this.queue;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  playSong(song: Song): void {
    const idx = this.queue.findIndex(s => s.id === song.id);
    if (idx !== -1) {
      this.currentIndex = idx;
    }
    this.audioService.setSong(song);
    this.audioService.playStream(song.fileUrl);
  }

  addToQueue(song: Song): void {
    this.queue.push(song);
  }

  next(): Song | null {
    if (this.queue.length === 0) return null;
    if (this.shuffleEnabled) {
      this.currentIndex = Math.floor(Math.random() * this.queue.length);
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.queue.length;
    }
    const song = this.queue[this.currentIndex];
    this.audioService.setSong(song);
    this.audioService.playStream(song.fileUrl);
    return song;
  }

  previous(): Song | null {
    if (this.queue.length === 0) return null;
    this.currentIndex = (this.currentIndex - 1 + this.queue.length) % this.queue.length;
    const song = this.queue[this.currentIndex];
    this.audioService.setSong(song);
    this.audioService.playStream(song.fileUrl);
    return song;
  }

  setShuffle(enabled: boolean): void {
    this.shuffleEnabled = enabled;
  }

  isShuffleEnabled(): boolean {
    return this.shuffleEnabled;
  }

  toggleFavorite(songId: number): void {
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const idx = favorites.indexOf(songId);
    if (idx === -1) {
      favorites.push(songId);
    } else {
      favorites.splice(idx, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  isFavorite(songId: number): boolean {
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(songId);
  }
}
