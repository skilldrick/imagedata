$(document).ready(function () {
  var image = new Image();

  //var url = 'http://sipi.usc.edu/database/preview/misc/4.2.04.png';
  var url = 'lenna.png';
  if (url.indexOf('http:\/\/') === 0) {
    //if url starts with http://, remove the http:// and send to proxy
    url = url.replace('http://', '');
    image.src = 'proxy.php?url=' + encodeURIComponent(url);
  }
  else {
    //otherwise proxy is not needed - use as local image
    image.src = url;
  }

  image.onload = function () {
    var width = image.width;
    var height = image.height;
    var canvas = $('#test')[0];
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0);
    var imageData = context.getImageData(0, 0, width, height);
    var getPixel = getPixelMaker(imageData);
    var row = 150;
    for (var i = 0; i < 20; i++) { 
      console.log('row:', row, 'col:', i);
      console.log(getPixel(row, i, 0), getPixel(row, i, 1), getPixel(row, i, 2));
    }

  };

});


function getPixelMaker(imageData) {
  var width = imageData.width;
  var height = imageData.height;
  return function (row, col, component) {
    return imageData.data[((row * (width * 4)) + (col * 4)) + component];
  };
}

