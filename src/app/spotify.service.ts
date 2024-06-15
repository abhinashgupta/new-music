import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private authToken: string = '';

  constructor() {
    this.AuthToken();
  }

  private async AuthToken() {
    try {
      const authResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              btoa(
                `${environment.spotify.clientId}:${environment.spotify.clientSecret}`
              ),
          },
        }
      );
      this.authToken = authResponse.data.access_token;
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
      throw error;
    }
  }

  async getPlaylist(playlistId: string) {
    await this.waitForAuthToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      }
    );
    return response.data;
  }

  async searchTracks(query: string) {
    await this.waitForAuthToken();
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
      params: {
        q: query,
        type: 'track',
      },
    });
    return response.data.tracks.items;
  }

  private async waitForAuthToken() {
    while (!this.authToken) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms
    }
  }
}
