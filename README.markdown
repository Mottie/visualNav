**Usage** (default settings shown)

    $(document).ready(function(){
     $('#sidemenu').visualNav({
      link              : 'a',        // Add a link class, as necessary
      targetAttr        : 'href',     // added in case you have link = "div" and attribute something like
      selectedClass     : 'selected', // css class applied to menu
      selectedAppliedTo : 'li',       // to only apply to the link, use "a"
      topRange          : 100,        // measure from the top of the viewport to X pixels down
      topMargin         : 100,        // margin above the top where the target updates the menu
      bottomMargin      : 20,         // margin from the end of the page where the last menu item is used (in case the target is short)
      animationTime     : 1200        // time in milliseconds
     })
    })

For more details, see [my blog][1] entry and view [the demo][2] source.

  [1]: http://wowmotty.blogspot.com/2010/07/visual-navigation.html
  [2]: http://mottie.github.com/visualNav/index.html