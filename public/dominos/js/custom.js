(function($) {
	'use strict';
	// Location Popup Open
	$("#location-click").click(function(e){
		e.preventDefault();
		$("#location-popup-header").show();
	});
	
	// Location Popup Close
	$("#location-popup-header .btn-close-popup").click(function(e){
		e.preventDefault();
		$("#location-popup-header").hide();
	});

	$(".close-menu-btn").click(function(e){
		e.preventDefault();
		$(".navbar-collapse").removeClass("show");
	});
	
	
	// Preloader JS
	$(window).on('load', function() {
		$('.preloader').fadeOut();
	});

	// WOW Animation JS
	if($('.wow').length){
		var wow = new WOW({
			mobile: false
		});
		wow.init();
	};

	// $(function () {
	// 	$('#datetimepicker4').datetimepicker({
	// 			format: 'LT',
	// 		inline:true
	// 	});	
	// });	
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl)
	});

	$(".show-me").click(function(e){
		e.preventDefault();
		var getClassToShow = $(this).attr('show-this');
		var getClassToHide = $(this).attr('hide-this');
		$("."+getClassToShow).show();
		$("."+getClassToHide).hide();
	});
	
})(jQuery);
