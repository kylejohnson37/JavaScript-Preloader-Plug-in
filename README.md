# JavaScript-Preloader-Plug-in

Here is a JavaScript preloader plugin that can be added to your website. This runs until the page is loaded then disappears and shows the screen.

# How To Use

To add this plugin to your website all you need is the JavaScript and CSS file. You want to download both of them and call this file from your html, and follow the instructions in the JavaScript file at the top of the page. It is very simple.

(if you want to auto generate random facts)
If you want to generate random facts then you have to make sure you are calling stats.json in the html as well.

<b> Different Designs:</b>
<div width="100%">
<img src="https://s31.postimg.org/ji69vqaxn/plugin2.png" alt="JavaScript Plugin Design" height="371px" width="65%" style="padding-left: 10%;"/>
<img src="https://s32.postimg.org/4byjn40ol/plugin.png" alt="JavaScript Plugin Design" height="371px" width="80%" style="padding-left: 10%;"/>
</div>
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
