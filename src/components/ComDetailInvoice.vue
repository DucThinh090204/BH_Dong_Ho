<template>
    <div class="order-detail-container">
      <div v-if="order" class="order-detail">
        <div class="order-header">
          <h2>Chi Tiết Đơn Hàng</h2>
          <div class="order-info">
            <p><strong>Mã Đơn Hàng:</strong> {{ order.id }}</p>
            <p><strong>Ngày Đặt:</strong> {{ formatDate(order.createdAt) }}</p>
          </div>
        </div>
  
        <div class="customer-info">
          <h3>Thông Tin Khách Hàng</h3>
          <p><strong>Tên:</strong> {{ order.customerName }}</p>
          <p><strong>Số Điện Thoại:</strong> {{ order.customerPhone }}</p>
          <p><strong>Địa Chỉ:</strong> {{ order.customerAddress }}</p>
          <p><strong>Phương Thức Thanh Toán:</strong> {{ order.paymentMethod }}</p>
        </div>
  
        <div class="order-products">
          <h3>Sản Phẩm Đã Mua</h3>
          <table>
            <thead>
              <tr>
                <th>Hình Ảnh</th>
                <th>Tên Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Đơn Giá</th>
                <th>Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in order.products" :key="product.id">
                <td>
                  <img 
                    :src="require(`@/${product.image}`)" 
                    :alt="product.name" 
                    class="product-image"
                  />
                </td>
                <td>{{ product.name }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ formatCurrency(product.price) }}</td>
                <td>{{ formatCurrency(product.price * product.quantity) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="order-summary">
          <h3>Tổng Kết Đơn Hàng</h3>
          <div class="summary-row">
            <span>Tổng Số Lượng:</span>
            <span>{{ totalQuantity }}</span>
          </div>
          <div class="summary-row">
            <span>Tổng Tiền:</span>
            <span>{{ formatCurrency(order.totalPrice) }}</span>
          </div>
        </div>
  
        <div class="order-actions">
          <button @click="printOrder" class="print-btn">
            <i class="fas fa-print"></i> In Hóa Đơn
          </button>
          <button @click="$router.push('/invoice')" class="back-btn">
            Quay Lại Danh Sách Đơn Hàng
          </button>
        </div>
      </div>
      <div v-else class="no-order">
        <p>Không tìm thấy đơn hàng</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderDetail',
    data() {
      return {
        order: null
      }
    },
    computed: {
      totalQuantity() {
        return this.order ? this.order.products.reduce((total, product) => total + product.quantity, 0) : 0
      }
    },
    created() {
      this.fetchOrderDetails()
    },
    methods: {
      fetchOrderDetails() {
        const orderId = this.$route.params.id
        const orders = JSON.parse(localStorage.getItem('orders')) || []
        this.order = orders.find(order => order.id === orderId)
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
      printOrder() {
        window.print()
      }
    }
  }
  </script>
  
  <style scoped>
  .order-detail-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

@media screen and (max-width: 768px) {
  .order-detail-container {
    padding: 10px;
  }
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

@media screen and (max-width: 576px) {
  .order-header {
    flex-direction: column;
    text-align: center;
  }

  .order-header h2 {
    margin-bottom: 10px;
    font-size: 1.4rem;
  }

  .order-info {
    font-size: 0.9rem;
  }
}

.customer-info, 
.order-products, 
.order-summary {
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media screen and (max-width: 576px) {
  .customer-info, 
  .order-products, 
  .order-summary {
    padding: 10px;
  }

  .customer-info h3,
  .order-products h3,
  .order-summary h3 {
    font-size: 1.2rem;
  }

  .customer-info p {
    font-size: 0.9rem;
  }
}

.order-products table {
  width: 100%;
  border-collapse: collapse;
}

.order-products th, 
.order-products td {
  border: 1px solid #e0e0e0;
  padding: 10px;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .order-products table {
    font-size: 0.9rem;
  }

  .order-products th, 
  .order-products td {
    padding: 8px;
  }
}

@media screen and (max-width: 576px) {
  .order-products table {
    font-size: 0.8rem;
  }

  .order-products th, 
  .order-products td {
    padding: 5px;
  }
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

@media screen and (max-width: 576px) {
  .product-image {
    width: 40px;
    height: 40px;
  }
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: bold;
}

@media screen and (max-width: 576px) {
  .summary-row {
    font-size: 0.9rem;
  }
}

.order-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

@media screen and (max-width: 576px) {
  .order-actions {
    flex-direction: column;
    gap: 10px;
  }
}

.print-btn, 
.back-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
}

@media screen and (max-width: 576px) {
  .print-btn, 
  .back-btn {
    width: 100%;
    padding: 12px;
    font-size: 0.9rem;
  }
}

.print-btn {
  background-color: #4CAF50;
  color: white;
}

.back-btn {
  background-color: #f44336;
  color: white;
}

.no-order {
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media print {
  .order-actions {
    display: none;
  }

  body * {
    visibility: hidden;
  }

  .order-detail-container, 
  .order-detail-container * {
    visibility: visible;
  }

  .order-detail-container {
    position: absolute;
    left: 0;
    top: 0;
  }
}
  </style>