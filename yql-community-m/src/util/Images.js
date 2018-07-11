export default {
  getImageSize (url, suc, error){
    return new Promise(function(resolve, reject) {
      function onLoad() {
        resolve([image.width, image.height])
        suc && suc(image.width, image.height)
      }
      var image = new Image();
      image.onload = onLoad;
      image.onerror = function() {
        var exception = new Error('Could not load image at ' + url);
        error && error(exception);
        reject(exception);
      };
      image.src =url;
    });
  }
}