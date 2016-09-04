// *********** I intentionally did not apply "Minification" on the javascript code here in order for the prospective employers to see and evaluate my javascript code. ************

$(document).ready(function(){
	 // contact overlay
    $('#project-contact').click(function(e){
      e.preventDefault();
      $('html').addClass('overlay-open');
      $(' #contact-overlay').fadeIn();
    });

    $('#overlay-close').click(function(){
      $('html').removeClass('overlay-open');
      $(' #contact-overlay').fadeOut();
    });

    // scroll event
    var header = document.getElementById('header');
    var desktop_screenshot = $('#screenshot-desktop');
    var tablet_screenshot = $('#screenshot-tablet');
    var phone_screenshot = $('#screenshot-phone');

    window.addEventListener('scroll', function(){
      var st = $(this).scrollTop();

      var window_max_scroll = $(document).height() - $( window ).height();
      var desktop_screenshot_max_scroll = $('.desktop').find('.screenshot').width() * 1 - $('.desktop').find('.screenshot').height(); 
      var desktop_scroll_ratio =  desktop_screenshot_max_scroll / window_max_scroll;
      var tablet_screenshot_max_scroll = $('.tablet').find('.screenshot').width() * 1.98 - $('.tablet').find('.screenshot').height() ;
      var tablet_scroll_ratio =  tablet_screenshot_max_scroll / window_max_scroll;
      var phone_screenshot_max_scroll = $('.phone').find('.screenshot').width() * 3 -  $('.phone').find('.screenshot').height();
      var phone_scroll_ratio =  phone_screenshot_max_scroll / window_max_scroll;

      // console.log(desktop_scroll_ratio);
      // console.log(tablet_scroll_ratio);

      if (st == 0) {
          desktop_screenshot.css({'background-position':'0px 0%'});
          tablet_screenshot.css({'background-position':'0px 0%'});
          phone_screenshot.css({'background-position':'0px 100%'});
          
      } else {
          desktop_screenshot.css({'background-position':'0px -'+(st*desktop_scroll_ratio)+'px'});
          tablet_screenshot.css({'background-position':'0px -'+(st*tablet_scroll_ratio)+'px'});
          phone_screenshot.css({'background-position':'0px -'+((window_max_scroll - st)*phone_scroll_ratio)+'px'});
      }
    }, false);

    // $('#content').html(projects["project/"+projectName].tagline);

    updateContent(project_data, true);
    
  	function updateContent(stateObject, is_firstPage){
      //page transitions
      $("#project-header-container").delay(400).animate({opacity:1},400);
      $("#project-loader").delay(400).animate({opacity:0},250);
      $("#project-page").delay(600).animate({opacity:1},600);
      // $("#footer-container").delay(700).animate({opacity:1},400);

  		var base_url = '/';
      if (!is_firstPage) {
        project_data = projects[stateObject.pageToLoad];
      }
      
  		// $('#content').html(projects[stateObject.pageToLoad].tagline);

      // $.getJSON( base_url + "js/projects.json", function( data ) {
      var project_name = document.getElementById("project-name"),
      client = document.getElementById("client"),
      agent = document.getElementById("agent"),
      duty = document.getElementById("duty"),
      description = document.getElementById("description"),
      case_study_link = document.getElementById("casestudy-link"),
      site_link = document.getElementById("site-link"),
      tagline = document.getElementById("tagline"),
      tags = document.getElementById("tags"),
      case_btn_text = document.getElementById("case-btn-text"),
      site_btn_text = document.getElementById("site-btn-text"),

      // prev/next project
      project_prev = document.getElementById("project-prev"),
      project_next = document.getElementById("project-next"),
      project_prev_link = project_prev.getElementsByTagName("a"),
      project_next_link = project_next.getElementsByTagName("a"),
      project_prev_label = document.getElementById("project-prev-label"),
      project_next_label = document.getElementById("project-next-label"),
      project_header = document.getElementById("project-header");

      for (var i = 0; i < project_data.keywords.length; i++) {
        $(tags).append('<li class="tag">' + (project_data.keywords)[i] + '</li>');
      }

      if (project_data.prev_project != "") {
        project_prev_label.innerHTML = project_data.prev_project;
        project_prev_link[0].href = base_url + 'project/' + project_data.prev_project;
        project_prev.style.opacity = '1';
      } 

      if (project_data.next_project != "") {
        project_next_label.innerHTML = project_data.next_project;
        project_next_link[0].href = base_url + 'project/' + project_data.next_project;
        project_next.style.opacity = '1';
      } 
      
      tagline.innerHTML = project_data.tagline;
      project_name.innerHTML = project_data.project_name;
      client.innerHTML = project_data.client;
      agent.innerHTML = project_data.agent;
      duty.innerHTML = project_data.role;
      description.innerHTML = project_data.description;

      if (project_data.case_study_link != "") {
        case_btn_text.innerHTML = project_data.case_btn_text;
        case_study_link.href = project_data.case_study_link;
      } else {
        case_study_link.style.display = "none";
      }
        
      if (project_data.site_link != "") {
        site_btn_text.innerHTML = project_data.site_btn_text;
        site_link.href = project_data.site_link;
      } else {
        site_link.style.display = "none";
      }
        
      $(project_header).css('background-image', 'url(' + base_url + 'img/projects/' + project_data.slug + '/header.jpg)');
      // pull scroll images in
      $('.devices').find('.desktop').find('.screenshot').css('background-image', 'url(' + base_url + 'img/projects/' + project_data.slug + '/desktop.jpg)');
      $('.devices').find('.tablet').find('.screenshot').css('background-image', 'url(' + base_url + 'img/projects/' + project_data.slug + '/tablet.jpg)');
      $('.devices').find('.phone').find('.screenshot').css('background-image', 'url(' + base_url + 'img/projects/' + project_data.slug + '/phone.jpg)');

      // pull custom scroll images in
      if (project_data.custom_main == 'yes') {
        if (project_data.slug == 'vr') {
          $('.project-wrap').css('background-position', 'left center');
          $('.devices-container').html('<div style="padding-bottom:30%"></div>');
        } else {
          $('.devices-container').html("<img class='devices-special' src=" + base_url + "img/projects/" + project_data.slug + "/main.png>");
        }
      }
      
      // pulling screenshot images in
      if (project_data.slug == 'gm') {
        $('.project-image-wrapper').css('display','none');
        for (var i=1; i < 6; i++) {
          $('.special-format').append('<img id="gm-img' + i + '" src="' + base_url + 'img/projects/'+ project_data.slug +'/' + i + '.gif">');
        }
      } else if (project_data.slug == 'vr') {
        $('.project-image-wrapper').css('display','none');
        for (var i=1; i < 4; i++) {
          $('.special-format').append('<img id="vr-img' + i + '" src="' + base_url + 'img/projects/'+ project_data.slug +'/' + i + '.jpg">');
        }
        // the 4th img is gif
        $('.special-format').append('<img id="vr-img' + '4' + '" src="' + base_url + 'img/projects/'+ project_data.slug +'/' + '4' + '.gif">');
      } else {
        if (project_data.slug == 'bamboo') {
          $('.project-image-wrapper').prepend('<img id="flowchart" src="' + base_url + 'img/thumbs/'+ project_data.slug +'/bamboo.jpg">');
        }
        for (var i=1; i < 5; i++) {
          $('#project-image' + i).attr('src', base_url + 'img/projects/' + project_data.slug + '/' + i + '.jpg');
        }
      }

  	}

    // prev/next click
    // $('.nav-link').on('click', function(e){
    // 	e.preventDefault();
    //   console.log('do not reload!');
    // 	var _t = this;
    // 	var url = $(_t).attr('href');
    // 	var pageToLoad = url.substr(1);
    	
    // 	var stateObject = {
    //       pageToLoad:pageToLoad
    //   }

    //   updateContent(stateObject, false);

    // 	window.history.pushState(stateObject,'',url);

    // 	window.addEventListener('popstate', function(event) {
  		// 	updateContent(event.state, false);
  		// });
		
    // });
});