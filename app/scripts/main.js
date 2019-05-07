(function ($) {
	"use strict";
	var $offset;
	var $breakPoint = 991;
	var $minmidbreakPoint = 364;
	var $maxmidbreakPoint = 380;
	var $owl = $('.js-slide');
	var $owlOptions = {
		autoWidth:true,
		items:4,
		touchDrag: false
	};

	// Set Slider Navigation
	// ================================= //
	var setSlider = function(){
		if ( $(window).width() < $breakPoint ) {
			$owl.owlCarousel($owlOptions);
			setTimeout(function(){
				$owl.trigger('refresh.owl.carousel');
			}, 500);

			$owl.on('changed.owl.carousel', function(event) {
				var index = event.page.index;
				
				if( $(window).width() < $maxmidbreakPoint &&  $(window).width() > $minmidbreakPoint) {
					var count = event.page.count - 2;
				}else{
					var count = event.page.count - 1;
				}
				if(index == 0){
					$('.nav-link.prev').addClass('hidden');
				}else{
					$('.nav-link.prev').removeClass('hidden');
				}

				if(index >= count){
					$('.nav-link.next').addClass('hidden');
				}else{
					$('.nav-link.next').removeClass('hidden');
				}
			});

			$owl.on("touchstart mousedown", function(e) {
				e.stopPropagation();
			})
		} else {
			$owl.trigger('destroy.owl.carousel').removeClass('owl-loaded');
		}	
	};
	$('.nav-link.prev').click(function(e) {
		e.preventDefault();
		$owl.trigger('prev.owl.carousel');
	});
	$('.nav-link.next').click(function(e) {
		e.preventDefault();
		$owl.trigger('next.owl.carousel');
	});

	// Scroll Navigation
	// =================================== //
	$('.js-scroll').each(function(){
		$('a', this).on('click', function(e){
			var id = $(this).attr('href');
			var gap = -40;
			var position;
			if($(window).width() < $breakPoint) gap = -45;
			if($(id).length) position = $(id).offset().top + gap;
			e.preventDefault();
			$('.js-scroll a').removeClass('active');
			$(this).addClass('active');
			$("html, body").stop().animate({ scrollTop: position }, 1500);
			if(id == "#assistance"){
				window.location.hash = id;
			}
		});
	});


	// Active Navigation
	// =================================== //
	var setActiveNavigation = function(){
		$('.js-scroll').each(function(){
			var id = $('a', this).attr('href');
			// var gap = 80;
			var position;
			var gap = $(window).height() - ($(window).height() * 0.7);
			if($(id).length) position = $(id).offset().top - gap;
			var scroll = $(window).scrollTop();
			if(scroll >= position){
				$('.js-scroll a').removeClass('active');
				$('a', this).addClass('active');			
				if($(window).width() < $breakPoint && $(this).data('id') !== ($('.js-scroll').length - 1)) $owl.trigger('to.owl.carousel', [$(this).data('id'), 1000]);
			}

			if(scroll < $offset){
				$('.js-scroll a').removeClass('active');
				$('.js-scroll[data-id="0"] a').addClass('active');
				$owl.trigger('to.owl.carousel', [0, 1000]);
			}
		});
	};

	// Content Scroll fade
	// =================================== //
	$('.js-scroll-fade').each(function(){
		$(this).addClass('scroll-fade');
	});
	var fadeContentScroll = function(){
		$('.js-scroll-fade').each(function(){
			var position = $(this).offset().top - ($(window).height());
			var scroll = $(window).scrollTop();
			if(scroll >= position){
				$(this).addClass('in-view');	
			}
		});
	};

	// Toggle Button Journey
	// =================================== //
	$('.js-hidden-button').addClass('scroll-fade');
	$('.js-button-group .btn').each(function(){
		var index = $(this).index();
		var breakCount = 11;
		if($(window).width() < 767) breakCount = 4;
		if(index > breakCount){
			$(this).appendTo( ".js-hidden-button" );
      // $(this).addClass('scroll-fade');
      // $(this).show( "slow" );
		}
	});

	$('.js-toggle-btn').on('click', function(e){
    e.preventDefault();
		$(this).addClass('btn-collapse-hidden');
		$(this).text("Hide Sectors")
		$('.js-hidden-button').addClass('in-view');
	});
	
	$('.js-hidden-button').on('hidden.bs.collapse', function (e) {
		$('.js-toggle-btn').removeClass('btn-collapse-hidden');
		$(".js-toggle-btn").text("See All Sectors")
	})

	// Window On Load
	// =================================== //
	$(window).on('load', function(){
		$('.js-matchheight').matchHeight();
		$offset = $('.js-navbar-offset').height();
		$('.js-navbar').css('top', $offset);
		setSlider();
		fadeContentScroll();

		var $pathname = './';
		console.log($pathname);
		var $pageType = window.location.hash.substr(1).toLowerCase();
		var skills = ['programmer', 'engineer', 'designer','administrator','marketer'];

		if($pageType == ""){
			$('.js-anchor-masthead').addClass('programmer');
			setTimeout(function(){
				gtag('event', 'conversion', {
					'allow_custom_scripts': true,
					'send_to': 'DC-8189760/ssg_n0/ssg_n0+standard'
				});
				$('.js-image-0').attr('src', $pathname + 'images/img-designer.png');
				$('.js-image-1').attr('src', $pathname + 'images/img-engineer.png');
				$('.js-image-2').attr('src', $pathname + 'images/img-marketer.png');
				$("img").on('load', function(){
					$('.js-matchheight').matchHeight();
				});
			}, 1000);
    	}else{
			if(skills.includes($pageType)){
				$('.js-anchor-masthead').addClass($pageType);

				setTimeout(function(){

					switch($pageType) {
						case 'administrator':
							gtag('event', 'conversion', {
								'allow_custom_scripts': true,
								'send_to': 'DC-8189760/ssg_n0/ssg_n017+standard'
							});
							$('.js-image-0').attr('src',$pathname + 'images/img-designer.png');
							$('.js-image-1').attr('src',$pathname + 'images/img-engineer.png');
							$('.js-image-2').attr('src',$pathname +'images/img-marketer.png');
						break;
						case 'designer':
							gtag('event', 'conversion', {
								'allow_custom_scripts': true,
								'send_to': 'DC-8189760/ssg_n0/ssg_n01a+standard'
							});
							$('.js-image-0').attr('src',$pathname + 'images/img-engineer.png');
							$('.js-image-1').attr('src',$pathname + 'images/img-admin.png');
							$('.js-image-2').attr('src',$pathname + 'images/img-marketer.png');
						break;
						case 'engineer':
							gtag('event', 'conversion', {
								'allow_custom_scripts': true,
								'send_to': 'DC-8189760/ssg_n0/ssg_n019+standard'
							});
							$('.js-image-0').attr('src',$pathname + 'images/img-admin.png');
							$('.js-image-1').attr('src',$pathname + 'images/img-marketer.png');
							$('.js-image-2').attr('src',$pathname + 'images/img-designer.png');
						break;
						case 'marketer':
							gtag('event', 'conversion', {
								'allow_custom_scripts': true,
								'send_to': 'DC-8189760/ssg_n0/ssg_n018+standard'
							});
							$('.js-image-0').attr('src',$pathname + 'images/img-engineer.png');
							$('.js-image-1').attr('src',$pathname + 'images/img-admin.png');
							$('.js-image-2').attr('src',$pathname + 'images/img-designer.png');
						break;
						case 'programmer':
							gtag('event', 'conversion', {
								'allow_custom_scripts': true,
								'send_to': 'DC-8189760/ssg_n0/ssg_n01-+standard'
							});
							$('.js-image-0').attr('src',$pathname + 'images/img-designer.png');
							$('.js-image-1').attr('src',$pathname + 'images/img-engineer.png');
							$('.js-image-2').attr('src',$pathname + 'images/img-marketer.png');
						break;
					}
					$("img").on('load', function(){
						$('.js-matchheight').matchHeight();
					});
				}, 1000);
			}else{
				$('.js-anchor-masthead').addClass('programmer');
				setTimeout(function(){
					gtag('event', 'conversion', {
						'allow_custom_scripts': true,
						'send_to': 'DC-8189760/ssg_n0/ssg_n0+standard'
					});
					$('.js-image-0').attr('src',$pathname + 'images/img-designer.png');
					$('.js-image-1').attr('src',$pathname + 'images/img-engineer.png');
					$('.js-image-2').attr('src',$pathname + 'images/img-marketer.png');
					$("img").on('load', function(){
						$('.js-matchheight').matchHeight();
					});
				}, 1000);
			}
		}

		
	});

	// Window On Resize
	// =================================== //
	$(window).on('resize', function(){
		$offset = $('.js-navbar-offset').height();
		$('.js-navbar').css('top', $offset);
		stickyNavigation();
	});
	$(window).on('resize', debounce(setSlider, 500));

	// Sticky Navigation
	// =================================== //
	var stickyNavigation = function(){
		var scroll = $(window).scrollTop();
		var gap = 98;
		if($(window).width() < $breakPoint) gap = -2;
		if(scroll >= ($offset - 98)){
			$('.js-navbar').css({position: 'fixed', top: gap});
			$('.js-navbar').addClass('sticky');
			$('.js-blur-content').addClass('visible');
		}else{
			$('.js-navbar').css({position: 'absolute', top: $offset});
			$('.js-navbar').removeClass('sticky');
			$('.js-blur-content').removeClass('visible');
		}
	};

	// Window On Scroll
	// =================================== //
	$(window).on('scroll', function(){
		stickyNavigation();
		fadeContentScroll();
	});
	$(window).on('scroll', debounce(setActiveNavigation, 200));
  
	// Accordion
  // =================================== //
  $('.js-panel-collapse').each(function(){
    if( $(this).hasClass('in') ){
        $(this).closest('.panel').addClass('active');
    }

    var getId = $(this).attr('id');
    $('#' + getId).on('shown.bs.collapse', function () {
        $(this).closest('.panel').addClass('active');
    });

    $('#' + getId).on('hidden.bs.collapse', function () {
        $(this).closest('.panel').removeClass('active');
    });
  });
  
  $('.js-panel-collapse').on('shown.bs.collapse', function(e) {
    var $panel = $(this).closest('.panel');
    $('html,body').animate({
      scrollTop: $panel.offset().top -60
    }, 500);
  });


	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$('.tab-pane').removeClass('in-view');
		var target = $(e.target).attr("href") // activated tab
		$(target).addClass('in-view');
	});

}(jQuery));

