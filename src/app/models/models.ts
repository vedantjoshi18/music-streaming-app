export interface Song {
  id: number;
  title: string;
  artistId: number;
  albumId: number;
  duration: number;
  fileUrl: string;
  coverUrl: string;
  genre: string;
}

export interface Artist {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
}

export interface Album {
  id: number;
  title: string;
  artistId: number;
  year: number;
  coverUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songIds: number[];
  createdAt: string;
}

export enum AccessLevel {
  Free = 'FREE',
  Premium = 'PREMIUM'
}
