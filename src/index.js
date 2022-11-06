// Include Lightbox 
//import PhotoSwipeLightbox from '/photoswipe/photoswipe-lightbox.esm.js';
import "@fontsource/poppins";
import "../css/gallery.css"
import "../node_modules/photoswipe/dist/photoswipe.css"

import Lightbox from '../node_modules/photoswipe/dist/photoswipe-lightbox.esm';
const lightbox = new Lightbox({
  gallery: '#gallery',
  children: 'a',
  pswpModule: () => import('../node_modules/photoswipe/dist/photoswipe.esm.js')
});
lightbox.init();