import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ErrorContainer} from './messages';

let client = new HttpClient()
  .configure(x => {
    x.withHeader('Content-Type', 'application/json');
  });

export class WebAPI {
  static inject = [EventAggregator];
  isRequesting = false;

  constructor(ea){
    this.ea = ea;
  }
  
  getBattles(){
    this.isRequesting = true;
    return new Promise(resolve => {
      client.get('https://battle-tour-api-iorije.c9users.io/battles')
        .then(data => {
          resolve(JSON.parse(data.response));
          this.isRequesting = false;
        });
    });
  }
  
  getBattleDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      client.get('https://battle-tour-api-iorije.c9users.io/battles/' + id)
        .then(data => {
          resolve(JSON.parse(data.response));
          this.isRequesting = false;
        });
    });
  }

  updateBattle(battle){
    this.isRequesting = true;
    return new Promise(resolve => {
      client.post('https://battle-tour-api-iorije.c9users.io/battles/u/' + battle._id, battle)
        .then(data => {
          console.log(JSON.parse(data.response).msg);
          if(JSON.parse(data.response).msg === "NOK"){
            this.ea.publish(new ErrorContainer(JSON.parse(data.response)));
          }
          resolve(battle);
          this.isRequesting = false;
        });
    });
  }

  saveBattle(battle){
    this.isRequesting = true;
    return new Promise(resolve => {
      client.post('https://battle-tour-api-iorije.c9users.io/battles/new', battle)
        .then(data => {
          console.log(data.response);
          resolve(battle);
          this.isRequesting = false;
        });
    });
  }
}
