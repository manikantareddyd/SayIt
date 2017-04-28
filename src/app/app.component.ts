import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ModeService } from '../providers/mode-service';
import { SayItService } from '../providers/sayit-service';
import { BuilderHomePage } from '../pages/builder/home/home';
import { ShareHomePage } from '../pages/share/home/home';
import { LiveHomePage } from '../pages/live/home/home';
import { IntroPage } from '../pages/intro/intro';
import { Live2HomePage } from '../pages/live2/home/home';

import { SettingsPage } from "../pages/settings/settings";
import { AboutPage } from "../pages/about/about";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  menu_pages: Array<{title: string, component: any, icon: string}>;
  footer_pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform, 
    public modeservice: ModeService,
    public sayItService: SayItService,
    public splashscreen: SplashScreen,
    public statusbar: StatusBar
    ) {
    this.modeservice.getMode().then((mode)=>{
      
      this.sayItService.storage.get('intro-done').then(done => {
        if (!done) {
          console.log("new boot");
          // this.sayItService.loadFromJSONData(this.sayItService.defaultCats);
          this.sayItService.storage.set('intro-done', true);
          this.rootPage = IntroPage;
          // this.nav.setRoot(IntroPage);
        }
        else{
          if(mode=="mode1")
            this.rootPage = LiveHomePage;
          else
            this.rootPage = Live2HomePage;
        }
      });
    });


    this.initializeApp();
    // used for an example of ngFor and navigation
    this.menu_pages = [
      { title: 'Mode 1', component: LiveHomePage, icon: 'moon' },
      { title: 'Mode 2', component: Live2HomePage, icon: 'planet' },
      { title: 'Builder', component: BuilderHomePage, icon: 'build' },
      { title: 'Share', component: ShareHomePage, icon: 'share'}
    ];

    this.footer_pages = [
      { title: 'Help', component: IntroPage, icon:'help-circle'},
      { title: 'Settings', component: SettingsPage, icon:'settings'},
      { title: 'About', component: AboutPage, icon: 'thumbs-up'}
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
