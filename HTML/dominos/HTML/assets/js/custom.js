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


	/*** HIDE SHOW FEATURES ***/
	$(".show-me").click(function(e){
		e.preventDefault();
		var getClassToShow = $(this).attr('show-this');
		var getClassToHide = $(this).attr('hide-this');
		$("."+getClassToShow).show();
		$("."+getClassToHide).hide();
		if($(this).attr("make-it-active")) {
			$(".show-me.btn-orange").removeClass('btn-orange');
			$(this).addClass("btn-orange");
		}
	});

	/*** TOPPINGS HIDE SHOW QUANTITY ***/
	$(function () {
		$('.topping-checkbox').change(function () {                
		   $('.type-box').toggle();
		});
	});

	/*** ACCORDION EXPAND ALL FEATURE ***/

	$(".expand-all-accordion").click(function(e) {
		e.preventDefault();
		$("#toppings-accordion .accordion-button").toggleClass('collapsed');
		$("#toppings-accordion .accordion-collapse").toggleClass('show');
	});
	
})(jQuery);
