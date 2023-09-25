System.register(["./index-legacy-45664c8d.js"],(function(e,t){"use strict";var i,n,o,r;return{setters:[e=>{i=e.f,n=e.h,o=e.g,r=e.r}],execute:function(){var t=globalThis&&globalThis.__awaiter||function(e,t,i,n){function o(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,r){function a(e){try{c(n.next(e))}catch(e){r(e)}}function s(e){try{c(n.throw(e))}catch(e){r(e)}}function c(e){e.done?i(e.value):o(e.value).then(a,s)}c((n=n.apply(e,t||[])).next())}))},a=globalThis&&globalThis.__generator||function(e,t){var i,n,o,r,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(e){return function(t){return c([e,t])}}function c(s){if(i)throw new TypeError("Generator is already executing.");for(;r&&(r=0,s[0]&&(a=0)),a;)try{if(i=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){a.label=s[1];break}if(6===s[0]&&a.label<o[1]){a.label=o[1],o=s;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(s);break}o[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],n=0}finally{i=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}},s=window.ImageCapture;void 0===s&&(s=function(){function e(e){var t=this;if("video"!==e.kind)throw new DOMException("NotSupportedError");this._videoStreamTrack=e,"readyState"in this._videoStreamTrack||(this._videoStreamTrack.readyState="live"),this._previewStream=new MediaStream([e]),this.videoElement=document.createElement("video"),this.videoElementPlaying=new Promise((function(e){t.videoElement.addEventListener("playing",e)})),HTMLMediaElement?this.videoElement.srcObject=this._previewStream:this.videoElement.src=URL.createObjectURL(this._previewStream),this.videoElement.muted=!0,this.videoElement.setAttribute("playsinline",""),this.videoElement.play(),this.canvasElement=document.createElement("canvas"),this.canvas2dContext=this.canvasElement.getContext("2d")}return Object.defineProperty(e.prototype,"videoStreamTrack",{get:function(){return this._videoStreamTrack},enumerable:!1,configurable:!0}),e.prototype.getPhotoCapabilities=function(){return new Promise((function(e,t){var i={current:0,min:0,max:0};e({exposureCompensation:i,exposureMode:"none",fillLightMode:["none"],focusMode:"none",imageHeight:i,imageWidth:i,iso:i,redEyeReduction:!1,whiteBalanceMode:"none",zoom:i}),t(new DOMException("OperationError"))}))},e.prototype.setOptions=function(e){return new Promise((function(e,t){}))},e.prototype.takePhoto=function(){var e=this;return new Promise((function(t,i){if("live"!==e._videoStreamTrack.readyState)return i(new DOMException("InvalidStateError"));e.videoElementPlaying.then((function(){try{e.canvasElement.width=e.videoElement.videoWidth,e.canvasElement.height=e.videoElement.videoHeight,e.canvas2dContext.drawImage(e.videoElement,0,0),e.canvasElement.toBlob(t)}catch(e){i(new DOMException("UnknownError"))}}))}))},e.prototype.grabFrame=function(){var e=this;return new Promise((function(t,i){if("live"!==e._videoStreamTrack.readyState)return i(new DOMException("InvalidStateError"));e.videoElementPlaying.then((function(){try{e.canvasElement.width=e.videoElement.videoWidth,e.canvasElement.height=e.videoElement.videoHeight,e.canvas2dContext.drawImage(e.videoElement,0,0),t(window.createImageBitmap(e.canvasElement))}catch(e){i(new DOMException("UnknownError"))}}))}))},e}()),window.ImageCapture=s,e("pwa_camera",function(){function e(e){var i=this;r(this,e),this.hasMultipleCameras=!1,this.hasFlash=!1,this.flashModes=[],this.flashMode="off",this.handlePickFile=function(e){},this.handleShutterClick=function(e){console.debug("shutter click"),i.capture()},this.handleRotateClick=function(e){i.rotate()},this.handleClose=function(e){i.handlePhoto&&i.handlePhoto(null)},this.handleFlashClick=function(e){i.cycleFlash()},this.handleCancelPhoto=function(e){var t=i.stream&&i.stream.getTracks()[0],n=t&&t.getConstraints();i.photo=null,i.photoSrc=null,n?i.initCamera({video:{facingMode:n.facingMode}}):i.initCamera()},this.handleAcceptPhoto=function(e){i.handlePhoto&&i.handlePhoto(i.photo)},this.handleFileInputChange=function(e){return t(i,void 0,void 0,(function(){var t,i,n;return a(this,(function(o){switch(o.label){case 0:t=e.target,i=t.files[0],o.label=1;case 1:return o.trys.push([1,3,,4]),[4,this.getOrientation(i)];case 2:return n=o.sent(),console.debug("Got orientation",n),this.photoOrientation=n,[3,4];case 3:return o.sent(),[3,4];case 4:return this.handlePhoto&&this.handlePhoto(i),[2]}}))}))},this.handleVideoMetadata=function(e){console.debug("Video metadata",e)},this.facingMode="user",this.handlePhoto=void 0,this.handleNoDeviceError=void 0,this.noDevicesText="No camera found",this.noDevicesButtonText="Choose image",this.photo=void 0,this.photoSrc=void 0,this.showShutterOverlay=!1,this.flashIndex=0,this.hasCamera=null,this.rotation=0,this.deviceError=null}return e.prototype.componentDidLoad=function(){return t(this,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return this.defaultConstraints={video:{facingMode:this.facingMode}},[4,this.queryDevices()];case 1:return e.sent(),[4,this.initCamera()];case 2:return e.sent(),[2]}}))}))},e.prototype.disconnectedCallback=function(){this.stopStream(),this.photoSrc&&URL.revokeObjectURL(this.photoSrc)},e.prototype.hasImageCapture=function(){return"ImageCapture"in window},e.prototype.queryDevices=function(){return t(this,void 0,void 0,(function(){var e,t,i;return a(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,navigator.mediaDevices.enumerateDevices()];case 1:return e=n.sent(),t=e.filter((function(e){return"videoinput"==e.kind})),this.hasCamera=!!t.length,this.hasMultipleCameras=t.length>1,[3,3];case 2:return i=n.sent(),this.deviceError=i,[3,3];case 3:return[2]}}))}))},e.prototype.initCamera=function(e){return t(this,void 0,void 0,(function(){var t,i;return a(this,(function(n){switch(n.label){case 0:e||(e=this.defaultConstraints),n.label=1;case 1:return n.trys.push([1,3,,4]),[4,navigator.mediaDevices.getUserMedia(Object.assign({video:!0,audio:!1},e))];case 2:return t=n.sent(),this.initStream(t),[3,4];case 3:return i=n.sent(),this.deviceError=i,this.handleNoDeviceError&&this.handleNoDeviceError(i),[3,4];case 4:return[2]}}))}))},e.prototype.initStream=function(e){return t(this,void 0,void 0,(function(){return a(this,(function(t){switch(t.label){case 0:return this.stream=e,this.videoElement.srcObject=e,this.hasImageCapture()?(this.imageCapture=new window.ImageCapture(e.getVideoTracks()[0]),[4,this.initPhotoCapabilities(this.imageCapture)]):[3,2];case 1:return t.sent(),[3,3];case 2:this.deviceError="No image capture",this.handleNoDeviceError&&this.handleNoDeviceError(),t.label=3;case 3:return i(this.el),[2]}}))}))},e.prototype.initPhotoCapabilities=function(e){return t(this,void 0,void 0,(function(){var t;return a(this,(function(i){switch(i.label){case 0:return[4,e.getPhotoCapabilities()];case 1:return(t=i.sent()).fillLightMode&&t.fillLightMode.length>1&&(this.flashModes=t.fillLightMode.map((function(e){return e})),this.flashMode?(this.flashMode=this.flashModes[this.flashModes.indexOf(this.flashMode)]||"off",this.flashIndex=this.flashModes.indexOf(this.flashMode)||0):this.flashIndex=0),[2]}}))}))},e.prototype.stopStream=function(){this.videoElement&&(this.videoElement.srcObject=null),this.stream&&this.stream.getTracks().forEach((function(e){return e.stop()}))},e.prototype.capture=function(){return t(this,void 0,void 0,(function(){var e,t;return a(this,(function(i){switch(i.label){case 0:if(!this.hasImageCapture())return[3,5];i.label=1;case 1:return i.trys.push([1,4,,5]),[4,this.imageCapture.takePhoto({fillLightMode:this.flashModes.length>1?this.flashMode:void 0})];case 2:return e=i.sent(),[4,this.flashScreen()];case 3:return i.sent(),this.promptAccept(e),[3,5];case 4:return t=i.sent(),console.error("Unable to take photo!",t),[3,5];case 5:return this.stopStream(),[2]}}))}))},e.prototype.promptAccept=function(e){return t(this,void 0,void 0,(function(){var t;return a(this,(function(i){switch(i.label){case 0:return this.photo=e,[4,this.getOrientation(e)];case 1:if(t=i.sent(),console.debug("Got orientation",t),this.photoOrientation=t,t)switch(t){case 1:case 2:this.rotation=0;break;case 3:case 4:this.rotation=180;break;case 5:case 6:this.rotation=90;break;case 7:case 8:this.rotation=270}return this.photoSrc=URL.createObjectURL(e),[2]}}))}))},e.prototype.getOrientation=function(e){return new Promise((function(t){var i=new FileReader;i.onload=function(e){var i=new DataView(e.target.result);if(65496!==i.getUint16(0,!1))return t(-2);for(var n=i.byteLength,o=2;o<n;){var r=i.getUint16(o,!1);if(o+=2,65505===r){if(1165519206!==i.getUint32(o+=2,!1))return t(-1);var a=18761===i.getUint16(o+=6,!1);o+=i.getUint32(o+4,a);var s=i.getUint16(o,a);o+=2;for(var c=0;c<s;c++)if(274===i.getUint16(o+12*c,a))return t(i.getUint16(o+12*c+8,a))}else{if(65280!=(65280&r))break;o+=i.getUint16(o,!1)}}return t(-1)},i.readAsArrayBuffer(e.slice(0,65536))}))},e.prototype.rotate=function(){this.stopStream();var e=this.stream&&this.stream.getTracks()[0];if(e){var t=e.getConstraints().facingMode;if(!t){var i=e.getCapabilities();i.facingMode&&(t=i.facingMode[0])}"environment"===t?this.initCamera({video:{facingMode:"user"}}):this.initCamera({video:{facingMode:"environment"}})}},e.prototype.setFlashMode=function(e){console.debug("New flash mode: ",e),this.flashMode=e},e.prototype.cycleFlash=function(){this.flashModes.length>0&&(this.flashIndex=(this.flashIndex+1)%this.flashModes.length,this.setFlashMode(this.flashModes[this.flashIndex]))},e.prototype.flashScreen=function(){return t(this,void 0,void 0,(function(){var e=this;return a(this,(function(t){return[2,new Promise((function(t,i){e.showShutterOverlay=!0,setTimeout((function(){e.showShutterOverlay=!1,t()}),100)}))]}))}))},e.prototype.iconExit=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Cg id='Icon_5_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M402.2,134L378,109.8c-1.6-1.6-4.1-1.6-5.7,0L258.8,223.4c-1.6,1.6-4.1,1.6-5.7,0L139.6,109.8 c-1.6-1.6-4.1-1.6-5.7,0L109.8,134c-1.6,1.6-1.6,4.1,0,5.7l113.5,113.5c1.6,1.6,1.6,4.1,0,5.7L109.8,372.4c-1.6,1.6-1.6,4.1,0,5.7 l24.1,24.1c1.6,1.6,4.1,1.6,5.7,0l113.5-113.5c1.6-1.6,4.1-1.6,5.7,0l113.5,113.5c1.6,1.6,4.1,1.6,5.7,0l24.1-24.1 c1.6-1.6,1.6-4.1,0-5.7L288.6,258.8c-1.6-1.6-1.6-4.1,0-5.7l113.5-113.5C403.7,138.1,403.7,135.5,402.2,134z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"},e.prototype.iconPhotos=function(){return n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"512",height:"512",viewBox:"0 0 512 512"},n("path",{d:"M450.29,112H142c-34,0-62,27.51-62,61.33V418.67C80,452.49,108,480,142,480H450c34,0,62-26.18,62-60V173.33C512,139.51,484.32,112,450.29,112Zm-77.15,61.34a46,46,0,1,1-46.28,46A46.19,46.19,0,0,1,373.14,173.33Zm-231.55,276c-17,0-29.86-13.75-29.86-30.66V353.85l90.46-80.79a46.54,46.54,0,0,1,63.44,1.83L328.27,337l-113,112.33ZM480,418.67a30.67,30.67,0,0,1-30.71,30.66H259L376.08,333a46.24,46.24,0,0,1,59.44-.16L480,370.59Z"}),n("path",{d:"M384,32H64A64,64,0,0,0,0,96V352a64.11,64.11,0,0,0,48,62V152a72,72,0,0,1,72-72H446A64.11,64.11,0,0,0,384,32Z"}))},e.prototype.iconConfirm=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Ccircle fill='%232CD865' cx='256' cy='256' r='256'/%3E%3Cg id='Icon_1_'%3E%3Cg%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M208,301.4l-55.4-55.5c-1.5-1.5-4-1.6-5.6-0.1l-23.4,22.3c-1.6,1.6-1.7,4.1-0.1,5.7l81.6,81.4 c3.1,3.1,8.2,3.1,11.3,0l171.8-171.7c1.6-1.6,1.6-4.2-0.1-5.7l-23.4-22.3c-1.6-1.5-4.1-1.5-5.6,0.1L213.7,301.4 C212.1,303,209.6,303,208,301.4z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"},e.prototype.iconReverseCamera=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M352,0H160C72,0,0,72,0,160v192c0,88,72,160,160,160h192c88,0,160-72,160-160V160C512,72,440,0,352,0z M356.7,365.8l-3.7,3.3c-27,23.2-61.4,35.9-96.8,35.9c-72.4,0-135.8-54.7-147-125.6c-0.3-1.9-2-3.3-3.9-3.3H64 c-3.3,0-5.2-3.8-3.2-6.4l61.1-81.4c1.6-2.1,4.7-2.1,6.4-0.1l63.3,81.4c2,2.6,0.2,6.5-3.2,6.5h-40.6c-2.5,0-4.5,2.4-3.9,4.8 c11.5,51.5,59.2,90.6,112.4,90.6c26.4,0,51.8-9.7,73.7-27.9l3.1-2.5c1.6-1.3,3.9-1.1,5.3,0.3l18.5,18.6 C358.5,361.6,358.4,364.3,356.7,365.8z M451.4,245.6l-61,83.5c-1.6,2.2-4.8,2.2-6.4,0.1l-63.3-83.3c-2-2.6-0.1-6.4,3.2-6.4h40.8 c2.5,0,4.4-2.3,3.9-4.8c-5.1-24.2-17.8-46.5-36.5-63.7c-21.2-19.4-48.2-30.1-76-30.1c-26.5,0-52.6,9.7-73.7,27.3l-3.1,2.5 c-1.6,1.3-3.9,1.2-5.4-0.3l-18.5-18.5c-1.6-1.6-1.5-4.3,0.2-5.9l3.5-3.1c27-23.2,61.4-35.9,96.8-35.9c38,0,73.9,13.7,101.2,38.7 c23.2,21.1,40.3,55.2,45.7,90.1c0.3,1.9,1.9,3.4,3.9,3.4h41.3C451.4,239.2,453.3,243,451.4,245.6z'/%3E%3C/g%3E%3C/svg%3E"},e.prototype.iconRetake=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Ccircle fill='%23727A87' cx='256' cy='256' r='256'/%3E%3Cg id='Icon_5_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M394.2,142L370,117.8c-1.6-1.6-4.1-1.6-5.7,0L258.8,223.4c-1.6,1.6-4.1,1.6-5.7,0L147.6,117.8 c-1.6-1.6-4.1-1.6-5.7,0L117.8,142c-1.6,1.6-1.6,4.1,0,5.7l105.5,105.5c1.6,1.6,1.6,4.1,0,5.7L117.8,364.4c-1.6,1.6-1.6,4.1,0,5.7 l24.1,24.1c1.6,1.6,4.1,1.6,5.7,0l105.5-105.5c1.6-1.6,4.1-1.6,5.7,0l105.5,105.5c1.6,1.6,4.1,1.6,5.7,0l24.1-24.1 c1.6-1.6,1.6-4.1,0-5.7L288.6,258.8c-1.6-1.6-1.6-4.1,0-5.7l105.5-105.5C395.7,146.1,395.7,143.5,394.2,142z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"},e.prototype.iconFlashOff=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M498,483.7L42.3,28L14,56.4l149.8,149.8L91,293.8c-2.5,3-0.1,7.2,3.9,7.2h143.9c1.6,0,2.7,1.3,2.4,2.7 L197.6,507c-1,4.4,5.8,6.9,8.9,3.2l118.6-142.8L469.6,512L498,483.7z'/%3E%3Cpath class='st0' d='M449,218.2c2.5-3,0.1-7.2-3.9-7.2H301.2c-1.6,0-2.7-1.3-2.4-2.7L342.4,5c1-4.4-5.8-6.9-8.9-3.2L214.9,144.6 l161.3,161.3L449,218.2z'/%3E%3C/g%3E%3C/svg%3E"},e.prototype.iconFlashOn=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpath class='st0' d='M287.2,211c-1.6,0-2.7-1.3-2.4-2.7L328.4,5c1-4.4-5.8-6.9-8.9-3.2L77,293.8c-2.5,3-0.1,7.2,3.9,7.2h143.9 c1.6,0,2.7,1.3,2.4,2.7L183.6,507c-1,4.4,5.8,6.9,8.9,3.2l242.5-292c2.5-3,0.1-7.2-3.9-7.2L287.2,211L287.2,211z'/%3E%3C/svg%3E"},e.prototype.iconFlashAuto=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpath class='st0' d='M287.2,211c-1.6,0-2.7-1.3-2.4-2.7L328.4,5c1-4.4-5.8-6.9-8.9-3.2L77,293.8c-2.5,3-0.1,7.2,3.9,7.2h143.9 c1.6,0,2.7,1.3,2.4,2.7L183.6,507c-1,4.4,5.8,6.9,8.9,3.2l242.5-292c2.5-3,0.1-7.2-3.9-7.2L287.2,211L287.2,211z'/%3E%3Cg%3E%3Cpath class='st0' d='M321.3,186l74-186H438l74,186h-43.5l-11.9-32.5h-80.9l-12,32.5H321.3z M415.8,47.9l-27.2,70.7h54.9l-27.2-70.7 H415.8z'/%3E%3C/g%3E%3C/svg%3E"},e.prototype.render=function(){var e=this;return n("div",{class:"camera-wrapper"},n("div",{class:"camera-header"},n("section",{class:"items"},n("div",{class:"item close",onClick:function(t){return e.handleClose(t)}},n("img",{src:this.iconExit()})),n("div",{class:"item flash",onClick:function(t){return e.handleFlashClick(t)}},this.flashModes.length>0&&n("div",null,"off"==this.flashMode?n("img",{src:this.iconFlashOff()}):"","auto"==this.flashMode?n("img",{src:this.iconFlashAuto()}):"","flash"==this.flashMode?n("img",{src:this.iconFlashOn()}):"")))),(!1===this.hasCamera||!!this.deviceError)&&n("div",{class:"no-device"},n("h2",null,this.noDevicesText),n("label",{htmlFor:"_pwa-elements-camera-input"},this.noDevicesButtonText),n("input",{type:"file",id:"_pwa-elements-camera-input",onChange:this.handleFileInputChange,accept:"image/*",class:"select-file-button"})),this.photoSrc?n("div",{class:"accept"},n("div",{class:"accept-image",style:Object.assign({backgroundImage:"url(".concat(this.photoSrc,")")},{})})):n("div",{class:"camera-video"},this.showShutterOverlay&&n("div",{class:"shutter-overlay"}),this.hasImageCapture()?n("video",{ref:function(t){return e.videoElement=t},onLoadedMetaData:this.handleVideoMetadata,autoplay:!0,playsinline:!0}):n("canvas",{ref:function(t){return e.canvasElement=t},width:"100%",height:"100%"}),n("canvas",{class:"offscreen-image-render",ref:function(t){return e.offscreenCanvas=t},width:"100%",height:"100%"})),this.hasCamera&&n("div",{class:"camera-footer"},this.photo?n("section",{class:"items"},n("div",{class:"item accept-cancel",onClick:function(t){return e.handleCancelPhoto(t)}},n("img",{src:this.iconRetake()})),n("div",{class:"item accept-use",onClick:function(t){return e.handleAcceptPhoto(t)}},n("img",{src:this.iconConfirm()}))):[n("div",{class:"pick-image",onClick:this.handlePickFile},n("label",{htmlFor:"_pwa-elements-file-pick"},this.iconPhotos()),n("input",{type:"file",id:"_pwa-elements-file-pick",onChange:this.handleFileInputChange,accept:"image/*",class:"pick-image-button"})),n("div",{class:"shutter",onClick:this.handleShutterClick},n("div",{class:"shutter-button"})),n("div",{class:"rotate",onClick:this.handleRotateClick},n("img",{src:this.iconReverseCamera()}))]))},Object.defineProperty(e,"assetsDirs",{get:function(){return["icons"]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"el",{get:function(){return o(this)},enumerable:!1,configurable:!0}),e}()).style=":host{--header-height:4em;--footer-height:9em;--header-height-landscape:3em;--footer-height-landscape:6em;--shutter-size:6em;--icon-size-header:1.5em;--icon-size-footer:2.5em;--margin-size-header:1.5em;--margin-size-footer:2.0em;font-family:-apple-system, BlinkMacSystemFont,\n    “Segoe UI”, “Roboto”, “Droid Sans”, “Helvetica Neue”, sans-serif;display:block;width:100%;height:100%}.items{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.items .item{-ms-flex:1;flex:1;text-align:center}.items .item:first-child{text-align:left}.items .item:last-child{text-align:right}.camera-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%}.camera-header{color:white;background-color:black;height:var(--header-height)}.camera-header .items{padding:var(--margin-size-header)}.camera-footer{position:relative;color:white;background-color:black;height:var(--footer-height)}.camera-footer .items{padding:var(--margin-size-footer)}@media (max-height: 375px){.camera-header{--header-height:var(--header-height-landscape)}.camera-footer{--footer-height:var(--footer-height-landscape)}.camera-footer .shutter{--shutter-size:4em}}.camera-video{position:relative;-ms-flex:1;flex:1;overflow:hidden;background-color:black}video{width:100%;height:100%;max-height:100%;min-height:100%;-o-object-fit:cover;object-fit:cover;background-color:black}.pick-image{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;left:var(--margin-size-footer);top:0;height:100%;width:var(--icon-size-footer);color:white}.pick-image input{visibility:hidden}.pick-image svg{cursor:pointer;fill:white;width:var(--icon-size-footer);height:var(--icon-size-footer)}.shutter{position:absolute;left:50%;top:50%;width:var(--shutter-size);height:var(--shutter-size);margin-top:calc(var(--shutter-size) / -2);margin-left:calc(var(--shutter-size) / -2);border-radius:100%;background-color:#c6cdd8;padding:12px;-webkit-box-sizing:border-box;box-sizing:border-box}.shutter:active .shutter-button{background-color:#9da9bb}.shutter-button{background-color:white;border-radius:100%;width:100%;height:100%}.rotate{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;right:var(--margin-size-footer);top:0;height:100%;width:var(--icon-size-footer);color:white}.rotate img{width:var(--icon-size-footer);height:var(--icon-size-footer)}.shutter-overlay{z-index:5;position:absolute;width:100%;height:100%;background-color:black}.error{width:100%;height:100%;color:white;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.no-device{background-color:black;-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:white}.no-device label{cursor:pointer;background:#fff;border-radius:6px;padding:6px 8px;color:black}.no-device input{visibility:hidden;height:0;margin-top:16px}.accept{background-color:black;-ms-flex:1;flex:1;overflow:hidden}.accept .accept-image{width:100%;height:100%;max-height:100%;background-position:center center;background-size:cover;background-repeat:no-repeat}.close img{cursor:pointer;width:var(--icon-size-header);height:var(--icon-size-header)}.flash img{width:var(--icon-size-header);height:var(--icon-size-header)}.accept-use img{width:var(--icon-size-footer);height:var(--icon-size-footer)}.accept-cancel img{width:var(--icon-size-footer);height:var(--icon-size-footer)}.offscreen-image-render{top:0;left:0;visibility:hidden;pointer-events:none;width:100%;height:100%}"}}}));