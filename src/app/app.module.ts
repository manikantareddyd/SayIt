import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { SayItService } from '../providers/sayit-service';
import { ShareService } from '../providers/share-service';
import { LoadService } from '../providers/load-service';
import { ModeService } from '../providers/mode-service';
import { PictureService } from '../providers/picture-service';
import { Murmurhash3Gc } from '../providers/murmurhash3-gc';

import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';

import { BuilderHomePage } from '../pages/builder/home/home';
import { EditorHomePage } from '../pages/builder/editor/home/home';
import { EditorCategoryPage } from '../pages/builder/editor/category/category';
import { EditorActionPage } from '../pages/builder/editor/action/action';

import { ShareHomePage } from '../pages/share/home/home';
import { ShareLoadPage } from '../pages/share/load/load';
import { ShareSendPage } from '../pages/share/send/send';


import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';

import { LiveHomePage } from '../pages/live/home/home';
import { LiveCategoryPage } from '../pages/live/category/category';
import { LiveActionPage } from '../pages/live/action/action';

import { Live2HomePage } from '../pages/live2/home/home';
import { Live2CategoryPage } from '../pages/live2/category/category';
import { Live2ActionPage } from '../pages/live2/action/action';

@NgModule({
  declarations: [
    MyApp,
    BuilderHomePage,
    SettingsPage,
    AboutPage,

    ShareHomePage,
    ShareLoadPage,
    ShareSendPage,

    EditorHomePage,
    EditorCategoryPage,
    EditorActionPage,

    LiveHomePage,
    LiveCategoryPage,
    LiveActionPage,

    Live2HomePage,
    Live2CategoryPage,
    Live2ActionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BuilderHomePage,
    SettingsPage,
    AboutPage,
    
    ShareHomePage,
    ShareLoadPage,
    ShareSendPage,

    EditorHomePage,
    EditorCategoryPage,
    EditorActionPage,
    
    LiveHomePage,
    LiveCategoryPage,
    LiveActionPage,

    Live2HomePage,
    Live2CategoryPage,
    Live2ActionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FilePath,
    FileChooser,
    Camera,
    TextToSpeech,
    SocialSharing,
    SayItService,
    ShareService,
    ModeService,
    Murmurhash3Gc,
    PictureService,
    LoadService,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
