import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Song } from '../models/models';

export interface StreamState {
  playing: boolean;
  currentTime: number;
  duration: number;
  readableCurrentTime: string;
  readableDuration: string;
  volume: number;
  error: boolean;
  canplay: boolean;
}

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly audio = new Audio();
  private readonly stateSubject = new BehaviorSubject<StreamState>(this.getDefaultState());
  private readonly currentSongSubject = new BehaviorSubject<Song | null>(null);
  private readonly songEndedSubject = new Subject<void>();

  constructor() {
    this.audio.addEventListener('timeupdate', () => this.updateState());
    this.audio.addEventListener('loadedmetadata', () => this.updateState());
    this.audio.addEventListener('canplay', () => {
      const state = this.stateSubject.value;
      this.stateSubject.next({ ...state, canplay: true, error: false });
    });
    this.audio.addEventListener('playing', () => {
      const state = this.stateSubject.value;
      this.stateSubject.next({ ...state, playing: true, error: false });
    });
    this.audio.addEventListener('pause', () => {
      const state = this.stateSubject.value;
      this.stateSubject.next({ ...state, playing: false });
    });
    this.audio.addEventListener('ended', () => {
      this.songEndedSubject.next();
    });
    this.audio.addEventListener('error', () => {
      const state = this.stateSubject.value;
      this.stateSubject.next({ ...state, error: true, playing: false });
    });
    this.audio.volume = 0.7;
  }

  playStream(url: string): void {
    this.audio.src = url;
    this.audio.load();
    this.audio.play().catch(() => {});
  }

  play(): void {
    this.audio.play().catch(() => {});
  }

  pause(): void {
    this.audio.pause();
  }

  seekTo(seconds: number): void {
    if (Number.isFinite(seconds)) {
      this.audio.currentTime = seconds;
    }
  }

  setVolume(vol: number): void {
    this.audio.volume = Math.max(0, Math.min(1, vol));
  }

  getVolume(): number {
    return this.audio.volume;
  }

  setSong(song: Song): void {
    this.currentSongSubject.next(song);
  }

  getCurrentSong(): Observable<Song | null> {
    return this.currentSongSubject.asObservable();
  }

  getState(): Observable<StreamState> {
    return this.stateSubject.asObservable();
  }

  getSongEnded(): Observable<void> {
    return this.songEndedSubject.asObservable();
  }

  formatTime(seconds: number): string {
    if (!Number.isFinite(seconds) || Number.isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  private updateState(): void {
    this.stateSubject.next({
      playing: !this.audio.paused,
      currentTime: this.audio.currentTime,
      duration: this.audio.duration || 0,
      readableCurrentTime: this.formatTime(this.audio.currentTime),
      readableDuration: this.formatTime(this.audio.duration),
      volume: this.audio.volume,
      error: false,
      canplay: true
    });
  }

  private getDefaultState(): StreamState {
    return {
      playing: false,
      currentTime: 0,
      duration: 0,
      readableCurrentTime: '0:00',
      readableDuration: '0:00',
      volume: 0.7,
      error: false,
      canplay: false
    };
  }
}
