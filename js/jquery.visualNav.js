/*
 * visualNavigation (visualNav) v2.1
 * http://wowmotty.blogspot.com/2010/07/visual-navigation.html
 *
 * Copyright (c) 2010 Rob Garrison (aka Mottie & Fudgey)
 * Dual licensed under the MIT and GPL licenses.
 *
 * Plugin base: http://starter.pixelgraphics.us/
 */

(function($){
 $.visualNav = function(el, options){
  // To avoid scope issues, use 'base' instead of 'this'
  // to reference this class from internal events and functions.
  var base = this;

  // Access to jQuery and DOM versions of element
  base.$el = $(el);
  base.el = el;

  // Add a reverse reference to the DOM object
  base.$el.data("visualNav", base);

  base.init = function(){
   base.options = $.extend({},$.visualNav.defaultOptions, options);
   // Stop animated scroll if the user does something
   $('html,body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
    if ( e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel' ){
     $('html,body').stop();
    }
   });
   // Animate menu scroll to content
   base.$el.find(base.options.link)
    // add links inside the content - the links must have a "visualNav" class name
    .add( $('.' + base.options.contentLinks) )
    .click(function(){
     // contentLinks outside the menu can be anything, but if they are <a>, make sure we get the href
     // just in case the base.options.link isn't an <a>
     var att = (this.tagName == "A") ? 'href' : base.options.targetAttr;
     base.animate($(this).attr(att));
     return false;
    });
   // Adjust side menu on scroll and resize
   $(window)
    .scroll(function(){ base.findLocation(); })
    .resize(function(){ base.findLocation(); });
  };

  base.animate = function(sel){
   if ($(sel).length) {
    // get content top or top position if at the document bottom, then animate
    var newTop = Math.min( $(sel).offset().top, $(document).height() - $(window).height() );
    $('html,body').stop().animate({ 'scrollTop' : newTop }, base.options.animationTime, function(){
     window.location.hash = sel;
    });
   }
  };

  // Update menu
  base.findLocation = function(){
   var tar, loc, sel, elBottom, elHeight,
    winTop = $(window).scrollTop(),
    winBottom = winTop + $(window).height(),
    docHeight = $(document).height(),
    el = base.$el.find(base.options.selectedAppliedTo).removeClass(base.options.inViewClass);
   // cycling through each link during the scroll may be slow on some computers/browsers
   base.$el.find(base.options.link).each(function(i){
    tar = $( $(this).attr(base.options.targetAttr) );
    if (tar.length) {
     loc = tar.offset().top;
     elHeight = tar.outerHeight();
     elBottom = loc + elHeight + base.options.bottomMargin;
     // in view class
     if ( loc < winBottom && ( loc + elHeight - base.options.bottomMargin > winTop || elBottom > winBottom ) ) {
      el.eq(i).addClass(base.options.inViewClass);
     }
    }
   });
   // add selected class. If at the document end, select the last element
   sel = ( winBottom + base.options.bottomMargin >= docHeight ) ? ':last' : ':first';
   el.removeClass(base.options.selectedClass);
   el.filter('.' + base.options.inViewClass + sel).addClass(base.options.selectedClass);
  };

  // Run initializer
  base.init();
  base.findLocation();
 };

 $.visualNav.defaultOptions = {
  // use link & targetAttr in case you want to use <div class="link" data-target="#Home">Home</div>
  // the link = "div.link" and targetAttr = "data-target"
  link              : 'a',         // Add a link class, as necessary
  targetAttr        : 'href',      // added in case you have link = "div" and attribute something like
  inViewClass       : 'inView',    // css class added to items in the viewport
  selectedClass     : 'selected',  // css class applied to menu when a link is selected (highlighted)
  selectedAppliedTo : 'li',        // to only apply to the link, use the same value as is in the link option
  contentClass      : 'content',   // content class to get height of the section
  contentLinks      : 'visualNav', // class name of links inside the content that act like the visualNav menu (smooth scroll)
  bottomMargin      : 100,         // margin from the end of the page where the last menu item is used (in case the target is short)
  animationTime     : 1200         // time in milliseconds
 };

 $.fn.visualNav = function(options){
  return this.each(function(){
   var nav = $(this).data('visualNav');
   // string provided, check if it's an ID
   if (typeof options == "string" && /^#/.test(options)) {
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
  this.data("visualNav");
 };
   
})(jQuery);