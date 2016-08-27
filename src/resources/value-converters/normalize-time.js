export class NormalizeTimeValueConverter {
  toView(value) {
  	let d = new Date(value);
  	let minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes();
    let hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
	return hours + ':' + minutes;
  }
}