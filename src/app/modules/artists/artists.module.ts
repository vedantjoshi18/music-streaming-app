import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsRoutingModule } from './artists-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';

@NgModule({
  declarations: [ArtistListComponent, ArtistDetailComponent],
  imports: [CommonModule, ArtistsRoutingModule, MaterialModule]
})
export class ArtistsModule { }