$(document).ready(function() {
  const $backToTop = $('.js-back-to-top');
  const $mastheadSlick = $('.js-masthead-slider');
  const $scrollSection = $('.js-icon-scroll');
  const $scrollSectionTrigger = $('.js-scroll-navigation-trigger');

  const distanceHeaderAndPadding = 200;
  const heightHeader = 60;

  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();
    const sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
    let heightToShow = $(window).height() - heightHeader;

    if ($mastheadSlick.length) {
      heightToShow = $('body').data('btt-offset') + heightHeader;
    } else if ($scrollSectionTrigger.length) {
      heightToShow = heightToShow - distanceHeaderAndPadding;
    }

    if (scrollTop < heightToShow) {
      $backToTop.fadeOut();
    } else {
      $backToTop.fadeIn();
    }
  });

  $backToTop.on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
	});
});


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}

function googleTagJourney(){
	gtag('event', 'conversion', {
		'allow_custom_scripts': true,
		'send_to': 'DC-8189760/ssg_n0/ssg_n00j+standard'
	});
	
}

function googleTagRecomended(){
	gtag('event', 'conversion', {
		'allow_custom_scripts': true,
		'send_to': 'DC-8189760/ssg_n0/ssg_n00d+standard'
	});
	
}
// carosel
$('.carousel').carousel();