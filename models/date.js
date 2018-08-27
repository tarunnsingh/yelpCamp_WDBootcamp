var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var mn = today.getMinutes();
	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	if(hh<10) {
	    hh = '0'+hh
	} 

	if(mn<10) {
	    mn = '0'+mn
	} 

	today = hh +':'+ mn +' on ' +  dd + '/' + mm + '/' + yyyy;

module.exports = today;