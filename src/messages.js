export class BattleUpdated {
  constructor(battle){
    this.battle = battle;
  }
}

export class BattleViewed {
  constructor(battle){
    this.battle = battle;
  }
}

export class BattleSaved {
  constructor(battle){
    this.battle = battle;
  }
}

export class ErrorContainer {
  constructor(error){
    this.error = error;
  }
}