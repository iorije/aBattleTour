import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {Session, MenuState} from './session';
import {BattleUpdated,BattleViewed, ErrorContainer} from './messages';
import {areEqual, prepareBattle, validRequest} from './utility';
import * as dater from './date-helper';
import {Router} from 'aurelia-router';

export class BattleDetail {
  static inject = [WebAPI, EventAggregator, Router];

  constructor(api, ea, router){
    this.api = api;
    this.ea = ea;
    this.theRouter = router;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    Session.authorized = false;

    this.ea.subscribe(ErrorContainer, msg => {
      this.errorContainer.MaterialSnackbar.showSnackbar({ message: 'Battle not saved, check your facts' });
    });

    return this.api.getBattleDetails(params.id).then(battle => {
      this.battle = battle;
      
      // fix for datepickr
      if(!this.dtp){
      }else{
        this.dtp.setDate(this.battle.date);
      }
      this.battle = prepareBattle(this.battle);
      this.originalBattle = JSON.parse(JSON.stringify(battle));
      this.ea.publish(new BattleViewed(this.battle));
    });
  }

  attached(){
    this.dtp = flatpickr(this.date, { 
      dateFormat: 'd-m-Y', 
      minDate: "today", 
      enableTime: true, 
      minuteIncrement: 15, 
      time_24hr: true, 
      onChange: function func(a, b){
        document.getElementById("date").value = a;
      }
    });
    // fix for datepickr
    this.dtp.setDate(this.battle.date);

    //register material-design-lite components
    componentHandler.upgradeDom();
  }


  get editEnabled() {
    return Session.authorized;
  }

  toggleEdit(){
    Session.authorized = !Session.authorized;
  }

  get canUpdate() {
    return validRequest(this.battle, this.api.isRequesting, false);
  }

  update() {
    this.battle.date = document.getElementById("date").value;
    if(validRequest(this.battle, this.api.isRequesting, true)){
      this.api.updateBattle(this.battle).then(battle => {
        this.battle = battle;
        this.originalBattle = JSON.parse(JSON.stringify(battle));
        this.ea.publish(new BattleUpdated(this.battle));
      });
      Session.authorized = !Session.authorized;
    }else{
      this.errorContainer.MaterialSnackbar.showSnackbar({ message: 'battle not updated' });
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