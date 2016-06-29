# JavaScript-Preloader-Plug-in

Here is a JavaScript preloader plugin that can be added to your website. This runs until the page is loaded then disappears and shows the screen.

# How To Use

To add this plugin to your website all you need is the JavaScript and CSS file. You want to download both of them and call this file from your html, and follow the instructions in the file:

Add These links:<br>
<link href="preLoaderCSS.css" type="text/css" rel="stylesheet"><br>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script><br>
<script src="https://code.jquery.com/jquery-1.10.2.js"></script><br>

Add the code above to the top of your HTML document in the head tags and wrap the website in a <div> with the id being 'screenHolder' with a default display of none. Also add <script src="preLoaderScript.js"></script> at the bottom right before the closing.
body tag.

(if you want to auto generate random facts)
Add: <script type="text/javascript" src="stats.json"></script> at the beginning of your HTML and change the 'RandomFacts' into what you would like to display.

<b> How to change what is shown </b><br>
var myLoader = new Preloader({<br>
     style: 'circular',<br>
     percent: true,<br>
     blur: false,<br>
     box: false,<br>
     closeText: 'Close this...',<br>
});<br>
<br>
myLoader.open();

You can find more information on each variable in the JavaScript file.

# Motivation

I wanted something to cover my screen while loading larger pages, this provides it with a professional look where the designs (background, font, etc.) can be changed easily.

# Contributors

I am open to any suggestions and any recommendations.
