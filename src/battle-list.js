import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {BattleUpdated, BattleViewed, BattleSaved} from './messages';
import {prepareBattle, sortBattles} from './utility';
import {MenuState} from './session';

export class BattleList {
  static inject = [WebAPI, EventAggregator];

  constructor(api, ea){
    this.api = api;
    this.battles = [];

    ea.subscribe(BattleViewed, msg => this.select(msg.battle));
    ea.subscribe(BattleUpdated, msg => {
      let id = msg.battle._id;
      msg.battle = prepareBattle(msg.battle);
      let found = this.battles.find(x => x._id == id);
      Object.assign(found, msg.battle);
    });
    ea.subscribe(BattleSaved, msg => {
      this.api.getBattles().then(battles => {
        // prepare each battle for display
        for (let battle of battles) {
          battle = prepareBattle(battle);
        }
        battles = sortBattles(battles);
        this.battles = battles;
      });
    });
  }

  attached(){
    //register material-design-lite components
    componentHandler.upgradeElement(this.menu);
  }

  created(){
    this.api.getBattles().then(battles => {
      // prepare each battle for display
      for (let battle of battles) {
        battle = prepareBattle(battle);
      }
      battles = sortBattles(battles);
      this.battles = battles;
    });
  }

  select(battle){
    this.selectedId = battle._id;
    
    // maybe fix close crawer on select battle. this code below, does not work. it messes with mdl drawer state, dont know how to fix
    
    // let t = document.getElementsByClassName('mdl-layout__obfuscator')[0];
    // let x = document.getElementsByClassName('mdl-layout__drawer')[0];
    // x.className = x.classList.remove('is-visible');
    // t.className = t.classList.remove('is-visible');
    
    return true;
  }
}