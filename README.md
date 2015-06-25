## Features

* Smooth scrolling page navigation.
* Easing can easily be defined for both horizontal and vertical scrolling.
* Auto-updating menu which highlights both the currently viewed content &amp; other content in view.
* User can cancel auto-scroll by pressing any key, clicking on the page or scrolling the mousewheel.
* Can be set up to work with any menu elements. Integrates easily with Bootstrap!
* Location hash updates as you scroll through the page (v2.4.2).

## Demos

* [Main vertical scrolling demo](http://mottie.github.com/visualNav/index.html)
* [Horizontal and Vertical content demo](http://mottie.github.com/visualNav/horiz-vert.html)
* [Section stepper demo](http://mottie.github.com/visualNav/stepper.html)
* [Bootstrap demo](http://mottie.github.com/visualNav/bootstrap.html)
* [Demo Playground](http://jsfiddle.net/Mottie/0gxhh1v8/)

## Documentation
* Moved to the [Wiki pages](https://github.com/Mottie/visualNav/wiki).
* For more details, see [my blog](http://wowmotty.blogspot.com/2010/07/visual-navigation.html) entry or check out any of the demo pages source.

## Dependencies

* jQuery 1.3+ (required)
* jQuery easing plugin (optional); jQuery 1.4 required for special easing.

## Licensing

* [MIT License](http://www.opensource.org/licenses/mit-license.php) for all versions.
* Previously it was dual licensed under MIT and GPL, but now it's just the MIT.

## Known Problems &amp; Bugs

* Doesn't work well in IE7 or IE quirks mode. Probably not in IE6.
* The menu will not select (or highlight) the item above the last item if they are both very short. For example, if your browser shows three sections while at the bottom of the page. The third to last may have shown for a brief time just before the bottom of the page reached the bottom edge margin. The menu would then skip directly to the last menu item. This is one reason why the bottom margin value is kept a low number (100 pixels by default).
* Fixed in v2.4.2! <del>If you click on a menu item, the page contents will automatically scroll to that section and update the browser url with that target. But if you manually scroll the page using the scroll bar or mouse, the web page url will not update with the current position. This was done on purpose, because if the script changes the location, the page will jump to that target automatically. This wouldn't look good if you are quickly scrolling through the page as it would make the movement jittery</del>.

## Change Log

### Version 2.5.2

* More specific check to fix oldIE bug. See [pull #13](https://github.com/Mottie/visualNav/pull/12). Thanks [daverodriguez](https://github.com/daverodriguez)!

### Version 2.5.1

* Preferentially use HTML5 History API. See [pull #11](https://github.com/Mottie/visualNav/pull/11). Thanks [daverodriguez](https://github.com/daverodriguez)!

### Version 2.5.0

* Add `offsetTop` option - adds a top offset value (pixels) or jQuery element (height is measured), of any top menu or gap.
* Add `scrollOnInit` option - prevents initial scroll to top menu item when set to `false` (default value).
* General code cleanup
  * Remove some browser specific code.
  * Add event namespacing.
  * Only update hash if changed.
* Anchors not inside of content blocks are now clickable
  * Previously, any anchor link in the menu would update to show that the ID was in view, but it was not clickable.
  * As before, any anchors within a defined content block (set by the `contentClass` option) will target the top of the content block.
* Modified `animationTime` option to now accept a function
  * The `animationTime` option still accepts a time in milliseconds.
  * To set an `animationTime` based on the scroll distance, use any desired calculation method and return a time in milliseconds.
  * For example, in this snippet, the distance is halfed and returned as an animation time in milliseconds:

     ```js
     animationTime: function( distance ) {
       // distance in pixels; return time in milliseconds
       // 1000 pixels => 500ms; 10000 pixels => 5000ms
       return distance / 2;
     }
     ```
