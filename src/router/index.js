import { createRouter, createWebHistory } from 'vue-router';
import Products from '@/components/ProductList.vue';
import ProductView from '@/components/ProductView.vue';
import Cart from '@/components/ComCart.vue';
import ComPay from '@/components/ComPay.vue';
import ComInvoice from '@/components/ComInvoice.vue';
import ComDetailInvoice from '@/components/ComDetailInvoice.vue';
import ComContact from '@/components/ComContact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Products
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }, 
  {
    path: '/invoice',
    name: 'Invoice',
    component: ComInvoice
  },
  {
    path: '/products/:id',
    name: 'ProductView',
    component: ProductView
  },
  {
    path: '/pay',
    name: 'ComPay',
    component: ComPay,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: ComDetailInvoice
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ComContact
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;