import axios from "axios";

export default {
  namespaced: true, 
  state: {
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    currentOrder: null,
    error: null
  },

  mutations: {
    ADD_ORDER(state, order) {
      state.orders.push(order);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    SET_CURRENT_ORDER(state, order) {
      state.currentOrder = order;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async createOrder({ commit, dispatch }, orderData) {
      try {

        const productsToUpdate = orderData.products.map(product => ({
          id: product.productId, 
          quantity: product.quantity
        }));

        console.log('Products to Update:', productsToUpdate);
        const response = await axios.post('http://localhost:3000/order', orderData);
  
        commit('ADD_ORDER', { 
          ...orderData, 
          id: response.data.id 
        });
  
        commit('SET_CURRENT_ORDER', response.data);
  
        await dispatch('products/updateMultipleProductQuantities', productsToUpdate, { root: true });
  
        return response.data;
      } catch (error) {
        console.error('Error in createOrder:', error);
        commit('SET_ERROR', error.message);
        throw error; 
      }
    }
  },

  getters: {
    allOrders: (state) => state.orders,
    currentOrder: (state) => state.currentOrder,
    orderError: (state) => state.error
  }
};