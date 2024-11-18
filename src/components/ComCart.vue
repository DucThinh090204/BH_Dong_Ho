<template>
  <div class="cart-container">
    <div class="cart-header">
      <h2>Giỏ Hàng</h2>
      <span class="cart-count">({{ totalItems }} sản phẩm)</span>
    </div>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <img src="../assets/empty-cart.png" alt="Giỏ hàng trống">
      <p>Giỏ hàng của bạn đang trống</p>
      <router-link to="/" class="btn-continue-shopping">
        Tiếp tục mua sắm
      </router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items-section">
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="cart-item-card"
        >
          <div class="cart-item-image">
            <img :src="require(`@/${item.image}`)" :alt="item.name">
          </div>
          <div class="cart-item-details">
            <h3>{{ item.name }}</h3>
            <p class="cart-item-price">{{ formatCurrency(item.price) }}</p>
            <div>
              <span class="quantity-display">Số lượng: {{ item.quantity }}</span>

            </div>
            <button 
              @click="removeFromCart(item.id)" 
              class="btn-remove-item"
            >
              <i class="fas fa-trash"></i> Xóa
            </button>
          </div>
          <div class="cart-item-total">
            {{ formatCurrency(item.price * item.quantity) }}
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Tổng sản phẩm:</span>
          <span>{{ totalItems }}</span>
        </div>
        <div class="summary-row">
          <span>Tổng tiền:</span>
          <span>{{ formatCurrency(totalPrice) }}</span>
        </div>
        
        <button 
          @click="proceedToCheckout" 
          class="btn-checkout"
          :disabled="cartItems.length === 0"
        >
          <i class="fas fa-credit-card"></i> Thanh Toán
        </button>
      </div>
    </div>

    <div v-if="cartError" class="cart-error-message">
      {{ cartError }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ComCart',
  computed: {
    ...mapGetters({
      cartItems: 'cart/cartItems',
      totalItems: 'cart/totalItems',
      totalPrice: 'cart/totalPrice',
      cartError: 'cart/cartError'
    })
  },
  methods: {
    ...mapActions({
      removeItemFromCart: 'cart/removeFromCart',
      clearCartError: 'cart/clearError'
    }),
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
      }).format(value);
    },
    removeFromCart(productId) {
      this.$store.dispatch('cart/removeFromCart', { productId });
    },
    proceedToCheckout() {
      this.$router.push('/pay');
    },
    clearError() {
      this.clearCartError();
    }
  },
  watch: {
    cartError(newError) {
      if (newError) {
        setTimeout(() => {
          this.clearError();
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.cart-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

@media screen and (max-width: 576px) {
  .cart-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .cart-header h2 {
    margin-bottom: 10px;
  }
}

.cart-content {
  display: flex;
  gap: 20px;
}

@media screen and (max-width: 992px) {
  .cart-content {
    flex-direction: column;
  }
}

.cart-items-section {
  flex: 1;
}

.cart-item-card {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

@media screen and (max-width: 768px) {
  .cart-item-card {
    flex-direction: column;
    text-align: center;
  }
}

.cart-item-image {
  margin-right: 20px;
}

.cart-item-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .cart-item-image {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .cart-item-image img {
    width: 150px;
    height: 150px;
  }
}

.cart-item-details {
  flex-grow: 1;
}

@media screen and (max-width: 576px) {
  .cart-item-details {
    width: 100%;
  }
}

.quantity-display {
  margin-right: 10px;
}

@media screen and (max-width: 576px) {
  .quantity-display {
    display: block;
    margin-bottom: 10px;
  }
}

.cart-summary {
  flex: 0 0 300px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

@media screen and (max-width: 992px) {
  .cart-summary {
    flex: 1;
    width: 100%;
  }
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

@media screen and (max-width: 576px) {
  .summary-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .summary-row span {
    margin-bottom: 5px;
  }
}

.btn-checkout {
  width: 100%;
  padding: 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-checkout:disabled {
  background-color: #cccccc;
}

.btn-remove-item {
  margin-top: 10px;
}

@media screen and (max-width: 576px) {
  .btn-remove-item {
    margin-top: 15px;
  }
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
}

.empty-cart img {
  max-width: 300px;
  margin-bottom: 20px;
}

@media screen and (max-width: 576px) {
  .empty-cart img {
    max-width: 200px;
  }
}

.cart-error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}

img {
  max-width: 100%;
  height: auto;
}

.btn-remove-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #ff4d4f;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>