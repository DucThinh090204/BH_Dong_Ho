<template>
    <div class="com-pay">
      <h2>Đặt Hàng</h2>
  
      <form @submit.prevent="submitOrder" class="order-form">
        <div class="form-group">
          <label for="customerName">Tên Khách Hàng:</label>
          <input type="text" id="customerName" v-model="order.customerName" placeholder="Nhập tên của bạn" required />
        </div>
  
        <div class="form-group">
          <label for="customerPhone">Số Điện Thoại:</label>
          <input type="tel" id="customerPhone" v-model="order.customerPhone" placeholder="Nhập số điện thoại" required />
        </div>
  
        <div class="form-group">
          <label for="customerAddress">Địa Chỉ Giao Hàng:</label>
          <textarea id="customerAddress" v-model="order.customerAddress" placeholder="Nhập địa chỉ giao hàng" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="paymentMethod">Phương Thức Thanh Toán:</label>
          <select id="paymentMethod" v-model="order.paymentMethod" required>
            <option value="" disabled>Chọn phương thức thanh toán</option>
            <option value="COD">Thanh toán khi nhận hàng (COD)</option>
            <option value="Card">Thẻ tín dụng</option>
            <option value="Transfer">Chuyển khoản</option>
          </select>
        </div>
  
        <div class="cart-summary">
          <h3>Sản Phẩm Đã Chọn:</h3>
          <ul v-if="cart && cart.length > 0" class="cart-items">
            <li v-for="item in cart" :key="item.id || item._id" class="cart-item">
              <img :src="require(`@/${item.image}`)" alt="Hình ảnh sản phẩm" class="product-image" />
              <div class="product-details">
                <span class="product-name">{{ item.name }}</span>
                <span class="product-price">{{ item.price }} VNĐ</span>
                <span class="product-quantity">(Số lượng: {{ item.quantity || 1 }})</span>
              </div>
            </li>
          </ul>
          <p v-else class="empty-cart">Giỏ hàng trống</p>
        </div>
  
        <div class="total-price">
          <h3>Tổng Tiền: <span>{{ totalPrice }} VNĐ</span></h3>
        </div>
  
        <button type="submit" :disabled="!cart || cart.length === 0" class="submit-button">Đặt Hàng</button>
      </form>
  
      <div v-if="errorMessage" class="notification error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="notification success">{{ successMessage }}</div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    data() {
      return {
        order: {
          customerName: '',
          customerPhone: '',
          customerAddress: '',
          paymentMethod: '',
        },
        errorMessage: '',
        successMessage: '',
      };
    },
    computed: {
      ...mapState({
        cart: (state) => state.cart.items || [],
      }),
      totalPrice() {
        if (!this.cart || this.cart.length === 0) return 0;
        return this.cart.reduce((total, item) => {
          const price = item.price || 0;
          const quantity = item.quantity || 1;
          return total + price * quantity;
        }, 0);
      },
    },
    methods: {
      async submitOrder() {
        if (!this.cart || this.cart.length === 0) {
          this.errorMessage = 'Giỏ hàng trống. Vui lòng chọn sản phẩm.';
          return;
        }
  
        try {
          const orderData = {
            ...this.order,
            products: this.cart,
            totalPrice: this.totalPrice,
          };
  
          await this.$store.dispatch('order/createOrder', orderData);
  
          this.successMessage = 'Đặt hàng thành công!';
          this.errorMessage = '';
  
          this.order.customerName = '';
          this.order.customerPhone = '';
          this.order.customerAddress = '';
          this.order.paymentMethod = '';
          await this.$store.dispatch('cart/clearCart');
        } catch (error) {
          console.error('Order error:', error);
          this.errorMessage = 'Đặt hàng thất bại. Vui lòng thử lại.';
          this.successMessage = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .com-pay {
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

@media screen and (max-width: 768px) {
  .com-pay {
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
  }
}

@media screen and (max-width: 576px) {
  .com-pay {
    margin: 10px auto;
    padding: 15px;
    border-radius: 6px;
  }
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

@media screen and (max-width: 576px) {
  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
}

.order-form {
  display: grid;
  gap: 20px;
}

@media screen and (max-width: 576px) {
  .order-form {
    gap: 15px;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
}

@media screen and (max-width: 576px) {
  .form-group label {
    font-size: 0.9rem;
  }
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
  font-size: 1rem;
}

@media screen and (max-width: 576px) {
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 8px;
    font-size: 0.9rem;
  }
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
  max-height: 200px;
}

.cart-summary {
  margin-top: 30px;
}

@media screen and (max-width: 576px) {
  .cart-summary {
    margin-top: 20px;
  }
}

.cart-items {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

@media screen and (max-width: 576px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
}

@media screen and (max-width: 576px) {
  .product-image {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    margin-right: 0;
  }
}

.product-details {
  flex-grow: 1;
}

.product-name {
  font-weight: bold;
  color: #333;
  display: block;
}

.product-price,
.product-quantity {
  display: block;
  color: #666;
}

@media screen and (max-width: 576px) {
  .product-name,
  .product-price,
  .product-quantity {
    font-size: 0.9rem;
  }
}

.total-price {
  margin-top: 20px;
  font-size: 1.2em;
  color: #000;
  font-weight: bold;
}

@media screen and (max-width: 576px) {
  .total-price {
    font-size: 1rem;
  }
}

.submit-button {
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

@media screen and (max-width: 576px) {
  .submit-button {
    padding: 10px;
    font-size: 0.9rem;
  }
}

.submit-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.notification {
  margin-top: 20px;
  padding: 15px;
  border-radius: 6px;
  font-size: 0.9em;
  text-align: center;
}

@media screen and (max-width: 576px) {
  .notification {
    padding: 10px;
    font-size: 0.8rem;
  }
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

@media print {
  .com-pay {
    max-width: none;
    margin: 0;
    padding: 0;
    box-shadow: none;
  }

  .submit-button {
    display: none;
  }
}
  </style>
  