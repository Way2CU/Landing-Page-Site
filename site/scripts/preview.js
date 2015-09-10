/**
 * Site Preview JavaScript
 * Way2CU Landing Pages
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors: Mladen Mijatov
 */

// create or use existing site scope
var Site = Site || {};


Site.Preview = function() {
	var self = this;

	self.container = null;
	self.controls = null;
	self.image = null;
	self.version_desktop = null;
	self.version_tablet = null;
	self.version_mobile = null;

	// image details
	self.images = null;

	// local namespaces
	self.handler = {};

	/**
	 * Complete object initialization.
	 */
	self._init = function() {
		// prepare preview
		self.container = $('body');
		self.container.addClass('loading');

		self.controls = $('div.controls a');
		self.image = $('<img>');
		self.image.appendTo(self.container);

		self.version_desktop = self.controls.filter('a.desktop');
		self.version_tablet = self.controls.filter('a.tablet');
		self.version_mobile = self.controls.filter('a.mobile');

		// connect signals
		self.version_desktop.on('click', self.handler.version_click);
		self.version_tablet.on('click', self.handler.version_click);
		self.version_mobile.on('click', self.handler.version_click);

		// mark desktop as selected
		self.version_desktop.addClass('active');

		// load site data
		self.load_site_data();
	};

	/**
	 * Load image for selected version.
	 */
	self.load_image = function() {
		var version = self.controls.filter('.active').data('version');

		// show loading animation
		self.container.addClass('loading');

		var image = $('<img>');
		image
			.on('load', function(event) {
				self.image.attr('src', self.images[version]);
				self.container.removeClass('loading');
			})
			.attr('src', self.images[version]);
	};

	self.load_site_data = function() {
		var data = {
			group_id: self.container.data('site-id')
		};

		// load site data
		new Communicator('gallery')
			.on_success(self.handler.group_load)
			.get('json_image_list', data);
	};

	/**
	 * Handle loading site data.
	 *
	 * @param object data
	 */
	self.handler.group_load = function(data) {
		if (data.error)
			return;

		var valid_ids = ['desktop', 'tablet', 'mobile'];
		self.images = {};

		// parse all the returned items
		for (var i=0, count=data.items.length; i<count; i++) {
			var item = data.items[i];

			if (valid_ids.indexOf(item.text_id) > -1)
				self.images[item.text_id] = item.image;
		}

		// apply control visibility
		if (!('tablet' in self.images))
			self.version_tablet.hide();

		if (!('mobile' in self.images))
			self.version_mobile.hide();

		// load first image
		self.load_image();
	};

	/**
	 * Handle clicking on different version of site preview.
	 *
	 * @param object event
	 */
	self.handler.version_click = function(event) {
		var version = $(this);

		// toggle class
		self.controls.not(version).removeClass('active');
		version.addClass('active');

		// load image for new version
		self.load_image();
	};

	// finalize object
	self._init();
}


$(function() {
	Site.preview = new Site.Preview();
});
