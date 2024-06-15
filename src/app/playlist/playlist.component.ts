import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { SharedService } from '../shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlist: any[] = [];
  errorMessage: string = '';

  constructor(
    private spotifyService: SpotifyService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loadPlaylist();
  }

  async loadPlaylist() {
    try {
      const data = await this.spotifyService.getPlaylist(environment.spotify.playlistId);
      this.playlist = data.tracks.items.map((item : any) => item.track);
      this.sharedService.setPlaylist(this.playlist);
    } catch (error) {
      this.errorMessage = 'Failed to load playlist. Please try again.';
    }
  }

  selectTrack(track: any) {
    console.log('Track selected:', track); // Debug log
    this.sharedService.setCurrentTrack(track);
  }
}
