import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Song, Artist, Album, Playlist } from '../models/models';

interface DbJson {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

@Injectable({ providedIn: 'root' })
export class MusicService {
  private readonly dbUrl = 'assets/db.json';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<DbJson>(this.dbUrl).pipe(map(db => db.songs));
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<DbJson>(this.dbUrl).pipe(map(db => db.artists));
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<DbJson>(this.dbUrl).pipe(map(db => db.albums));
  }

  getArtistById(id: number): Observable<Artist | undefined> {
    return this.getArtists().pipe(map(artists => artists.find(a => a.id === id)));
  }

  getPlaylists(): Playlist[] {
    const stored = localStorage.getItem('musico_playlists');
    return stored ? JSON.parse(stored) : [];
  }

  savePlaylist(playlist: Playlist): void {
    const playlists = this.getPlaylists();
    playlists.push(playlist);
    localStorage.setItem('musico_playlists', JSON.stringify(playlists));
  }

  updatePlaylist(playlist: Playlist): void {
    const playlists = this.getPlaylists();
    const idx = playlists.findIndex(p => p.id === playlist.id);
    if (idx !== -1) {
      playlists[idx] = playlist;
      localStorage.setItem('musico_playlists', JSON.stringify(playlists));
    }
  }

  deletePlaylist(id: string): void {
    const playlists = this.getPlaylists().filter(p => p.id !== id);
    localStorage.setItem('musico_playlists', JSON.stringify(playlists));
  }
}
