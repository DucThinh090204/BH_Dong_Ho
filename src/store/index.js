// store/index.js
import { createStore } from 'vuex';
import products from './modules/products';
import cart from './modules/cart';
import order from './modules/order';



export default createStore({
  modules: {
    products,
    cart, 
    order
  },

  strict: false
});

