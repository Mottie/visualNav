/*!
 * Visual Navigation (visualNav) v2.4
 * https://github.com/Mottie/visualNav/wiki
 * by Rob Garrison (Mottie)
 * MIT licensed.
 */
/*jshint jquery:true */
;(function($){
"use strict";
$.visualNav = function(el, options){
	// Access to jQuery and DOM versions of element
	var o, base = this;
	base.$el = $(el);

	// Add a reverse reference to the DOM object
	base.$el.data("visualNav", base);

	// Cached objects
	base.win = window;
	base.$win = $(base.win);
	base.$doc = $(document);
	// Opera scrolling fix - http://www.zachstronaut.com/posts/2009/01/18/jquery-smooth-scroll-bugs.html
	var scrollElement = 'html, body';
	$('html, body').each(function(){
		var initScrollTop = $(this).attr('scrollTop');
		$(this).attr('scrollTop', initScrollTop + 1);
		if ($(this).attr('scrollTop') === initScrollTop + 1) {
			scrollElement = this.nodeName.toLowerCase();
			$(this).attr('scrollTop', initScrollTop);
			return false;
		}
	});
	base.$body = $(scrollElement);

	base.init = function(){
		base.initialized = false;
		base.options = o = $.extend({}, $.visualNav.defaultOptions, options);
		base.$content = $('.' + o.contentClass);
		base.leftMargin = parseInt( base.$content.css('margin-left'), 10);
		base.rightMargin = parseInt( base.$content.css('margin-right'), 10);
		base.$lastMenu = [ null ];

		// check easing
		if (!$.isFunction($.easing[o.easing[0]])) { o.easing = ['swing', 'swing']; }

		// Stop animated scroll if the user does something
		base.$body.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
			if ( o.stopOnInteraction && ( e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel' ) ){
				base.$body.stop();
			}
		});

		// Find specific menu links (this roundabout way is needed so ordinary links in the menu continue to work - like the link to other demo)
		var links = o.selectedAppliedTo + (o.selectedAppliedTo === o.link ? '' : ' ' + o.link);
		base.$el.find(links).not('.' + o.externalLinks)
			// add links inside the content - the links must have a "visualNav" class name
			.add( $('.' + o.contentLinks) )
			.click(function(){
				// contentLinks outside the menu can be anything, but if they are <a>, make sure we get the href
				// just in case the o.link isn't an <a>
				var att = (this.tagName === "A") ? 'href' : o.targetAttr;
				base.animate($(this).attr(att));
				return false;
			});
		// Adjust side menu on scroll and resize
		base.$win
			.scroll(function(){ base.throttle(); })
			.resize(function(){ base.throttle(); });

		// go to hash on page load
		if (o.useHash && base.win.location.hash) {
			base.animate(base.win.location.hash);
		}

		// update menu
		base.findLocation();

		// update content
		if (base.win.location.hash === '') {
			links = '.' + o.selectedClass + (o.selectedAppliedTo === o.link ? '' : ' ' + o.link);
			// ultimately calls base.animate function to update content class & hash
			base.$el.find(links).trigger('click');
		}

	};

	base.animate = function(sel){
		if (sel !== '#' && $(sel).length) { // ignore non-existant targets & solitary '#'
			var $sel = $(sel).eq(0).closest('.' + o.contentClass);
			if ($sel.length) {
				base.$curHash = sel;
				// callback before animation
				if (base.initialized && typeof o.beforeAnimation === 'function') {
					o.beforeAnimation(base, $sel, base.$curMenu);
				}
				// get content top or top position if at the document bottom, then animate
				base.$body.stop().animate({
					scrollLeft : Math.min( $sel.offset().left, base.$doc.width() - base.$win.width() ) - base.leftMargin,
					scrollTop  : Math.min( $sel.offset().top, base.$doc.height() - base.$win.height() )
				},{
					queue         : false,
					duration      : base.initialized ? o.animationTime : 0,
					specialEasing : {
						scrollLeft  : o.easing[0] || 'swing',
						scrollTop   : o.easing[1] || o.easing[0] || 'swing'
					},
					complete      : function(){
						base.completed();
					}

				});
			}
		}
	};

	base.throttle = function(){
		if (base.flag) { return; }
		base.flag = true;
		base.timer = setTimeout(function(){
			base.flag = false;
			// find current menu item after the set time; works better with super fast scrolling
			base.findLocation();
		}, 100);
	};

	base.completed = function(){
		if (o.useHash) { base.win.location.hash = base.$curHash; }

		// callbacks
		if (base.initialized) {
			// callback when animation has completed
			if (typeof o.complete === 'function') {
				o.complete(base, $sel, base.$curMenu);
			}
		} else {
			if (typeof o.initialized === 'function') {
				// callback( visNavObject, current content, current menu item )
				o.initialized( base, $sel, base.$curMenu );
			}
			// complete initialization
			base.initialized = true;
		}

		// clear throttle flag, just in case
		base.flag = false;
	};

	// Update menu
	base.findLocation = function(){
		var tar, locLeft, locTop, sel, elBottom, elHeight, elWidth, elRight,
		winWidth = base.$win.width(),
		winLeft = base.$win.scrollLeft(),
		winTop = base.$win.scrollTop(),
		winRight = winLeft + winWidth,
		winBottom = winTop + base.$win.height(),
		docHeight = base.$doc.height(),
		el = base.$el.find(o.selectedAppliedTo).removeClass(o.inViewClass);
		// Make content fit on screen
		if (o.fitContent) {
			base.$content.width( winWidth - base.leftMargin - base.rightMargin );
		}
		// cycling through each link during the scroll may be slow on some computers/browsers
		base.$el.find(o.link).each(function(i){
			sel = $(this).attr(o.targetAttr);
			tar = (sel === "#" || sel.length <= 1) ? '' : $(sel); // ignore links that don't point anywhere
			if (tar.length) {
				locTop = Math.ceil(tar.offset().top);
				locLeft = Math.ceil(tar.offset().left);
				elHeight = tar.outerHeight();
				elBottom = locTop + elHeight + o.bottomMargin;
				elWidth = tar.outerWidth();
				elRight = locLeft + elWidth;
				// in view class
				if ( locTop < winBottom && ( locTop + elHeight - o.bottomMargin > winTop || elBottom > winBottom ) &&
				locLeft < winRight && ( locLeft + elWidth - o.bottomMargin > winLeft || elRight > winRight ) ) {
					el.eq(i).addClass(o.inViewClass);
				}
			}
		});
		// add selected class. If at the document end, select the last element
		sel = ( winBottom + o.bottomMargin >= docHeight ) ? ':last' : ':first';
		el.removeClass(o.selectedClass);
		base.$curMenu = el.filter('.' + o.inViewClass + sel).addClass(o.selectedClass);

		// update current content class while scrolling
		if (base.$curMenu[0] !== base.$lastMenu[0]) {
			base.$lastMenu = base.$curMenu;
			base.$content.removeClass(o.currentContent);
			sel = $('.' + o.selectedClass + (o.selectedAppliedTo === o.link ? '' : ' ' + o.link)).attr(o.targetAttr);
			base.$curContent = $(sel)
				.closest('.' + o.contentClass)
				.addClass(o.currentContent);
		}

	};

	// Run initializer
	base.init();

};

$.visualNav.defaultOptions = {
	// use link & targetAttr in case you want to use <div class="link" data-target="#Home">Home</div>
	// the link = "div.link" and targetAttr = "data-target"
	link              : 'a',         // Add a link class, as necessary.
	targetAttr        : 'href',      // added in case you have link = "div" and attribute something like.
	selectedAppliedTo : 'li',        // to only apply to the link, use the same value as is in the link option.
	contentClass      : 'content',   // content class to get height of the section.
	contentLinks      : 'visualNav', // class name of links inside the content that act like the visualNav menu (smooth scroll).
	externalLinks     : 'external',  // class name of links that link to external content.
	useHash           : true,        // if true, the location hash will be updated

	// Classes added to items
	inViewClass       : 'inView',    // css class added to items in the viewport.
	selectedClass     : 'selected',  // css class applied to menu when a link is selected (highlighted).
	currentContent    : 'current',   // css class applied to the content block when it is currently selected in the menu

	// Appearance
	bottomMargin      : 100,         // Margin from the end of the page where the last menu item is used (in case the target is short).
	fitContent        : false,       // If true, the contentClass width will be adjusted to fit the browser window (for horizontal pages).

	// Animation
	animationTime     : 1200,                 // time in milliseconds.
	easing            : [ 'swing', 'swing' ], // horizontal, vertical easing; if might be best to leave one axis as swing [ 'swing', 'easeInCirc' ]
	stopOnInteraction : true,        // if the user presses any key or scrolls the mouse, the animation will cancel

	// Callbacks
	initialized       : null,        // Callback executed when the visualNav plugin has finished initializing
	beforeAnimation   : null,        // Callback executed before the animation begins moving to the targetted element
	complete          : null         // Callback executed when the targetted element is in view and scrolling animation has completed
};

$.fn.visualNav = function(options){
	return this.each(function(){
		var nav = $(this).data('visualNav');
		// string provided, check if it's an ID or class
		if (typeof options === "string" && /^(#|\.)/.test(options)) {
			nav.animate(options);
		}
		// don't allow multiple instances
		if (nav) { return; }
		(new $.visualNav(this, options));
	});
};

// This function breaks the chain, but returns
// the visualNav if it has been attached to the object.
$.fn.getvisualNav = function(){
	return this.data("visualNav");
};

})(jQuery);