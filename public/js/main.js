$(document).ready(function(){

	//Iphone slider initialisation
	$("#slider").responsiveSlides({
		speed: 700,
		timeout: 3500,
		pager: true
	});


	//Countdown counter initialisation
	var final_date = new Date();
	final_date = new Date(2016, 12-1, 17);
	$('#counter').countdown({until: final_date, format: 'DHMS'});



});
