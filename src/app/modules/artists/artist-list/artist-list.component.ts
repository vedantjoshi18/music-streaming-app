import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../../services/music.service';
import { Artist } from '../../../models/models';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.getArtists().subscribe(artists => {
      this.artists = artists;
    });
  }
}
