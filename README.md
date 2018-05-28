# SlideShow-Responsve



INSTALATION

Lite and easy to use responsive SlideShow

- add image files to Img folder
- add link to SlideShow.js script to Head element:

  <script type="text/javascript" src="SlideShow.js"></script>
  
- next create json objects array in <script> element to set data for SlideShow:

slideObjects = [
            { "slide": "img/IMGP5283.jpg", "caption": "image 1" },
            { "slide": "img/IMGP5292.jpg", "caption": "img 2" },
            { "slide": "img/IMGP5296.jpg", "caption": "next image" },
            { "slide": "img/IMGP5298.jpg", "caption": "next" },
            { "slide": "img/IMGP5299.jpg", "caption": "" },
            { "slide": "img/IMGP5308.jpg", "caption": "" },
            { "slide": "img/IMGP5310.jpg", "caption": "" },
            { "slide": "img/IMGP5314.jpg", "caption": "" },
            { "slide": "img/IMGP5354.jpg", "caption": "" },
            { "slide": "img/IMGP5355.jpg", "caption": "" }
        ];
        
  - then create SlideShow object in <script> element:
  
    var mySlideShow = new SlideShow("slideShowElement", slideObjects, true);
        
  - in <body> element create SlideShow element:
  
    <div id="slideShowElement"></div>
    
EXAMPLE
    
<!DOCTYPE html>
<html lang="pl" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Slide Show</title>
    <script type="text/javascript" src="SlideShow.js"></script>
</head>
<body>
    <div id="slideShowElement"></div>
    <script>
        slideObjects = [
            { "slide": "img/IMGP5283.jpg", "caption": "one" },
            { "slide": "img/IMGP5292.jpg", "caption": "two" },
            { "slide": "img/IMGP5296.jpg", "caption": "image 3" },
            { "slide": "img/IMGP5298.jpg", "caption": "" },
            { "slide": "img/IMGP5299.jpg", "caption": "" },
            { "slide": "img/IMGP5308.jpg", "caption": "" },
            { "slide": "img/IMGP5310.jpg", "caption": "" }
        ];
        var mySlideShow = new SlideShow("slideShowElement", slideObjects, true);
    </script>
</body>
</html>
    
    
  
  
