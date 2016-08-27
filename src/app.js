import {WebAPI} from './web-api';
import {Session, MenuState} from './session';

export class App {
  static inject() { return [WebAPI]; }

  constructor(api) {
    this.api = api;
    Session.authorized = false;
  }

  configureRouter(config, router){
    config.title = 'ChamberFlow - BattleTour';
    config.map([
      { route: '',              moduleId: 'no-selection', name:'home' },
      { route: 'battles/:id',   moduleId: 'battle-detail', name:'battles' },
      { route: 'battles/add',   moduleId: 'add-battle', name:'battles/add' }
    ]);

    this.router = router;
  }
}