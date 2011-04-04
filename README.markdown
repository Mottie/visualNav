###See the [Demo][1]!

###Documentation moved to the [Wiki pages][2].

###For more details, see [my blog][3] entry or view [the demo][1] source.

###Known Problems &amp; Bugs

* Doesn't work well in IE7 or IE quirks mode. Probably not in IE6.
* The menu will not select (or highlight) the item above the last item if they are both very short. For example, if your browser shows three sections while at the bottom of the page. The third to last may have shown for a brief time just before the bottom of the page reached the bottom edge margin. The menu would then skip directly to the last menu item. This is one reason why the bottom margin value is kept a low number (100 pixels by default).
* If you click on a menu item, the page contents will automatically scroll to that section and update the browser url with that target. But if you manually scroll the page using the scroll bar or mouse, the web page url will not update with the current position. This was done on purpose, because if the script changes the location, the page will jump to that target automatically. This wouldn't look good if you are quickly scrolling through the page as it would make the movement jittery.

  [1]: http://mottie.github.com/visualNav/index.html
  [2]: https://github.com/Mottie/visualNav/wiki
  [3]: http://wowmotty.blogspot.com/2010/07/visual-navigation.html
