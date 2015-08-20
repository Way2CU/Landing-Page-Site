/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	 var desktop_gallery = new Caracal.Gallery.Slider();
	  	 desktop_gallery
					  	.images.add('img.desktop')
					  	.images.set_container('div.figures figure')
					 	.images.set_visible_count(1)
					 	.controls.set_pause_on_hover(false)
					 	.controls.set_auto(6000);
	 	

	 var mobile_gallery = new Caracal.Gallery.Slider();
	  	 mobile_gallery
					  	.images.add('img.mobile')
					  	.images.set_container('div.figures div.phone')
					 	.images.set_visible_count(1)
					 	.controls.set_pause_on_hover(false)	 		
					 	.controls.set_auto(6000);
	// Clients Gallery
	 var client_gallery = new Caracal.Gallery.Slider();
  	 client_gallery
				  	.images.add('img.clients')
				  	.images.set_container('div.client_gallery')
				 	.images.set_visible_count(6)
				 	.images.set_spacing(100)
				 	.images.set_step_size(1)
	 	            .images.set_center(true)
            		.images.set_spacing(20)
				 	.controls.set_pause_on_hover(false)	
				 	.controls.attach_next('a.btn_next')
				 	.controls.attach_previous('a.btn_previous'); 						 	

	gallery = new PageControl('div.sites_container','div.site')
	gallery.attachPreviousControl($('a.previous'))
	gallery.attachNextControl($('a.next'))
	.setWrapAround(true);

	var version_links = $('div.controls a');
	var container = $('div.sites_container');
	container.attr('class',"sites_container desktop");
	$('div.controls a.desktop').addClass('active');

	version_links.on('click',function(){
		var item = $(this);
		item.addClass('active');
		version_links.not(item).removeClass('active');
		var newClass = item.attr('class');
		container.attr('class',"sites_container " + newClass);

	});



	 			
};


// connect document `load` event with handler function
$(Site.on_load);
