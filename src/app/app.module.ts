import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';

import { SayItService } from '../providers/sayit-service';
import { ShareService } from '../providers/share-service';
import { ModeService } from '../providers/mode-service';
import { PictureService } from '../providers/picture-service';
import { Murmurhash3Gc } from '../providers/murmurhash3-gc';

import { IonicStorageModule } from '@ionic/storage';

import { BuilderHomePage } from '../pages/builder/home/home';
import { EditorHomePage } from '../pages/builder/editor/home/home';
import { EditorCategoryPage } from '../pages/builder/editor/category/category';
import { EditorActionPage } from '../pages/builder/editor/action/action';

import { ShareHomePage } from '../pages/share/home/home';
import { ShareFilePage } from '../pages/share/file/file';
import { ShareSendPage } from '../pages/share/send/send';


import { SettingsPage } from '../pages/settings/settings';

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

    ShareHomePage,
    ShareFilePage,
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
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BuilderHomePage,
    SettingsPage,
    
    ShareHomePage,
    ShareFilePage,
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
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }, 
    SayItService,
    ShareService,
    ModeService,
    Murmurhash3Gc,
    PictureService,
    File,
    SocialSharing
  ]
})
export class AppModule {}
