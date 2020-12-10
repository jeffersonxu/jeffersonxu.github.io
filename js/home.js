$(document).ready(function(){
	/*----- user agent ------*/
	var router,pushstate=false,mobile=false,retina=false,mp4=false,ipad=false,iphone=false,ie=false,ie8=false,android=false,firstpage = true;

	var uagent = navigator.userAgent.toLowerCase(),body = document.body,
	mobile_search = [ "iphone","ipod","series60","symbian","android","windows ce","windows7phone","w7p","blackberry","palm" ];

	/*--------mobile---------*/
	for(var i in mobile_search){
	    if( uagent.search( mobile_search[i] ) > -1 ){
	        mobile = true; break;
	    }
	}

	/*--------retina---------*/
	retina = mobile && window.devicePixelRatio > 1;

	/*--------pushstate---------*/
	pushstate = !!(window.history && window.history.pushState);
	pushstate = !!(window.history && window.history.pushState);

	/*--------mp4---------*/
	mp4 = ( Modernizr.video && document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2') );

	/*--------ie,ie8---------*/
	if( uagent.search( "msie" ) > -1 ) ie = true;
	ie8 = $("body").hasClass("ie8");

	/*--------ipad,iphone---------*/
	if( uagent.search( "ipad" ) > -1 ) ipad = true;
	if( uagent.search( "iphone" ) > -1 ) iphone = true;
	if( uagent.search( "android" ) > -1 ) android = true;

	/*-------- set body tags ---------*/
	if(mobile) body.className += " mobile";
	if(pushstate) body.className += " pushstate";
	if(retina) body.className += " retina";
	if(mp4) body.className += " mp4";
	if(ipad) body.className += " ipad";
	if(iphone) body.className += " iphone";
	if(android) body.className += " android";
	if(ie) body.className += " ie";

	/*----- disable pointer events on scroll-------*/
	var scrolltimer, scrolltimer2;

	var header = document.getElementById('header');
	var desktop_screenshot = $('#screenshot-desktop');
	var tablet_screenshot = $('#screenshot-tablet');
	var phone_screenshot = $('#screenshot-phone');
	window.addEventListener('scroll', function(){
	    clearTimeout(scrolltimer);
	    clearTimeout(scrolltimer2);

	    if(document.body.className.indexOf('disable-hover') == -1) {
	        document.body.className += ' disable-hover';
	    }

	    scrolltimer = setTimeout(function(){
	        var classes = document.body.className.split(" ");
	        for(var i = 0; i<classes.length; i++){
	            if( classes[i] == 'disable-hover' )
	                classes.splice(i,1);
	        }
	        document.body.className = classes.join(" ");
	    },200);

	    scrolltimer2 = setTimeout(function(){
	        if ($(window).scrollTop() > 0) {
	            $('#header-container').addClass('sticky');
	        } else {
	            $('#header-container').removeClass('sticky');
	        }
	    },200);
	}, false);

	// header scroll to section
	$('#header-container').find('a[href*=#]').click(function(e){
	    e.preventDefault();
	    var target = $(this).attr('href');
        $(target).goTo();
	});

	// button scroll
	$('.title-button').find('a[href*=#]').click(function(e){
	    e.preventDefault();
	    var target = $(this).attr('href');
        $(target).goTo();
	});


	(function($) {
	    $.fn.goTo = function() {
	        $('html, body').animate({
	            scrollTop: ( $(this).offset().top - 65) + 'px'
	        }, 'slow');
	        return this;
	    }
	})(jQuery);

	// VIEW PORT HEGHT FIXES
	var testEl = $("#vw-test");
	testEl.css({
	    display: "none",
	    height: "100vh"
	});

	var winHeight  = window.innerHeight;
	if (testEl.height() != winHeight) {
	    $('section').height(winHeight);
	}

	if (!mobile) {
		mouseMoveMatrix();
	} else {
		console.log('mobile');
		$('.mobile-only').each(function() {
			if ($(this).hasClass('vertical-outer')) {
		    	$(this).css('display','table');
		    } else {
		    	$(this).css('display','block');
		    }
		});
	}

	$('.type-container-inner').delay(500).animate({'top': 0, 'bottom': 0, 'opacity':1},600);

	$('.fade-slide-up-element-2').each(function(){
	    var _this = this;
	    var fadeslideinview = new Waypoint({
	        element: _this,
	        handler: function (direction) {
	            $(this.element).animate({'margin-top': 0, 'opacity':1},600)
	        },
	        offset: '85%'
	    });
	});

	$('.fade-in-slow-element').each(function(){
	    var _this = this;
	    var fadeinslowview = new Waypoint({
	        element: _this,
	        handler: function (direction) {
	            $(this.element).animate({'opacity': 1},500)
	        },
	        offset: '50%'
	    });
	});

	$('.fade-in-element').each(function(){
	    var _this = this;
	    var fadeinview = new Waypoint({
	        element: _this,
	        handler: function (direction) {
	            $(this.element).animate({'opacity': 1},200)
	        },
	        offset: '60%'
	    });
	});

	function mouseMoveMatrix() {
		$('.tile')
	    // tile mouse actions
	    .on('mouseover', function(){
	      $(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
	      $(this).children('.project-label').css('background-color', "rgba(0,0,0,0)");
	    })
	    .on('mouseout', function(){
	      $(this).children('.photo').css({'transform': 'scale(1)'});
	      $(this).children('.project-label').css('background-color', "rgba(0,0,0,0.2)");
	    })
	    .on('mousemove', function(e){
	      $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
	    })
	    // tiles set up
	    .each(function(){
	      $(this)
	        // add a photo container
	        .append('<div class="photo"></div>')
	        // add project label
	        .append('<div class="project-label"><div class="project-label-inner"><span>MORE</span></div></div>')
	        // set up a background image for each tile based on data-image attribute
	        .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'})
	    });
	}
});