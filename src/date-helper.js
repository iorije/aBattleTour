// get short day of week
export function getShortDay(date){
  var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekday[date.getDay()];
}

// get long day of week
export function getLongDay(date){
  var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekday[date.getDay()];
}

// Expect input of type string with format as d/m/y
export function isValidDate(date) {
  var bits = date.split('/');
  var d = new Date(bits[2], bits[1] - 1, bits[0]);
  return d && (d.getMonth() + 1) == bits[1];
}

// calculate days till now with provided date
export function daysTill(date){
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var secondDate = date;
	var firstDate = new Date();
	return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}