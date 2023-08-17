try {
  canvasElement = document.createElement("canvas");
  canvasContext = canvasElement.getContext("2d");
  appleEntity = document.querySelector("#appleEntity");
  loadingText = document.querySelector("#loadingText");

  // Make the loading text visible until the model is fully loaded
  appleEntity.addEventListener('model-loaded', () => {
    loadingText.setAttribute('visible', false);
  });
  loadingText.setAttribute('visible', true);

  //scan qr code and update 3D model color
  setInterval(function() {
    video = document.querySelector("video");
    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvasContext.drawImage(
        video,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var imageData = canvasContext.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var qrCode = jsQR(imageData.data, imageData.width, imageData.height);
      if (qrCode && qrCode.data !== "") {
        appleEntity.setAttribute("material", "color", qrCode.data);
        console.log("QR Code Data - " + qrCode.data);
      } else {
        console.log("no qr code found");
      }
    }
  }, 3000);
} catch (error) {
  alert(error.message);
}