import "@fontsource/poppins";
import "photoswipe/dist/photoswipe.css";
import PhotoSwipe from "photoswipe/dist/photoswipe.esm";
import "./gallery.css";

// Simple fullscreen API
const fullscreenAPI = getFullscreenAPI();

// Create custom container
// which will be stretched to fullscreen.
//
// (we can not use PhotoSwipe root element (.pswp),
//  as it is created only after openPromise is resolved)
//
const pswpContainer = getContainer();

function getFullscreenPromise() {
  // Always resolve promise,
  // as wa want to open lightbox
  // (no matter if fullscreen is supported or not)
  return new Promise((resolve) => {
    if (!fullscreenAPI || fullscreenAPI.isFullscreen()) {
      // fullscreen API not supported, or already fullscreen
      resolve();
      return;
    }

    document.addEventListener(
      fullscreenAPI.change,
      () => {
        pswpContainer.style.display = "block";
        // delay to make sure that browser fullscreen animation is finished
        setTimeout(function () {
          resolve();
        }, 300);
      },
      { once: true }
    );

    fullscreenAPI.request(pswpContainer);
  });
}

import Lightbox from "photoswipe/dist/photoswipe-lightbox.esm";

const lightbox = new Lightbox({
  gallery: "#gallery",
  children: "a",
  pswpModule: PhotoSwipe,
  wheelToZoom: true,
  preloaderDelay: 0,

  // Add function that returns promise
  openPromise: getFullscreenPromise,

  // Append PhotoSwipe to our container
  appendToEl: fullscreenAPI ? pswpContainer : document.body,

  // disable opening/closing animations
  showAnimationDuration: 0,
  hideAnimationDuration: 0,

  // Add if you're using responsive images
  // since viewport size is unpredictable
  // at initialization
  preloadFirstSlide: false,
});
lightbox.on("close", () => {
  pswpContainer.style.display = "none";
  if (fullscreenAPI && fullscreenAPI.isFullscreen()) {
    fullscreenAPI.exit();
  }
});
lightbox.init();

// Simple fullscreen API helper,
// supports unprefixed and webkit-prefixed versions
function getFullscreenAPI() {
  let api;
  let enterFS;
  let exitFS;
  let elementFS;
  let changeEvent;
  let errorEvent;

  if (document.documentElement.requestFullscreen) {
    enterFS = "requestFullscreen";
    exitFS = "exitFullscreen";
    elementFS = "fullscreenElement";
    changeEvent = "fullscreenchange";
    errorEvent = "fullscreenerror";
  } else if (document.documentElement.webkitRequestFullscreen) {
    enterFS = "webkitRequestFullscreen";
    exitFS = "webkitExitFullscreen";
    elementFS = "webkitFullscreenElement";
    changeEvent = "webkitfullscreenchange";
    errorEvent = "webkitfullscreenerror";
  }

  if (enterFS) {
    api = {
      request: function (el) {
        if (enterFS === "webkitRequestFullscreen") {
          el[enterFS](Element.ALLOW_KEYBOARD_INPUT);
        } else {
          el[enterFS]();
        }
      },

      exit: function () {
        return document[exitFS]();
      },

      isFullscreen: function () {
        return document[elementFS];
      },

      change: changeEvent,
      error: errorEvent,
    };
  }

  return api;
}

function getContainer() {
  const pswpContainer = document.createElement("div");
  pswpContainer.style.background = "#000";
  pswpContainer.style.width = "100%";
  pswpContainer.style.height = "100%";
  pswpContainer.style.display = "none";
  document.body.appendChild(pswpContainer);
  return pswpContainer;
}
