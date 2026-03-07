import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { PlaylistManagerComponent } from './components/playlist-manager/playlist-manager.component';
import { LoginComponent } from './components/login/login.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LikedSongsComponent } from './components/liked-songs/liked-songs.component';

const routes: Routes = [
  { path: '', redirectTo: 'songs', pathMatch: 'full' },
  { path: 'songs', component: SongListComponent },
  { path: 'playlists', component: PlaylistManagerComponent },
  { path: 'liked', component: LikedSongsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feedback', component: FeedbackComponent },
  {
    path: 'artists',
    loadChildren: () => import('./modules/artists/artists.module').then(m => m.ArtistsModule)
  },
  { path: '**', redirectTo: 'songs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
