import './style.css';
import Glide from '@glidejs/glide';

new Glide('.glide', {
  type: 'carousel',
    focusAt: 'center',
    perView: 1,
    startAt: 0
}).mount();
