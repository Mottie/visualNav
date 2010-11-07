**Usage**

**Default setup**

* CSS (minimal setup)

        /* side menu with visualNav */
        #sidemenu { position: fixed; top: 50px; left: 20px; background: #444; width: 120px; }
        #sidemenu ul { list-style-type: none; margin: 0; padding: 0; }
        #sidemenu li { margin: 5px; padding: 5px; width: 100px; text-align: center; border: transparent 1px solid; }
        #sidemenu li.selected { background: #555; }
        #sidemenu li.inView   { border-color: #111; }
        #sidemenu a { text-decoration: none; color: #bbbbff; }
        #sidemenu a:hover { color: #fff; }

        /* main content */
        .content { min-width: 500px; background: #363636; border: #555 1px solid; margin: 10px 20px 50px 170px; padding: 10px; }

* HTML

        <!-- visualNav default menu -->
        <div id="sidemenu">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <!-- main contents -->
        <div>

          <div id="home" class="content">
            <h2>Home</h2>
            Home Content Here...
          </div>

          <div id="work" class="content">
            <h2>Work</h2>
            Work Content Here...
          </div>

          <div class="contact content">
            <h2>Contact</h2>
            Contact Info Here...
          </div>

        </div>

* Script (default settings shown)

        $(document).ready(function(){
          $('#sidemenu').visualNav({
            link              : 'a',        // Add a link class, as necessary
            targetAttr        : 'href',     // added in case you have link = "div" and attribute something like
            inViewClass       : 'inView',   // css class added to items in the viewport
            selectedClass     : 'selected', // css class applied to menu
            selectedAppliedTo : 'li',       // to only apply to the link, use the same value as is in the link option
            contentClass      : '.content', // content class to get height of the section
            bottomMargin      : 100,        // margin from the end of the page where the last menu item is used (in case the target is short)
            animationTime     : 1200        // time in milliseconds
          })
        })

**Alternate setup**

* CSS (minimal setup)

        /* side menu with visualNav */
        #menu { position: fixed; top: 50px; left: 20px; background: #444; width: 120px; }
        #menu div.link { margin: 5px; padding: 5px; width: 100px; text-align: center; }
        #menu div.selected { background: #555; }

        /* main content */
        .content { min-width: 500px; background: #363636; border: #555 1px solid; margin: 10px 20px 50px 170px; padding: 10px; }

* HTML

    * This side menu uses divs with a title attribute. The value in this attribute can be used to target an Id or a class (which should be unique).
    * It is important to note, that this menu will not work with javascript disabled, whereas the default one will work.

            <!-- visualNav menu using divs -->
            <div id="menu">
              <div class="link" title="#Home">Home</div>
              <div class="link" title="#work">Work</div>
              <div class="link" title=".contact">Contact</div>
            </div>

            <!-- main contents -->
            <div>

              <div id="home" class="content">
                <h2>Home</h2>
                Home Content Here...
              </div>

              <div id="work" class="content">
                <h2>Work</h2>
                Work Content Here...
              </div>

              <div class="contact content">
                <h2>Contact</h2>
                Contact Info Here...
              </div>

            </div>

* Script

        $(document).ready(function(){
          $('#menu').visualNav({
            link              : 'div.link', // Add a link class, as necessary
            targetAttr        : 'title',    // added in case you have link = "div" and attribute something like
            selectedAppliedTo : 'div.link'  // to only apply to the link, use the same value as is in the link option
          })
        })

**Options**

* <code>link</code>
    * The script will target this element in the visualNav menu.
    * Default is 'a', but if you have submenus you can target the main menu link with a specific class 'a.menu'.

* <code>targetAttr</code>
    * The link option (above) attribute will contain the main content ID (or class for non-link HTML).
    * Default is 'href' for the 'a' which should only contain a content ID (e.g. "#Home"), because using a non-hash (#) will break the browser targeting from the location bar.
    * For non 'a' links, you can use content ID or content class (which should still be unique).. e.g. "#Home" or ".contact".

* <code>inViewClass</code>
    * This class is applied to the visualNav menu to all "in viewport" elements (margin adjusted, see <code>bottomMargin</code> below for details).
    * Default value is 'inView'.

* <code>selectedClass</code>
    * This class is applied to the visualNav menu to the current content.
    * Default value is 'selected'.

* <code>selectedAppliedTo</code>
    * The <code>inViewClass</code> and <code>selectedClass</code> classes are applied to this element. The script uses this option to target, because you cannot target a parent class with CSS (the 'li' contains the 'a').
    * Default value is 'li' which is the HTML element that contains the link 'a'.
    * If you want to target the link only, then use the same value as is in the link option (e.g. 'a').

* <code>contentClass</code>
    * Each block of main content (not the visualNav menu) should be wrapped. This option targets the class of the wrapper because the script needs to determine the height of the content to best update the menu.
    * Default value is '.content'.

* <code>bottomMargin</code>

     ![bottomMargin][3]

    * This value is the height in pixels measured from the bottom of each main content block (see image above).
    * When the <code>bottomMargin</code> of a block hits the top of the viewport, that block is then considered out of the view port. Then the next content block is set as "selected" and the visualNav menu updates to show that one as current.
    * In the last block (contacts in this demo), when the top edge of the <code>bottomMargin</code> hits the bottom of the viewport, the visualNav menu switches to the last item. To state this another way, when the <code>bottomMargin</code> of the last block comes into view, the menu selects it.
    * In the image above, you can see the <code>bottomMargin</code> of the "Projects" block is just above the viewport. The visualNav menu updated to show that the "About" block is now the current block. If you continue scrolling and the <code>bottomMargin</code> of the "Contacts" block gets to the same point as the "Contacts" title (seen in the image), then the menu will update to show "Contacts" as selected.
    * Default value is 100 (pixels).

* <code>animationTime</code>
    * The animation time is the time in milliseconds that the menu will scroll to the selected section.
    * Default value is 1200 (milliseconds).

**Known Problems &amp; Bugs**

    * The menu will not select (or highlight) the item above the last item if they are both very short. For example, if your browser shows three sections while at the bottom of the page. The third to last may have shown for a brief time just before the bottom of the page reached the bottom edge margin. The menu would then skip directly to the last menu item. This is one reason why the bottom margin value is kept a low number (100 pixels by default).
    * If you click on a menu item, the page contents will automatically scroll to that section and update the browser url with that target. But if you manually scroll the page using the scroll bar or mouse, the web page url will not update with the current position. This was done on purpose, because if the script changes the location, the page will jump to that target automatically. This wouldn't look good if you are quickly scrolling through the page as it would make the movement jittery.


**Change Log**

* Version 2.0.1

    * Removed required anchor (<code>a</code>) before the content block - changed base HTML. The script now targets the content block.

* Version 2.0

    * Added <code>inViewClass</code> option which is applied to the menu for all content that is in view (margin adjusted).
    * Added <code>contentClass</code> option which targets the main page content divs. This was added to work with a new in viewport algorithm.
    * Changed in viewport algorithm - the original version worked fine as long as you didn't use PageUp/PageDown.
    * Removed <code>TopRange</code> option.
    * Removed <code>topMargin</code> option.

* Version 1.0

    * Initial Release

For more details, see [my blog][1] entry and view [the demo][2] source.


  [1]: http://wowmotty.blogspot.com/2010/07/visual-navigation.html
  [2]: http://mottie.github.com/visualNav/index.html
  [3]: http://mottie.github.com/visualNav/images/visualNav2Layout.jpg