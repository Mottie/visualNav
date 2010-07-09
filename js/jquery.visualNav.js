/*
 * visualNavigation (visualNav)
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
   base.$el.find(base.options.link).click(function(){
    var sel = $(this).attr(base.options.targetAttr);
    if ($(sel).length) {
     // get content top or top position if at the document bottom
     newTop = Math.min( $(sel).offset().top, $(document).height() - $(window).height() );
     $('html,body').stop().animate({ 'scrollTop' : newTop }, base.options.animationTime, function(){
      window.location.hash = sel;
     });
    }
    return false;
   });
   // Adjust side menu on scroll and resize
   $(window)
    .scroll(function(){ base.findLocation(); })
    .resize(function(){ base.findLocation(); });
  };

  // Update menu
  base.findLocation = function(){
   var winTop = $(window).scrollTop();
   // cycling through each link during the scroll may be slow on some computers/browsers
   base.$el.find(base.options.link).each(function(i){
    var tar = $( $(this).attr(base.options.targetAttr) );
    if (tar.length) {
     var loc = tar.offset().top;
     if ( loc > winTop - base.options.topMargin && 
        ( loc < winTop + base.options.topRange || ( winTop + $(window).height() + base.options.bottomMargin ) >= $(document).height() ) ){
      base.$el.find(base.options.selectedAppliedTo) // add selected 
       .removeClass(base.options.selectedClass)
       .eq(i).addClass(base.options.selectedClass);
     }
    }
   });
  };

  // Run initializer
  base.init();
  base.findLocation();
 };

 $.visualNav.defaultOptions = {
  // use link & targetAttr in case you want to use <div class="link" data-target="#Home">Home</div>
  // the link = "div.link" and targetAttr = "data-target"
  link              : 'a',        // Add a link class, as necessary
  targetAttr        : 'href',     // added in case you have link = "div" and attribute something like
  selectedClass     : 'selected', // css class applied to menu
  selectedAppliedTo : 'li',       // to only apply to the link, use "andSelf"
  topRange          : 100,        // measure from the top of the viewport to X pixels down
  topMargin         : 100,        // margin above the top where the target updates the menu
  bottomMargin      : 20,         // margin from the end of the page where the last menu item is used (in case the target is short)
  animationTime     : 1200        // time in milliseconds
 };

 $.fn.visualNav = function(options){
  return this.each(function(){
   (new $.visualNav(this, options));
  });
 };
   
 // This function breaks the chain, but returns
 // the visualNav if it has been attached to the object.
 $.fn.getvisualNav = function(){
  this.data("visualNav");
 };
   
})(jQuery);