/**
 * Main JavaScript
 * Way2CU Landing Pages
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors: Mladen Mijatov, Tal Reznik
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
Site.LandingPagePreview = function(page_control, controls_container) {
	var self = this;

	self.container = null;
	self.controls = null;
	self.sites = null;
	self.images = null;
	self.page_control = page_control;

	// image versions
	var Version = {
		DESKTOP: 0,
		TABLET: 1,
		MOBILE: 2,

		/**
		 * Get version number based on presence of classes.
		 *
		 * @return integer
		 */
		get: function(control) {
			var result = null;

			if (control.hasClass('mobile')) {
				result = 2;
			} else if (control.hasClass('tablet')) {
				result = 1;
			} else {
				result = 0;
			}

			return result;
		}
	}

	// local namespaces
	self.handler = {};

	/**
	 * Object initialization.
	 */
	self._init = function() {
		// find DOM elements
		self.container = self.page_control.container;
		self.controls = controls_container.find('a');
		self.sites = self.container.find('div.site');
		self.images = self.sites.find('a img');

		// connect signals
		self.page_control.connect('page-flip', self.handler.page_switch);
		self.controls.on('click', self.handler.version_click);
		self.images.on('click', self.handler.image_click);

		// load first image
		self._load_image(null);
	};

	/**
	 * Load image data for specified version.
	 *
	 * @param integer site_index
	 */
	self._load_image = function(site_index) {
		// get site to load image for
		if (site_index == null)
			var site = self.sites.filter('.visible'); else
			var site = self.sites.eq(site_index);

		// get image to work with
		var version = Version.get(self.container);
		var image = site.find('a img').eq(version);

		// make sure not to load image twice
		if (image.data('loaded'))
			return;

		// create temporary image container
		var temp_image = $('<img>');
		temp_image
			.on('load', function(event) {
				// mark image as loaded
				image.data('loaded', true);

				// set source to newly loaded data
				image.attr('src', temp_image.attr('src'));
			})
			.attr('src', image.data('image'));
	};

	/**
	 * Handle switching page.
	 *
	 * @param integer current_page
	 * @param integer new_page
	 */
	self.handler.page_switch = function(current_page, new_page) {
		// load image
		self._load_image(new_page);

		// let the page switch
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
		self.container
			.attr('class', new_class)
			.addClass('container')
			.removeClass('active');

		// load currently active image
		self._load_image(null);
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
		.images.set_step_size(1)
		.images.set_center(true)
		.images.add('div.client_gallery img')
		.controls.attach_next('div.clients_gallery_wrap a.btn_next')
		.controls.attach_previous('div.clients_gallery_wrap a.btn_previous');
	 Site.client_logo_slider.images.update();

	// create page control for landing page preview
	Site.landing_pages_gallery = new PageControl('section.gallery div.container', 'div.site');
	Site.landing_pages_gallery
		.attachPreviousControl($('section.gallery a.previous'))
		.attachNextControl($('section.gallery a.next'))
		.setWrapAround(true);

	// create landing page preview
	Site.landing_page_preview = new Site.LandingPagePreview(
			Site.landing_pages_gallery,
			$('section.gallery div.controls')
		);
};

// connect document `load` event with handler function
$(Site.on_load);
