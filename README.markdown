## Features

* Smooth scrolling page navigation.
* Easing can easily be defined for both horizontal and vertical scrolling.
* Auto-updating menu which highlights both the currently viewed content &amp; other content in view.
* User can cancel auto-scroll by pressing any key, clicking on the page or scrolling the mousewheel.
* Can be set up to work with any menu elements. Integrates easily with Bootstrap!

## Demos

* [Main horizontal scrolling demo](http://mottie.github.com/visualNav/index.html)
* [Horizontal and Vertical content demo](http://mottie.github.com/visualNav/index2.html)
* [Bootstrap demo](http://mottie.github.com/visualNav/bootstrap.html)
* [Demo Playground](http://jsfiddle.net/Pw5vJ/)

## Documentation
* Moved to the [Wiki pages](https://github.com/Mottie/visualNav/wiki).
* For more details, see [my blog](http://wowmotty.blogspot.com/2010/07/visual-navigation.html) entry or check out any of the demo pages source.

## Dependencies

* jQuery 1.3+ (required)
* jQuery easing plugin (optional)

## Licensing

* [MIT License](http://www.opensource.org/licenses/mit-license.php) for all versions.
* Previously it was dual licensed under MIT and GPL, but now it's just the MIT.

## Known Problems &amp; Bugs

* Doesn't work well in IE7 or IE quirks mode. Probably not in IE6.
* The menu will not select (or highlight) the item above the last item if they are both very short. For example, if your browser shows three sections while at the bottom of the page. The third to last may have shown for a brief time just before the bottom of the page reached the bottom edge margin. The menu would then skip directly to the last menu item. This is one reason why the bottom margin value is kept a low number (100 pixels by default).
* If you click on a menu item, the page contents will automatically scroll to that section and update the browser url with that target. But if you manually scroll the page using the scroll bar or mouse, the web page url will not update with the current position. This was done on purpose, because if the script changes the location, the page will jump to that target automatically. This wouldn't look good if you are quickly scrolling through the page as it would make the movement jittery.

## Change Log

### Version 2.3

* Added an `externalLinks` option:
  * This option contains the class name applied to links within the navigation menu which are ignored by this plugin.
  * Use it for external page links or popups, as needed.
  * The default value is `"external"`.
* Added a Bootstrap demo.
* Changed the HTML basic layout to include a inner content wrapper
  * This inner wrapper now has the styling applied to it - border, background, padding, etc.
  * The outer "content" wrapper provides the margins to allow for a side menu or top menu (like Bootstrap) and keep the content in view, not under the menu.

### Version 2.2

* visualNav updated to work with horizontal and/or vertical page layouts.
* Added a second demo to show the menu working with both horizontal and vertical content.
* Added useHash option that turns on (true, default setting) or off (false) the updating of the hash in the url.
* Added fitContent option that resizes the content when true (false by default). For use when horizontal content is present.
* Added easing option which adds easing to horizontal and/or vertical scrolling.
* Added animation to reposition the content on initial load if a hash tag is present.
* Fixed a bug where links contained in the menu wrapper, but not inside the menu wouldn't work - see link to other demo (in the demo) to see what I mean.