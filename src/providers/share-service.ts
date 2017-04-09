import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import 'rxjs/add/operator/map';

declare var cordova: any;
/*
  Generated class for the ShareService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShareService {

  constructor(
    public http: Http,
    public file: File,
    public ss: SocialSharing
  ) {
    console.log('Hello ShareService Provider');
  }

  share(categories){
    this.file.writeFile(
      cordova.file.dataDirectory, 
      "sayit_data.json", 
      JSON.stringify(categories), 
      true).then(
        (update) => {
          this.ss.share("Actions for SayIt App", "SayIt Data", cordova.file.dataDirectory+"/sayit_data.json", "").then(
            (update) => {
            }
          ).catch(
            (err)=>{
              console.log(err);
            }
          )
        }
      ).catch(
        (err) => {
          console.log(err);
        }
    );
  }

}
