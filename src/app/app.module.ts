import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SayItService } from '../providers/sayit-service';
import { Storage } from '@ionic/storage';

import { BuilderHomePage } from '../pages/builder/home/home';
import { EditorHomePage } from '../pages/builder/editor/home/home';



import { LiveHomePage } from '../pages/live/home/home';

@NgModule({
  declarations: [
    MyApp,
    BuilderHomePage,
    EditorHomePage,
    LiveHomePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BuilderHomePage,
    EditorHomePage,
    LiveHomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SayItService, Storage]
})
export class AppModule {}
