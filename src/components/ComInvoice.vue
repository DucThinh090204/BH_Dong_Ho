<template>
  <div class="order-list-container">
    <h2>Danh Sách Đơn Hàng</h2>
    
    <div v-if="orders.length === 0" class="no-orders">
      <p>Chưa có đơn hàng nào</p>
    </div>

    <div v-else class="order-list">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        class="order-item"
      >
        <div class="order-summary">
          <div class="order-header">
            <span class="order-id">Mã Đơn: {{ order.id }}</span>
            <span class="order-date">
              {{ formatDate(order.createdAt) }}
            </span>
          </div>
          
          <div class="order-details ">
            <p><strong>Tên Khách Hàng:</strong> {{ order.customerName }}</p>
            <p><strong>Tổng Tiền:</strong> {{ formatCurrency(order.totalPrice) }}</p>
          </div>
        </div>
        <button @click="viewOrder(order.id)" class="view-btn">Xem Chi Tiết</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data() {
    return {
      orders: []
    }
  },
  created() {
    this.fetchOrders()
  },
  methods: {
    fetchOrders() {
      this.orders = JSON.parse(localStorage.getItem('orders')) || []
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
      }).format(value)
    },
    formatDate(date) {
      return date 
        ? new Date(date).toLocaleDateString('vi-VN') 
        : new Date().toLocaleDateString('vi-VN')
    },
    viewOrder(orderId) {
      this.$router.push({ name: 'Detail', params: { id: orderId } })
    }
  }
}
</script>

<style scoped>
.order-list-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

@media screen and (max-width: 768px) {
  .order-list-container {
    padding: 15px;
  }

  .order-list-container h2 {
    font-size: 1.5rem;
    text-align: center;
  }
}

@media screen and (max-width: 576px) {
  .order-list-container {
    padding: 10px;
  }

  .order-list-container h2 {
    font-size: 1.3rem;
  }
}

.no-orders {
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media screen and (max-width: 576px) {
  .no-orders p {
    font-size: 0.9rem;
  }
}

.order-item {
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .order-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
  }
}

.order-summary {
  flex-grow: 1;
  margin-right: 15px;
}

@media screen and (max-width: 768px) {
  .order-summary {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

@media screen and (max-width: 576px) {
  .order-header {
    flex-direction: column;
  }

  .order-id, 
  .order-date {
    margin-bottom: 5px;
    font-size: 0.9rem;
  }
}

.order-details p {
  margin: 5px 0;
}

@media screen and (max-width: 576px) {
  .order-details p {
    font-size: 0.9rem;
  }
}

.view-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #2196F3;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

@media screen and (max-width: 768px) {
  .view-btn {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
  }
}

.view-btn:hover {
  background-color: #1976D2;
}

@media screen and (max-width: 576px) {
  .view-btn {
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 480px) {
  body {
    font-size: 14px;
  }
}

@media print {
  .order-list-container {
    max-width: none;
    padding: 0;
  }

  .view-btn {
    display: none;
  }
}
</style>