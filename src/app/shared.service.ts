import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private currentTrackS = new BehaviorSubject<any>(null);
  currentTrack$ = this.currentTrackS.asObservable();

  private playlistSource = new BehaviorSubject<any[]>([]);
  playlist$ = this.playlistSource.asObservable();

  private currentTrackIndex = -1; 

  setCurrentTrack(track: any) {
    this.currentTrackS.next(track);
  }

  setPlaylist(playlist: any[]) {
    this.playlistSource.next(playlist);
    this.currentTrackIndex = -1; 
  }

  shufflePlaylist() {
    const playlist = this.playlistSource.getValue();
    if (playlist.length > 1) {
      for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
      }
      this.playlistSource.next([...playlist]); 
      this.currentTrackIndex = 0; 
      this.setCurrentTrack(playlist[0]);
    }
  }

  next() {
    const playlist = this.playlistSource.getValue();
    if (playlist.length > 0 && this.currentTrackIndex < playlist.length - 1) {
      this.currentTrackIndex++;
      this.setCurrentTrack(playlist[this.currentTrackIndex]);
    }
  }

  previous() {
    const playlist = this.playlistSource.getValue();
    if (playlist.length > 0 && this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
      this.setCurrentTrack(playlist[this.currentTrackIndex]);
    }
  }
}
