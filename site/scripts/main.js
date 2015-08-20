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
 * Object used for controling gallery and showing full preview of
 * selected landing page.
 *
 * @param object page_control
 */
Site.LandingPagePreview = function(page_control) {
	var self = this;

	self.container = null;
	self.controls = null;
	self.images = null;
	self.page_control = page_control;

	// local namespaces
	self.handler = {};

	/**
	 * Object initialization.
	 */
	self._init = function() {
		// find DOM elements
		self.container = self.page_control.container;
		self.controls = self.container.find('div.controls a');
		self.images = self.page_control.find('a img');

		// connect signals
		self.page_control.connect('page-flip', self.handler.page_switch);
		self.controls.on('click', self.handler.version_click);
		self.images.on('click', self.handler.image_click);
	};

	/**
	 * Handle switching page.
	 *
	 * @param integer current_page
	 * @param integer new_page
	 */
	self.handler.page_switch = function(current_page, new_page) {
		return true;
	};

	/**
	 * Handle clicking on site version link.
	 *
	 * @param object event
	 */
	self.handler.version_click = function(event) {
		// prevent default link behavior
		event.preventDefault();

		var link = $(this);
		var new_class = link.attr('class');

		// highlight current control
		self.controls.not(link).removeClass('active');
		link.addClass('active');

		// change page control container class
		self.container.attr('class', new_class).removeClass('active');

		// load currently active image
		// TODO!
	};

	/**
	 * Handle clicking on preview image.
	 *
	 * @param object event
	 */
	self.handler.image_click = function(event) {
	};

	// finalize object
	self._init();
}


/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

<<<<<<< HEAD
	// site initialize  
	var version_links = $('div.controls a');
	var container = $('div.sites_container');
	container.attr('class',"sites_container desktop");
	$('div.controls a.desktop').addClass('active');


	// Slider For Header desktop images
	var desktop_gallery = new Caracal.Gallery.Slider();
		desktop_gallery
					.images.add('img.desktop')
					.images.set_container('div.figures figure')
					.images.set_visible_count(1)
					.controls.set_pause_on_hover(false)
					.controls.set_auto(6000);
		
	// Slider For Header mobile images
	var mobile_gallery = new Caracal.Gallery.Slider();
		mobile_gallery
					.images.add('img.mobile')
					.images.set_container('div.figures div.phone')
					.images.set_visible_count(1)
					.controls.set_pause_on_hover(false)	 		
					.controls.set_auto(6000);

	// Clients Gallery Slider Function
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

	// Function displaying way2cu Sites (Desktop , tablet , mobile versions)
	var gallery = new PageControl('div.sites_container','div.site')
		gallery
			.attachPreviousControl($('a.previous'))
			.attachNextControl($('a.next'))
			.setWrapAround(true);


	version_links.on('click',function(){
		var item = $(this);
		item.addClass('active');
		version_links.not(item).removeClass('active');
		var newClass = item.attr('class');
		container.attr('class',"sites_container " + newClass);

	});



				
=======
	// create desktop screen shot slider in header
	var timeout = 4000;
	Site.desktop_screenshot_slider = new Caracal.Gallery.Slider();
	Site.desktop_screenshot_slider
		.images.set_container('div.figures figure')
		.images.set_visible_count(1)
		.images.add('div.figures img.desktop')
		.controls.set_pause_on_hover(false)
		.controls.set_auto(timeout);

	// create mobile screen shot slider in header
	Site.mobile_screenshot_slider = new Caracal.Gallery.Slider();
	Site.mobile_screenshot_slider
		.images.set_container('div.figures div.phone')
		.images.set_visible_count(1)
		.images.add('div.figures img.mobile')
		.controls.set_pause_on_hover(false)
		.controls.set_auto(timeout);

	// create slider for client logo gallery
	 Site.client_logo_slider = new Caracal.Gallery.Slider();
	 Site.client_logo_slider
		.images.set_container('div.client_gallery')
		.images.set_visible_count(6)
		.images.set_spacing(100)
		.images.set_step_size(1)
		.images.set_center(true)
		.images.set_spacing(20)
		.images.add('img.clients')
		.controls.set_pause_on_hover(false)
		.controls.attach_next('a.btn_next')
		.controls.attach_previous('a.btn_previous');

	// create page control for landing page preview
	Site.landing_pages_gallery = new PageControl('div.sites_container', 'div.site');
	Site.landing_pages_gallery
		.attachPreviousControl($('div.sites_container a.previous'))
		.attachNextControl($('div.sites_container a.next'))
		.setWrapAround(true);

	// create landing page preview
	Site.landing_page_preview = new Site.LandingPagePreview(Site.landing_pages_gallery);
>>>>>>> 1f197e7af8c53eb39e5686ceaa8c43bd234e4191
};

// connect document `load` event with handler function
$(Site.on_load);
