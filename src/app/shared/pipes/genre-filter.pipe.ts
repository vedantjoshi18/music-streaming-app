import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../../models/models';

@Pipe({ name: 'genreFilter' })
export class GenreFilterPipe implements PipeTransform {
  transform(songs: Song[] | null, genre: string): Song[] {
    if (!songs) return [];
    if (!genre) return songs;
    return songs.filter(s => s.genre.toLowerCase() === genre.toLowerCase());
  }
}
