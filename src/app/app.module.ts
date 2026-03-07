import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongPlayerComponent } from './components/song-player/song-player.component';
import { PlaylistManagerComponent } from './components/playlist-manager/playlist-manager.component';
import { LoginComponent } from './components/login/login.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LikedSongsComponent } from './components/liked-songs/liked-songs.component';

import { HighlightPlayingDirective } from './shared/directives/highlight-playing.directive';
import { AlbumAnimateDirective } from './shared/directives/album-animate.directive';
import { GenreFilterPipe } from './shared/pipes/genre-filter.pipe';
import { DurationPipe } from './shared/pipes/duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SongListComponent,
    SongPlayerComponent,
    PlaylistManagerComponent,
    LoginComponent,
    FeedbackComponent,
    LikedSongsComponent,
    HighlightPlayingDirective,
    AlbumAnimateDirective,
    GenreFilterPipe,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
