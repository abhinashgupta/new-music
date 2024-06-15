import { Component } from '@angular/core';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery = '';
  searchResults: any[] = [];
  errorMessage: string= '';

  constructor(
    private spotifyService: SpotifyService,
  ) {}

  async search() {
    if (this.searchQuery.length > 2) {
      try {
        const results = await this.spotifyService.searchTracks(
          this.searchQuery
        
        );
        this.searchResults = results;
        
      } catch (error) {
        this.errorMessage = 'Failed to search tracks. Please try again.';
      }
    }
  }
}
