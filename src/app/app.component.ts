import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ModeService } from '../providers/mode-service';

import { BuilderHomePage } from '../pages/builder/home/home';
import { ShareHomePage } from '../pages/share/home/home';
import { LiveHomePage } from '../pages/live/home/home';
import { Live2HomePage } from '../pages/live2/home/home';

import { SettingsPage } from "../pages/settings/settings";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public modeservice: ModeService,
    public splashscreen: SplashScreen,
    public statusbar: StatusBar
    ) {
    this.modeservice.getMode().then((mode)=>{
      if(mode=="mode1")
        this.rootPage = LiveHomePage;
      else
        this.rootPage = Live2HomePage;
    });
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mode 1', component: LiveHomePage },
      { title: 'Mode 2', component: Live2HomePage },
      { title: 'Builder', component: BuilderHomePage },
      { title: 'Share', component: ShareHomePage}, 
      { title: 'Settings', component: SettingsPage}
    ];
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.statusbar.styleDefault();
      this.splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
