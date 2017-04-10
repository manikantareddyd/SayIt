import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SayItService } from '../../../providers/sayit-service';
import { ShareService } from '../../../providers/share-service';
/*
  Generated class for the Send page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-share-send',
  templateUrl: 'send.html'
})
export class ShareSendPage {
  categories;
  enable;
  nc =0;
  state = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public sayItService: SayItService,
    public shareService: ShareService
  ) {
    this.sayItService.getCategories().then((categories)=>{
      this.categories = this.addCheck(categories);
      //console.log("Fetched Data.\n", categories);
    })
  }
  nCheck(t){
    var nc = this.nc
    if(t)
    {
      nc = nc + 1;
    }
    else
    {
      nc = nc - 1;
    }
    this.nc = nc;
    if(nc == 0) this.state = true;
    else this.state = false;
    console.log(nc, this.state);
  }
  addCheck(categories){
    var i=0, j=0;
    //console.log(categories);
    for(i=0;i<categories.length;i++)
    {
      if(!categories[i].actions)
        categories[i]['actions'] = [];
      for(j=0;j<categories[i].actions.length;j++)
      {
        categories[i].actions[j]['check'] = false;
      }
    }
    return categories;
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad SendPage');
  }

  shareActions(categories){
    var tmp = [];
    var tmpCategory, tmpAction;
    var i=0,j=0;
    var t = 0;
    for(i=0; i< categories.length; i++)
    {
      tmpCategory = JSON.parse(JSON.stringify(categories[i]));
      tmpCategory.actions = [];
      tmpCategory.key = 0;
      tmpCategory.image = "";
      for(j=0;j<categories[i].actions.length;j++)
      {
        if(categories[i].actions[j]['check'] == true)
        {
          t = 1;
          tmpAction = JSON.parse(JSON.stringify(categories[i].actions[j]));
          tmpAction.image = "";
          tmpAction.key = 0;
          tmpCategory.actions.push(tmpAction);
        }
      }
      if(t == 1)
      {
        tmp.push(tmpCategory);
      }
      t = 0;
    }
    this.shareService.share(tmp);
    
  }

  sendClicked(categories){
    let confirm = this.alertCtrl.create({
      title: "Confirm Selection!",
      message: "Do you wish to share the actions selected?",
      buttons: [
        {
          text: "Disagree",
          handler: () => {
            //console.log("Disagree Clicked");
          }
        },
        {
          text: "Agree",
          handler: () => {
            // //console.log("Selected Data.\n", categories);
            //console.log("Agree Clicked");
            this.shareActions(JSON.parse(JSON.stringify(categories)));
          }
        }
      ]
    });
    confirm.present();
  }
}
Object