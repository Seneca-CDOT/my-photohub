import "@fontsource/poppins";
import "photoswipe/dist/photoswipe.css"
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm';
import "./gallery.css"


import Lightbox from 'photoswipe/dist/photoswipe-lightbox.esm';
const lightbox = new Lightbox({
  gallery: '#gallery',
  children: 'a',
  pswpModule: PhotoSwipe
});
lightbox.init();

