import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {Session} from './session';
import {BattleSaved,BattleViewed} from './messages';
import {areEqual, prepareBattle, validRequest} from './utility';
import * as dater from './date-helper';
import {Router} from 'aurelia-router';

export class addBattle {
	static inject = [WebAPI, EventAggregator, Router];

  constructor(api, ea, router){
    this.api = api;
    this.ea = ea;
    this.theRouter = router;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    let battle = {
      "name": "",
      "date": "",
      "comment": "",
      "location": "",
      "eventpage": "",
      "types": {
        v1: false,
        v2: false,
        v3: false,
        v4: false,
        vc: false
      }
    };

    this.battle = battle;
    this.originalBattle = JSON.parse(JSON.stringify(battle));
    this.ea.publish(new BattleViewed(this.battle));
  }

  attached(){
    // this.dtp = new dtPickr(this.date);
    this.dtp = flatpickr(this.date, { 
      dateFormat: 'd-m-Y', 
      minDate: "today", 
      enableTime: true, 
      minuteIncrement: 15, 
      time_24hr: true,
      onClose: function func(a, q){
      	if(!a){
        	document.getElementById("date-container").classList.remove("is-dirty");
      	}
      },
      onOpen: function func(a, q){
        document.getElementById("date-container").className += " is-dirty";
      },
      onChange: function func(a, q){
        document.getElementById("date").value = a;
      }
    });

    //register material-design-lite components
    componentHandler.upgradeDom();
  }

  get editEnabled() {
    return Session.authorized;
  }

  get canSave() {
    return validRequest(this.battle, this.api.isRequesting, false);
  }

  save() {
    this.battle.date = document.getElementById("date").value;
    if(validRequest(this.battle, this.api.isRequesting, true)){
      this.battle.date = document.getElementById("date").value;
      this.api.saveBattle(this.battle)
        .then(battle => {
          this.ea.publish(new BattleSaved(battle));
        });

      this.originalBattle = JSON.parse(JSON.stringify(this.battle));
      this.theRouter.navigate("/");
    }else{
      this.errorContainer.MaterialSnackbar.showSnackbar({ message: 'battle not saved' });
    }
  }

  canDeactivate() {
    if(!areEqual(this.originalBattle, this.battle)){

      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
      
      if(!result){
        this.ea.publish(new BattleViewed(this.battle));
      }
      return result;
    }
    return true;
  }
}