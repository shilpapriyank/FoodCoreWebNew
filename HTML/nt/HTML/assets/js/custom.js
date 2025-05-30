(function($) {
	'use strict';
	// Navbar Menu JS
	$('.scroll-btn').on('click', function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
	});
	
	// Quantity JS
	var buttonPlus = $(".qty-btn-plus");
	var buttonMinus = $(".qty-btn-minus");

	var incrementPlus = buttonPlus.click(function () {
	var $n = $(this).
	parent(".qty-container").
	find(".input-qty");
	$n.val(Number($n.val()) + 1);
	});

	var incrementMinus = buttonMinus.click(function () {
	var $n = $(this).
	parent(".qty-container").
	find(".input-qty");
	var amount = Number($n.val());
	if (amount > 0) {
		$n.val(amount - 1);
	}
	});
	//# sourceURL=pen.js

	// BUTTON CLICK DROP
	$("#takeout-btn").on('click', function(){
		$("#takeout").removeClass("d-none");
		$("#delivery").addClass("d-none");
		$(this).addClass("active");
		$("#delivery-btn").removeClass("active");
	});

	$("#delivery-btn").on('click', function(){
		$("#takeout").addClass("d-none");
		$("#delivery").removeClass("d-none");
		$(this).addClass("active");
		$("#takeout-btn").removeClass("active");
	});

	$(document).ready(function(){       
		$('#exampleModal-main').modal('show');
	}); 

	$(document).ready(function(){       
		$('#exampleModal-time_modified').modal('show');
	}); 

	$(".wishlist").on('click', function(){
		$(this).toggleClass("active");
	});


})(jQuery);
