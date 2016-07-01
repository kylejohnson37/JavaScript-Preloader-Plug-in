 (function() {

     /*
     *      @project - PreLoader
     *	    @author - Kyle Johnson <kyle.johnson@myfela.com>
     *
     *  	This plug-in allows you to customize many options of a PreLoader or Pop-up
     *
     *  	The options to this plug-in are:
     *	-closeButton: 'true' for a closeButton to appear at the top-right of a modal box, 'false' will auto shut the loader
     *	-content: The information sent in this will determine the text that is shown
     *	-logo: you can decide which logo appears in the loader by sending choosing 'FELA' or 'LifeCents'
     *	-style: by sending in 'horizontal' or 'circular' will determine loader shown
     *	-percent: 'true' will show the percent completed, 'false' will not
     *	-blur: 'true' will blur the background, 'false' will give it a white background
     *	-box: 'true' will display a modal box for the preloader
     *	-message: 'true' will change the layout of the preloader and make room for a 'title' and 'content'
     *	-title: the information sent it will show under the message layout
     * 	-closeInfo: if closeButton is 'true', the information sent in this will display a close button at the bottom of the loader
     *	-autoGen: if 'true' will automatically generate random strings from the 'stats.json' JSON file attached
	 *	-height & width: pass in the wanted height or width for your modal box (100px, 10%, 
	 *	etc.)
     *
     *
     *	<link href="preLoaderCSS.css" type="text/css" rel="stylesheet">
     *	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
     *	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
     *	<script type="text/javascript" src="stats.json"></script>
     * 	Add the code above to the top of your HTML document in the head tags and wrap the website 
     *	in a <div> with the id being 'screenHolder' and a default display of none. 
     *	Also add <script src="preLoaderScript.js"></script> at the bottom right before the closing
     * 	body tag
     *
     *
     *
     *
     *Here is an example of how to call the function.
     *var myLoader = new Preloader({
     		style: 'circular',
     		percent: true,
     		blur: false,
     		box: false		
     	});

       myLoader.open();
     */

     /**
      * Constructs our Pre-Loader plug in
      * @constructor this.Preloader
      */
     this.Preloader = function() {

         //creates global references
         this.preloader = null;


         /**
          * The default values for our preloader.
          *@var {array} defaults
          */
         var defaults = {
             closeButton: false,
             content: "",
             logo: "new",
             style: "horizontal",
             percent: true,
             blur: false,
             box: false,
             message: false,
             title: "",
             closeText: "",
             autoGen: true,
             height: "50%",
             width: "60%"
         };

         //create options by taking in passed in arguments and extending defaults
         if (arguments[0] && typeof arguments[0] === "object") {
             this.options = $.extend({}, defaults, arguments[0]);
         }
     };

     /**
      * The function that calls the function to create our preloader
      * @function Preloader.prototype.open
      */
     Preloader.prototype.open = function() {
         buildLoader.call(this);
     };

     /**
      * The function that creates our PreLoader based on the passed in values
      * @function buildLoader
      */
     function buildLoader() {
         var contentHolder, logoHolder, loader, newlogo, modalBox, titleHolder, closeHolder, percentHolder, infoHolder, wrapper, init, getProgress, ready;
	
		 ready = false;
		 
         var docFrag = document.createDocumentFragment();

         //Creates the <div> that we will build the loader in
         loader = document.createElement("div");
         $loader = $(loader);
         $loader.addClass("preloaderHolder");
         $loader.attr("id", "preloaderHolder");

         getBlur(this.options.blur);


         //We build our pre-loader that the content to the pre-loader will then go in and place it in our loader <div>.
         this.preloader = document.createElement("div");
         $(this.preloader).addClass("cs-loader");
         $(loader).append(this.preloader);

         getLogo(this.options.logo);

         //Creates an <img> and inserts the logo chose above into it.
         logoHolder = document.createElement("img");
         $logoHolder = $(logoHolder)
         $logoHolder.attr("src", newlogo);
         $logoHolder.addClass("preloaderLogo");

         getLogoStyle(this.options.logo);

         //Adds our 'cs-loader' <div>
         $(this.preloader).append(logoHolder);


         //Creates a <div> that will hold the content passed in and adds it to our 'cs-loader' <div>
         contentHolder = document.createElement("div");
         $contentHolder = $(contentHolder);
         $contentHolder.addClass("preloaderContent");
         $contentHolder.text(this.options.content);
         $(this.preloader).append(contentHolder);

         getLoaderStyle(this.options.style, this.preloader);


         //Tracks when each photo is loaded and returns a percent completed back
         //If currentPercent = 100 we set ready to 'true'
         getProgress = function(callback) {
             var allImages = $("img");
             var numImages = allImages.length;
             var currentPercent;

             var count = 0;

             $("img").one("load", function() {
                 count = count + 1;
                 var currentPercent = count / numImages * 100;
				 if(currentPercent===100){
					 ready = true;
				 }
                 callback(Math.round(currentPercent));
             }).each(function() {
                 if (this.complete) $(this).load();
             });
         };

         getPercent(this.options.percent, this.options.style, this.preloader);

         getModalBox(this.options.box, this.preloader, this.options.height, this.options.width);

         var obj;

         getMessage(this.options.message, this.options.autoGen, this.preloader, this.options.title, this.options.content);


         //Retrieves passed in closeText 
         var closeWords = this.options.closeText;

         getButton(this.options.closeButton, this.options.box);


         //Add our final pre-loader to the document then to the body
         $(docFrag).append(loader);
         $(document.body).append(docFrag);

         /**
          * The function that removes our loader from the screen, and removes styles 
          * from the HTML code
          * @function init 
          */
         init = function() {
             var screen = document.getElementById("screenHolder");
             $(".preloaderHolder").fadeOut("slow");
             $(screen).removeAttr("style");
         };

         /**
          * This function adds the blur style to our webpage if the parameter is true
          * @function getBlur 
          * @param {boolean} blur
          */
         function getBlur(blur) {
             var isIE = false || !!document.documentMode;
             if (blur === true) {
                 if (!isIE && !!window.StyleMedia) {
                     $loader.attr("style", "background-color: rgba(0, 0, 0, 0.5)");
                     $("#screenHolder").attr("style", "");
                 } else {
                     $("#screenHolder").attr("style", "-webkit-filter: blur(4px);");
                     $loader.attr("style", "background-color: rgba(0, 0, 0, 0.5)");
                 }
             } else {
                 $loader.attr("style", "background: white");
             }
         };

         /**
          * This function will get our Logo's location based on the logo parameter name passed in
          * @function getLogo
          * @param {string} logo
          */
         function getLogo(logo) {
             if (logo === "FELA") {
                 newlogo = "FELA-Web-Logo.png";
             } else if (logo === "LifeCents") {
                 newlogo = "LifeCents-Web-Logo.png";
             } else if (logo=== "new"){
				 newlogo = "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png";
			 }
         };

         /**
          * This function sets our logo's style attribute to center with the loader
          * @function getLogoStyle
          * @param {string} logo
          */
         function getLogoStyle(logo) {
			 if (logo === "LifeCents") {
                 $(logoHolder).css("top", "110px");
             } else if (logo === "FELA"){
				 $(logoHolder).css("left", "10px");
			 } else if(logo=== "new"){
				 $(logoHolder).css("position: relative !important; top: 24px !important;");
			 }
         };

         /**
          * This function creates our loaders based off what is passed in parameter 'style'
          * @function getLoaderStyle
          * @param {string} style
          * @param {div} preloader
          */
         function getLoaderStyle(style, preloader) {
             $preloader = $(preloader);
             if (style === "horizontal") {
                 var dot1 = document.createElement("label");
                 dot1.innerHTML = ".";
                 var dot2 = document.createElement("label");
                 dot2.innerHTML = ".";
                 var dot3 = document.createElement("label");
                 dot3.innerHTML = ".";
                 var dot4 = document.createElement("label");
                 dot4.innerHTML = ".";
                 var dot5 = document.createElement("label");
                 dot5.innerHTML = ".";
                 var dot6 = document.createElement("label");
                 dot6.innerHTML = ".";
                 $preloader.append(dot1);
                 $preloader.append(dot2);
                 $preloader.append(dot3);
                 $preloader.append(dot4);
                 $preloader.append(dot5);
                 $preloader.append(dot6);
             } else {
                 var spinner = document.createElement("div");
                 $(spinner).addClass("spinner");
                 $preloader.append(spinner);
             }
         };

         /**
          * This function will get the percent of images loaded into a website. If 'percent' is 
          * is passed in as true it will add it to the preloader. If not it still tracks 
          * progress. 'Style' is also passed in for some styling purposes.
          * @function getPercent
          * @param {Boolean} percent
          * @param {string} style
          * @param {div} preloader
          */
         function getPercent(percent, style, preloader) {
             if (percent === true) {
                 percentHolder = document.createElement("div");
                 $percentHolder = $(percentHolder);
                 $percentHolder.addClass("percentHolder");
                 $percentHolder.text("0%");
                 $(preloader).append($percentHolder);
                 if (style === "circular") {
                     $percentHolder.attr("style", "position: relative;");
                 }

                 //calls the function that returns the percent completed
                 //located at bottom of plug-in
                 getProgress(function(percentComplete) {
                     $(".percentHolder").text(percentComplete + "%");
                 });
             } else {
                 getProgress(function() {});
             }
         };

         /**
          * This function creates our white background Modal Box when 'box' is true. It can be
          * created to the specification of height & width also. 
          * @function getModalBox
          * @param {Boolean} box
          * @param {div} preloader
          * @param {string} height
          * @param {string} width
          */
         function getModalBox(box, preloader, height, width) {
             if (box === true) {
                 modalBox = document.createElement("div");
                 $modalBox = $(modalBox);
                 $modalBox.addClass("modalBox");
                 $(loader).append(modalBox);
                 $modalBox.css("height", height);
                 $modalBox.css("width", width);
                 $modalBox.append(preloader);

                 wrapper = document.createElement("div");
                 $(wrapper).addClass("modalBoxWrapper");
                 $modalBox.append(wrapper);

                 window.onclick = function(event) {
                     var modal = document.getElementById("preloaderHolder");
                     if (event.target === modal) {
						 if(ready === true){
							 init();
						 }
                     }
                 };
             } else {
                 $(preloader).attr("style", "position: relative; top: 23%;");
             }
         };

         /**
          * This function will alter how the layout of our preloader to fit room for the 'title'.
          * You can also automatically generate facts from a JSON file if autoGen is 'true'.
          * @function getMessage
          * @param {boolean} message
          * @param {boolean} autoGen
          * @param {div} preloader
          * @param {string} title
          */
         function getMessage(message, autoGen, preloader, title, content) {
             if (message === true) {
                 $(preloader).css("width", "38%");
				 $(preloader).css("padding-left"," 4%");
                 titleHolder = document.createElement("div");
                 $titleHolder = $(titleHolder);
                 $titleHolder.addClass("preloaderTitle");
                 $titleHolder.text(title);
                 $wrapper = $(wrapper);
                 $wrapper.append(titleHolder);

                 infoHolder = document.createElement("div");
                 $infoHolder = $(infoHolder);
                 $infoHolder.addClass("preloaderInfo");

                 if (autoGen === true) {
                     obj = JSON.parse(auto);

                     $infoHolder.text(obj[Math.floor(Math.random() * 3)].message);
                 } else {
                     $infoHolder.text(content);
                     $contentHolder = ($contentHolder);
                     $contentHolder.text("");
                 }
                 $wrapper.append(infoHolder);
             }
             //If autoGen is true but message is 'false' we then add the text to our first contentHolder <div>
             else if (autoGen === true) {
				 $(logoHolder).css("padding-top", "9%");
                 obj = JSON.parse(auto);
                 $contentHolder = ($contentHolder);
                 $contentHolder.text(obj[Math.floor(Math.random() * obj.length)].message);
             }
			 else{
				$(logoHolder).css("padding-top", "9%");
			 }
         };

         /**
          * This function will create a close button in the top right corner if 'closeButton' is
          * true. If 'box' is true it adds it to the top left of the modal box.
          * @function getButton
          * @param {boolean} closeButton
          * @param {boolean} box
          *
          */
         function getButton(closeButton, box) {
             if (closeButton === true && box === true) {
                 window.addEventListener("load", function() {

                     var button = document.createElement("img");
                     $button = $(button);
                     $button.addClass("preLoaderCloser");
                     $button.attr("id", "preLoaderCloser");
                     $button.attr("height", "25px");
                     $button.attr("width", "25px");
                     $button.attr("src", "close-icon.png");
                     $(modalBox).append($button);

                     if (closeWords !== "") {
                         closeHolder = document.createElement("button");
                         $closeHolder = $(closeHolder);
                         $closeHolder.addClass("preLoaderCloseText");
                         $closeHolder.attr("id", "preLoaderCloseText");
                         $closeHolder.text(closeWords);
                         $(wrapper).append($closeHolder);

                         var word = document.getElementById("preLoaderCloseText");
                         word.addEventListener("click", function() {
                             init();
                         });
                     }

                     var closer = document.getElementById("preLoaderCloser");
                     closer.addEventListener("click", function() {
                         init();
                     });

                 });
             } else if (closeButton === true) {
                 window.addEventListener("load", function() {

                     var button = document.createElement("img");
                     $button = $(button);
					 $button.addClass("preLoaderCloser");
                     $button.attr("id", "preLoaderCloser");
                     $button.attr("style", "top: 0px; right:0px;");
                     $button.attr("src", "close-icon.png");
                     $(loader).append($button);

                     if (closeWords !== "") {
                         closeHolder = document.createElement("button");
                         $closeHolder = $(closeHolder);
                         $closeHolder.addClass("preLoaderCloseText");
                         $closeHolder.attr("id", "preLoaderCloseText");
                         $closeHolder.text(closeWords);
                         $(contentHolder).append($closeHolder);

                         var word = document.getElementById("preLoaderCloseText");
                         word.addEventListener("click", function() {
                             init();
                         });
                     }

                     var closer = document.getElementById("preLoaderCloser");
                     closer.addEventListener("click", function() {
                         init();
                     });
                 });
             } else {
                 window.addEventListener("load", function() {
                     init();
                 });
             }
         };
     }
 }());

 var myLoader = new this.Preloader({
     closeButton: true,
     box: true,
     message: true,
     blur: true,
	 style: "circular",
	 autoGen: true,
	 closeText: "Close"

 });

 myLoader.open();