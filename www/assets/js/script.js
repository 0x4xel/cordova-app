/*
Template Name: SmartHR - HTML Mobile Template
Author: Dreamguy's Technologies
Version: 1.1
*/

"use strict";



//Sidebar menu
// Sidebar

! function ($) {
	"use strict";
	var Sidemenu = function () {
		this.$menuItem = $("#sidebar-menu a");
	};

	Sidemenu.prototype.init = function () {
		var $this = this;
		$this.$menuItem.on('click', function (e) {
			if ($(this).parent().hasClass("submenu")) {
				e.preventDefault();
			}
			if (!$(this).hasClass("subdrop")) {
				$("ul", $(this).parents("ul:first")).slideUp(350);
				$("a", $(this).parents("ul:first")).removeClass("subdrop");
				$(this).next("ul").slideDown(350);
				$(this).addClass("subdrop");
			} else if ($(this).hasClass("subdrop")) {
				$(this).removeClass("subdrop");
				$(this).next("ul").slideUp(350);
			}
		});
		$("#sidebar-menu ul li.submenu a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
	},
		$.Sidemenu = new Sidemenu;

}(window.jQuery),


	$(document).ready(function ($) {

		// Sidebar Initiate

		$.Sidemenu.init();
	});

$('.navbar .left a i.material-icons').on('click', function (e) {
	e.preventDefault();
	$('.side-menu').addClass('show-menu');
	$('body').addClass('overlay-body');
});
$('.side-menu .close-btn').on('click', function (e) {
	e.preventDefault();
	$('.side-menu').removeClass('show-menu');
	$('body').removeClass('overlay-body');
});

//Navbar Dropdown
$('.navbar .dropdown-link').on('click', function (s) {
	s.preventDefault();
	$('body').addClass('overlay-body');
});
$(document).bind('mouseup touchend', function (e) {
	var container = $('.navbar .dropdown-menu, .side-menu');
	// if the target of the click isn't the container nor a descendant of the container
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		$('body').removeClass('overlay-body');
		$('.side-menu').removeClass('show-menu');
	}
});

if ($('.walkthrough .swiper-container').length > 0) {
	var swiper = new Swiper('.walkthrough .swiper-container', {
		slidesPerView: 1,
		pagination: {
			el: '.walkthrough .swiper-pagination',
		},
	});
}


if ($('.datetimepicker').length > 0) {
	$('.datetimepicker').datetimepicker({
		format: 'DD/MM/YYYY',
		icons: {
			up: "fas fa-chevron-up",
			down: "fas fa-chevron-down",
			next: 'fas fa-chevron-right',
			previous: 'fas fa-chevron-left'
		}
	});
}
if ($('.custom-datetimepicker').length > 0) {
	$('.custom-datetimepicker').datetimepicker({
		format: 'DD/MM/YYYY',
		icons: {
			up: "fas fa-chevron-up",
			down: "fas fa-chevron-down",
			next: 'fas fa-chevron-right',
			previous: 'fas fa-chevron-left'
		}
	});
}
if ($('.viewmode-datetimepicker').length > 0) {
	$('.viewmode-datetimepicker').datetimepicker({
		format: 'DD/MM/YYYY',
		viewMode: 'years',
		icons: {
			up: "fas fa-chevron-up",
			down: "fas fa-chevron-down",
			next: 'fas fa-chevron-right',
			previous: 'fas fa-chevron-left'
		}
	});
}
if ($('.inline-datetimepicker').length > 0) {
	$('.inline-datetimepicker').datetimepicker({
		format: 'DD/MM/YYYY',
		inline: true,
		keepOpen: true,
		debug: true,
		icons: {
			up: "fas fa-chevron-up",
			down: "fas fa-chevron-down",
			next: 'fas fa-chevron-right',
			previous: 'fas fa-chevron-left'
		}
	});
}



/* Chart */

function getchart() {

	// Bar Chart

	var barChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],


		datasets: [{
			label: 'Dataset 1',
			backgroundColor: 'rgba(58, 87, 196, 0.6)',
			borderColor: 'rgba(58, 87, 196, 1))',
			borderWidth: 1,
			data: [35, 59, 80, 81, 56, 55, 40]
		}, {
			label: 'Dataset 2',
			backgroundColor: 'rgba(252, 96, 117, 0.5)',
			borderColor: 'rgba(252, 96, 117, 1)',
			borderWidth: 1,
			data: [28, 48, 40, 19, 86, 27, 90]
		}]

	};

	if ($('#bargraph').length > 0) {
		var ctx = document.getElementById('bargraph').getContext('2d');
		window.myBar = new Chart(ctx, {
			type: 'bar',
			data: barChartData,
			options: {
				responsive: true,
				legend: {
					display: false,
				}
			}
		});
	}

	// Line Chart

	var lineChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

		datasets: [{
			label: 'My First dataset',
			backgroundColor: 'rgba(58, 87, 196, 0.2)',
			borderColor: 'rgba(58, 87, 196, 1)',
			pointBackgroundColor: 'rgba(58, 87, 196, 1)',
			borderWidth: 2,
			data: [35, 59, 80, 81, 56, 55, 40],

		}, {
			label: 'My Second dataset',
			backgroundColor: 'rgba(252, 96, 117, 0.2)',
			borderColor: 'rgba(252, 96, 117, 1)',
			pointBackgroundColor: 'rgba(252, 96, 117, 1)',
			borderWidth: 2,
			data: [28, 48, 40, 19, 86, 27, 90],
		}]

	};

	if ($('#canvas').length > 0) {
		var linectx = document.getElementById('canvas').getContext('2d');
		window.myLine = new Chart(linectx, {
			type: 'line',
			data: lineChartData,
			options: {
				responsive: true,
				legend: {
					display: false,
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				}
			}
		});
	}
}
//TODO no funciona
function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/* Make an HTTP request using the attribute value as the file name: */
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) { elmnt.innerHTML = this.responseText; }
					if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
					/* Remove the attribute, and call this function once more: */
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			console.error("Acabo includehtml");
			/* Exit the function: */
			return;
		}
	}
}

// console.log("hola");
// includeHTML();
getchart();
