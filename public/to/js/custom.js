// (function($) {
// 	'use strict';
// 	// Navbar Menu JS
// 	$('.scroll-btn, .navbar .navbar-nav li a').on('click', function(e){
// 		var anchor = $(this);
// 		$('html, body').stop().animate({
// 			scrollTop: $(anchor.attr('href')).offset().top - 65
// 		}, 1000);
// 		e.preventDefault();
// 	});

// 	// WOW Animation JS
// 	if($('.wow').length){
// 		var wow = new WOW({
// 			mobile: false
// 		});
// 		wow.init();
// 	};
	
// 	/**** OTP INPUT JS ****/
// 	$('.digit-group').find('input').each(function () {
// 		$(this).attr('maxlength', 1);
// 		$(this).on('keyup', function (e) {
// 		  var parent = $($(this).parent());
	  
// 		  if (e.keyCode === 8 || e.keyCode === 37) {
// 			var prev = parent.find('input#' + $(this).data('previous'));
	  
// 			if (prev.length) {
// 			  $(prev).select();
// 			}
// 		  } else if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode === 39) {
// 			var next = parent.find('input#' + $(this).data('next'));
	  
// 			if (next.length) {
// 			  $(next).select();
// 			} else {
// 			  if (parent.data('autosubmit')) {
// 				parent.submit();
// 			  }
// 			}
// 		  }
// 		});
// 	});

// 	$('.fav-slider').owlCarousel({
// 		loop:true,
// 		margin:30,
// 		nav:false,
// 		dots:false,
// 		responsive:{
// 			0:{
// 				items:2.5
// 			},
// 			600:{
// 				items:3.5
// 			},
// 			1000:{
// 				items:5.5
// 			}
// 		}
// 	});

// 	// Increment Quantity
//     $(".item-inc").click(function(e){
//         e.preventDefault(); // Prevent the default action of the link
//         var inputField = $(this).siblings(".item-qty"); // Get the input field next to the clicked element
//         var currentValue = parseInt(inputField.val()); // Get the current value
//         inputField.val(currentValue + 1); // Increment the value by 1
//     });

//     // Decrement Quantity
//     $(".item-desc").click(function(e){
//         e.preventDefault(); // Prevent the default action of the link
//         var inputField = $(this).siblings(".item-qty"); // Get the input field next to the clicked element
//         var currentValue = parseInt(inputField.val()); // Get the current value
//         if (currentValue > 1) { // Ensure the value doesn't go below 1
//             inputField.val(currentValue - 1); // Decrement the value by 1
//         }
//     });

// })(jQuery);
