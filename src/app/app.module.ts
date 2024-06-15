import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { SpotifyService } from './spotify.service';
import { PlaylistComponent } from './playlist/playlist.component';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SearchComponent,
    PlaylistComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
  ],
  providers: [SpotifyService, SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
