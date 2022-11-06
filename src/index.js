// Include Lightbox 
//import PhotoSwipeLightbox from '/photoswipe/photoswipe-lightbox.esm.js';
import "@fontsource/poppins";
import "../css/gallery.css"
import "photoswipe/dist/photoswipe.css"
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm';

import Lightbox from 'photoswipe/dist/photoswipe-lightbox.esm';
const lightbox = new Lightbox({
  gallery: '#gallery',
  children: 'a',
  pswpModule: PhotoSwipe
});
lightbox.init();