export class NormalizeDateValueConverter {
  toView(value) {
  	value = new Date(value);
	  let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	  return value.getDate() + '-' + months[value.getMonth()] + '-' + value.getFullYear();
  }
}