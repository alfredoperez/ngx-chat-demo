import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';
import * as screenfull from 'screenfull';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav')
  sidenav;

  sidenavOpen = false;
  sidenavMode = 'side';
  isMobile = false;

  private _routerEventsSubscription: Subscription;
  private _mediaSubscription: Subscription;

  constructor(private media: ObservableMedia,
              private router: Router) {
  }

  ngOnInit() {
    this._mediaSubscription = this.media.asObservable()
      .subscribe((change: MediaChange) => {
        const isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');

        this.isMobile = isMobile;
        this.sidenavMode = (isMobile) ? 'over' : 'side';
        this.sidenavOpen = !isMobile;
      });

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if ( event instanceof NavigationEnd && this.isMobile ) {
        this.sidenav.close();
      }
    });
  }


  ngOnDestroy() {
    this._mediaSubscription.unsubscribe();
  }


  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
