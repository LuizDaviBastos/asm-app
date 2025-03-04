import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { AlertService } from 'src/services/alert-service';
import { FcmService } from 'src/services/fcm-service';
import { MeliService } from 'src/services/meli-service';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public loaded: boolean = false;
  constructor(private router: Router, private zone: NgZone, private platform: Platform,
    private cdr: ChangeDetectorRef, private meliService: MeliService,
    private alertService: AlertService,
    private deploy: Deploy) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (window.navigator.platform == "Win32") {
          return;
        }
        this.cdr.detectChanges();
        if (event.url.includes("/edit") || event.url.includes("settings") || event.url.includes('/auth')) {

          StatusBar.setBackgroundColor({
            color: "#ebebeb"
          })
        } else {
          StatusBar.setBackgroundColor({
            color: "#FFDE33"
          })
        }
      }
    });

    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const url = new URL(event.url);
      let params = '';
      url.searchParams.forEach((value, key) => {
        params += `${key}=${value}&`
      });
      const navigateTo = url.pathname + `?${params}`;
      this.router.navigateByUrl(navigateTo);
    });

  
  }
  async ngOnInit() {
    await this.deploy.configure({channel: 'asm_channel'});
  }
}
