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

    // this.menuState = false;
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

  get menuState(){
    // return MenuState;
    // is-visible
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
    return true;
  }
}