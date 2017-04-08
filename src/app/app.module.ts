import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SayItService } from '../providers/sayit-service';

import { IonicStorageModule } from '@ionic/storage';

import { BuilderHomePage } from '../pages/builder/home/home';
import { EditorHomePage } from '../pages/builder/editor/home/home';
import { EditorCategoryPage } from '../pages/builder/editor/category/category';
import { EditorActionPage } from '../pages/builder/editor/action/action';



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
    SayItService
  ]
})
export class AppModule {}
