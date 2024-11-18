<template>
  <div class="product-view">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="product-details">
      <h1>{{ product.name }}</h1>
      <img :src="getProductImage(product.img)" :alt="product.name" class="product-image" />
      <p>{{ product.description }}</p>
      <div class="product-info">
        <span class="price">{{ formatPrice(product.price) }} VND</span>
        <span class="stock">Stock: {{ product.stock }}</span>
      </div>
      <div class="product-actions">
        <button 
          @click="handleAddToCart" 
          :disabled="isProductInCart || product.stock === 0"
        >
          {{ isProductInCart ? 'Added to Cart' : (product.stock > 0 ? 'Add to Cart' : 'Out of Stock') }}
        </button>
      </div>
    </div>
    <div v-else class="no-product">No product found</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductView',

  data() {
    return {
      productId: null,
    }
  },

  computed: {
    ...mapState('products', [
      'productDetails', 
      'loading', 
      'error'
    ]),
    product() {
      return this.productDetails;
    },
    isProductInCart() {
      const cartItems = this.$store.state.cart.cartItems || [];
      return cartItems.some(item => item.id === this.product.id);
    }
  },

  created() {
    this.productId = this.$route.params.id;
    this.fetchProductDetails(this.productId)
      .then(() => {
        console.log('Fetched product details:', this.productDetails);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  },

  methods: {
    ...mapActions('products', ['fetchProductDetails']),

    getProductImage(imageName) {
      if (!imageName) {
        return require('@/assets/logo.png'); // Hình ảnh mặc định
      }
      try {
        return require(`@/${imageName}`);
      } catch (error) {
        console.error('Image not found:', error);
        return require('@/assets/logo.png');
      }
    },

    formatPrice(price) {
      return price ? new Intl.NumberFormat('vi-VN').format(price) : '0';
    },

    async handleAddToCart() {
      if (!this.product) {
        console.error('Invalid product: No product found');
        return;
      }

      try {
        await this.$store.dispatch('cart/addToCart', {
          product: {
            id: this.product.id,
            name: this.product.name,
            price: this.product.price,
            image: this.product.img,
            stock: this.product.stock
          },
          quantity: 1
        });

        alert('Sản phẩm đã được thêm vào giỏ hàng');
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Không thể thêm sản phẩm vào giỏ hàng');
      }
    }
  }
}
</script>

<style scoped>
.product-view {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 768px) {
  .product-view {
    margin: 10px auto;
    padding: 15px;
    border-radius: 8px;
  }
}

@media screen and (max-width: 576px) {
  .product-view {
    margin: 5px auto;
    padding: 10px;
    border-radius: 6px;
  }
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  padding: 20px;
}

@media screen and (max-width: 576px) {
  .loading {
    font-size: 1.2rem;
    padding: 15px;
  }
}

.error {
  color: red;
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
}

@media screen and (max-width: 576px) {
  .error {
    font-size: 1rem;
    padding: 15px;
  }
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
}

.product-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .product-image {
    max-height: 400px;
  }
}

@media screen and (max-width: 576px) {
  .product-image {
    max-height: 300px;
    border-radius: 8px;
  }
}

p {
  margin-bottom: 20px;
  line-height: 1.6;
}

@media screen and (max-width: 576px) {
  p {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 576px) {
  .product-info {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
}

.price {
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff6b6b;
}

@media screen and (max-width: 576px) {
  .price {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
}

.stock {
  font-size: 1rem;
  color: #4a4a4a;
}

@media screen and (max-width: 576px) {
  .stock {
    font-size: 0.9rem;
  }
}

.product-actions {
  margin-top: 20px;
}

@media screen and (max-width: 576px) {
  .product-actions {
    margin-top: 15px;
  }
}

.product-actions button {
  width: 100%;
  background-color: #4ecdc4;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
}

@media screen and (max-width: 576px) {
  .product-actions button {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
}

.product-actions button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.product-actions button:hover:not(:disabled) {
  background-color: #45b7b3;
}

.no-product {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 20px;
}

@media screen and (max-width: 576px) {
  .no-product {
    font-size: 1rem;
    padding: 15px;
  }
}

@media print {
  .product-view {
    max-width: none;
    margin: 0;
    padding: 0;
    box-shadow: none;
  }

  .product-actions {
    display: none;
  }
}
</style>