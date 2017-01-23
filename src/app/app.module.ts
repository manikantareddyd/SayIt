import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EditorHomePage } from '../pages/editor/home/home';
import { LiveHomePage } from '../pages/live/home/home';

@NgModule({
  declarations: [
    MyApp,
    EditorHomePage,
    LiveHomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditorHomePage,
    LiveHomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
