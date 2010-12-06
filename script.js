$(document).ready(function () {
  var image = new Image();

  var url = 'http://a2.twimg.com/profile_images/1179930478/gravatarxmas.jpg';
  //url = '4x4.png';
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
    context.width = width;
    context.height = height;
    context.drawImage(image, 0, 0);
    var imageData = context.getImageData(0, 0, width, height);
    var getPixel = getPixelMaker(imageData);
    for (var i = 0; i < 4; i++) { 
      console.log('col:', i);
      console.log(getPixel(0, i, 0), getPixel(0, i, 1), getPixel(0, i, 2));
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

