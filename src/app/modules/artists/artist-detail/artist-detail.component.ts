import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../../services/music.service';
import { QueueService } from '../../../services/queue.service';
import { AudioService } from '../../../services/audio.service';
import { Artist, Song } from '../../../models/models';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  artist: Artist | null = null;
  artistSongs: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private queueService: QueueService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.musicService.getArtistById(id).subscribe(artist => {
      this.artist = artist || null;
    });
    this.musicService.getSongs().subscribe(songs => {
      this.artistSongs = songs.filter(s => s.artistId === id);
    });
  }

  playSong(song: Song): void {
    this.queueService.setQueue(this.artistSongs, this.artistSongs.indexOf(song));
    this.queueService.playSong(song);
  }

  formatTime(seconds: number): string {
    return this.audioService.formatTime(seconds);
  }
}
