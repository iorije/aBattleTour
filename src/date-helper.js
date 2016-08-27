export function getShortDay(date){
  var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekday[date.getDay()];
}

export function getLongDay(date){
  var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekday[date.getDay()];
}

// Expect input as d/m/y
export function isValidDate(date) {
  var bits = date.split('/');
  var d = new Date(bits[2], bits[1] - 1, bits[0]);
  return d && (d.getMonth() + 1) == bits[1];
}

export function daysTill(date){
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	// var secondDate = new Date(new Date().getFullYear()+1,3,5);
	var secondDate = date;
	var firstDate = new Date();
	return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

}