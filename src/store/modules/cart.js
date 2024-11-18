import cartService from "../services/cartService"

export default {
  namespaced: true,
  
  state: {
    items: [], 
    cartError: null, 
    loading: false 
  },
  
  mutations: {
    SYNC_LOCAL_STORAGE(state) {
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    
    SET_CART_ITEMS(state, items) {
      state.items = items
      localStorage.setItem('cart', JSON.stringify(items))
    },
    
    ADD_TO_CART(state, item) {
      const existingItem = state.items.find(i => i.productId === item.productId)
      
      if (!existingItem) {
        state.items.push(item)
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    
    REMOVE_FROM_CART(state, productId) {
      state.items = state.items.filter(item => item.productId !== productId)
      
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    
    SET_CART_ERROR(state, error) {
      state.cartError = error
    },

    CLEAR_CART_ERROR(state) {
      state.cartError = null;
    },
    CLEAR_CART(state) {
      state.items = []; 
    },
    SET_CART(state, cartItems) {
      state.items = cartItems;
    },

  },
  
  actions: {

    initializeCart({ commit }) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        commit('SET_CART_ITEMS', parsedCart)
      }
    },
    clearCart({ commit }) {
      localStorage.removeItem('cart'); 
      commit('SET_CART', []); 
    },
    async fetchCartItems({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await cartService.getCartItems()
        commit('SET_CART_ITEMS', response.data)
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_CART_ERROR', 'Lỗi tải giỏ hàng')
        commit('SET_LOADING', false)
      }
    },
    
    async addToCart({ commit, state }, { product, quantity = 1 }) {
      commit('SET_LOADING', true)
      
      try {
        const existingItem = state.items.find(item => item.productId === product.id)
        
        if (!existingItem) {
          const newCartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
          }
          
          const response = await cartService.addToCart(newCartItem)
          commit('ADD_TO_CART', response.data)
        }
        
        commit('SYNC_LOCAL_STORAGE')
        
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_CART_ERROR', 'Lỗi thêm sản phẩm')
        commit('SET_LOADING', false)
      }
    },
    
    async removeFromCart({ commit, state }, { productId }) {
      commit('SET_LOADING', true);
      
      try {
        const cartItemToRemove = state.items.find(
          item => 
            item.productId === productId || 
            item.id === productId || 
            item.productId === Number(productId) ||
            item.id === Number(productId)
        );
        
        if (!cartItemToRemove) {
          console.error('Sản phẩm không tồn tại trong giỏ hàng');
          commit('SET_CART_ERROR', 'Sản phẩm không tồn tại trong giỏ hàng');
          commit('SET_LOADING', false);
          return;
        }
    
        console.log('Cart item to remove:', cartItemToRemove);
    
        try {
          if (cartItemToRemove.id) {
            await cartService.removeCartItem(cartItemToRemove.id);
          }
        } catch (serverError) {
          console.error('Lỗi khi xóa trên server:', serverError);
        }
    
       
        commit('REMOVE_FROM_CART', cartItemToRemove.productId || cartItemToRemove.id);
        
        const updatedItems = state.items.filter(
          item => item.productId !== productId && item.id !== productId
        );
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    
        commit('SET_LOADING', false);
      } catch (error) {
        console.error('Lỗi xóa sản phẩm:', error);
        commit('SET_CART_ERROR', 'Lỗi xóa sản phẩm');
        commit('SET_LOADING', false);
      }
    },   
    
  },
  
  getters: {
    cartItems: (state) => state.items,
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    isCartEmpty: (state) => state.items.length === 0,
    cartError: (state) => state.cartError,
    isLoading: (state) => state.loading,
    
  }
}