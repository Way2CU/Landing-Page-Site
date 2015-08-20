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
					 	.controls.set_auto(4000);
	 	

	 var mobile_gallery = new Caracal.Gallery.Slider();
	  	 mobile_gallery
					  	.images.add('img.mobile')
					  	.images.set_container('div.figures div.phone')
					 	.images.set_visible_count(1)
					 	.controls.set_pause_on_hover(false)	 		
					 	.controls.set_auto(4000);

	gallery = new PageControl('div.sites_container','div.site')
	gallery.attachPreviousControl($('a.previous'))
	gallery.attachNextControl($('a.next'))
	.setWrapAround(true);

	var version_links = $('div.controls a');
	var container = $('div.sites_container');
	version_links.on('click',function(){
		
		var link = $(this);
		var newClass = link.attr('class');
		container.addClass(newClass);

	});

	 			
};


// connect document `load` event with handler function
$(Site.on_load);
