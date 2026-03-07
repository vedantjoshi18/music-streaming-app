import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Playlist } from '../../models/models';
import { fadeIn } from '../../animations';

@Component({
  selector: 'app-playlist-manager',
  templateUrl: './playlist-manager.component.html',
  styleUrls: ['./playlist-manager.component.scss'],
  animations: [fadeIn]
})
export class PlaylistManagerComponent implements OnInit {
  playlists: Playlist[] = [];
  newPlaylistName = '';
  newPlaylistDesc = '';

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlists = this.musicService.getPlaylists();
  }

  createPlaylist(): void {
    if (!this.newPlaylistName.trim()) return;
    const playlist: Playlist = {
      id: Date.now().toString(),
      name: this.newPlaylistName.trim(),
      description: this.newPlaylistDesc.trim(),
      songIds: [],
      createdAt: new Date().toISOString()
    };
    this.musicService.savePlaylist(playlist);
    this.newPlaylistName = '';
    this.newPlaylistDesc = '';
    this.loadPlaylists();
  }

  deletePlaylist(id: string): void {
    this.musicService.deletePlaylist(id);
    this.loadPlaylists();
  }
}
