import * as dater from './date-helper';

export function areEqual(a, q) {
	if(a.name === q.name){
		if(a.date === q.date){
			if(a.comment === q.comment){
				if(a.location === q.location){
					if(a.eventpage === q.eventpage){
						if(a.types.v1 === q.types.v1){
							if(a.types.v2 === q.types.v2){
								if(a.types.v3 === q.types.v3){
									if(a.types.v4 === q.types.v4){
										if(a.types.vc === q.types.vc){
											return true;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return false;
};

export function prepareBattle(battle){
	// let battle.daysTill;			calculate daysTill
	// let battle.day;				get short day
	// let battle.displayName;		fix for titles which are too long

  battle.daysTill = dater.daysTill(new Date(battle.date));
  battle.day = dater.getShortDay(new Date(battle.date));
  if(battle.name.length>22){
    	battle.displayName = battle.name.substring(0, 22) + '...';
  }else{
  	battle.displayName = battle.name;
  }

  return battle;
}

export function sortBattles(battles){
  // sort battles on battle.daysTill
  battles.sort(function (a, b) {
    if (a.daysTill > b.daysTill) {
      return 1;
    }
    if (a.daysTill < b.daysTill) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return battles;
}

export function validRequest(battle, isRequesting, isStoring){
	if(isRequesting){
		return false;
	}
	else if(battle.name == ""){
		return false;
	}
	else if(isStoring){
		let t = new Date(battle.date.toString());
		if(t == "Invalid Date"){
			return false;
		}else{
			if( t < Date.now()){
				return false;
			}
		}
	}
	else if(battle.comment == ""){
		return false;
	}
	else if(battle.eventpage == ""){
		return false;
	}
	else if(battle.location == ""){
		return false;
	}
	return true;
}