import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  currentTrack: any;
  isPlaying = false;
  currentTime = 0;
  volume = 1;
  audio = new Audio();

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentTrack$.subscribe((track) => {
      if (track) {
        this.currentTrack = track;
        this.playTrack();
      }
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime * 1000;
    });
    this.audio.volume = this.volume;
  }

  async playTrack() {
    console.log('Playing track:', this.currentTrack); // Debug log
    if (this.currentTrack && this.currentTrack.preview_url) {
      this.audio.src = this.currentTrack.preview_url;
      try {
        await this.audio.play();
        this.isPlaying = true;
        console.log('Track is playing'); // Debug log
      } catch (error) {
        console.error('Error playing track:', error);
      }
    }
  }

  async togglePlay() {
    console.log('Toggle play called'); // Debug log
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      console.log('Track paused'); // Debug log
    } else {
      try {
        await this.audio.play();
        this.isPlaying = true;
        console.log('Track is playing'); // Debug log
      } catch (error) {
        console.error('Error playing track:', error);
      }
    }
  }

  next() {
    console.log('Next button clicked');
    this.sharedService.next();
  }

  previous() {
    console.log('Previous button clicked');
    this.sharedService.previous();
  }
  shufflePlaylist() {
    this.sharedService.shufflePlaylist();
  }

  tracking(event: any) {
    this.audio.currentTime = event.target.value / 1000;
  }

  time(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = parseInt(((ms % 60000) / 1000).toFixed(0), 10);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }
}
