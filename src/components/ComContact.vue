<template>
  <div class="contact-container">
    <div class="contact-wrapper">
      <div class="contact-info">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <div class="contact-details">
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h3>Địa Chỉ</h3>
              <p>371 Đ. Nguyễn Kiệm, Phường 3, Gò Vấp, Hồ Chí Minh</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <div>
              <h3>Điện Thoại</h3>
              <p>0123 456 789</p>
              <p>0987 654 321</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>support@watchstore.com</p>
              <p>contact@watchstore.com</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-clock"></i>
            <div>
              <h3>Giờ Làm Việc</h3>
              <p>Thứ 2 - Thứ 6: 8:00 - 22:00</p>
              <p>Thứ 7 - Chủ Nhật: 9:00 - 20:00</p>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Họ Và Tên</label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              required 
              placeholder="Nhập họ và tên"
            >
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required 
              placeholder="Nhập địa chỉ email"
            >
          </div>
          <div class="form-group">
            <label for="phone">Số Điện Thoại</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="phone" 
              placeholder="Nhập số điện thoại"
            >
          </div>
          <div class="form-group">
            <label for="message">Nội Dung Tin Nhắn</label>
            <textarea 
              id="message" 
              v-model="message" 
              required 
              placeholder="Nhập nội dung tin nhắn"
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">
            <i class="fas fa-paper-plane"></i> Gửi Tin Nhắn
          </button>
        </form>
      </div>
    </div>

    <div class="map-section">
      <h2>Vị Trí Của Chúng Tôi</h2>
      <div class="map-container">
        <iframe 
          src="https://www.google.com/maps/embed/v1/place?q=GDU+-+TRƯỜNG+ĐẠI+HỌC+GIA+ĐỊNH+TPHCM&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"          width="100%" 
          height="450" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  },
  methods: {
    submitForm() {
      // Xử lý gửi form
      if (this.validateForm()) {
        // Gửi thông tin liên hệ
        alert('Cảm ơn bạn đã gửi tin nhắn!')
        this.resetForm()
      }
    },
    validateForm() {
      // Kiểm tra validate form
      if (!this.name || !this.email || !this.message) {
        alert('Vui lòng điền đầy đủ thông tin')
        return false
      }
      return true
    },
    resetForm() {
      // Đặt lại form
      this.name = ''
      this.email = ''
      this.phone = ''
      this.message = ''
    }
  }
}
</script>

<style scoped>
.contact-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 15px;
  background-color: #f4f4f4;
}

.contact-wrapper {
  display: flex;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
}

@media screen and (max-width: 992px) {
  .contact-wrapper {
    flex-direction: column;
  }
}

.contact-info {
  flex: 1;
  background-color: #0F4392;
  color: white;
  padding: 30px;
}

@media screen and (max-width: 576px) {
  .contact-info {
    padding: 20px 15px;
  }

  .contact-info h1 {
    font-size: 1.5rem;
  }
}

.contact-details {
  display: grid;
  gap: 20px;
}

@media screen and (max-width: 768px) {
  .contact-details {
    gap: 15px;
  }
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

@media screen and (max-width: 576px) {
  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .contact-item i {
    margin-bottom: 10px;
  }
}

.contact-item i {
  font-size: 2rem;
  color: #fcb034;
  min-width: 50px;
}

.contact-form {
  flex: 1;
  padding: 30px;
}

@media screen and (max-width: 992px) {
  .contact-form {
    padding: 20px;
  }
}

@media screen and (max-width: 576px) {
  .contact-form {
    padding: 15px;
  }

  .contact-form h2 {
    font-size: 1.4rem;
  }
}

.form-group {
  margin-bottom: 20px;
}

@media screen and (max-width: 576px) {
  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group textarea {
    font-size: 0.9rem;
    padding: 8px;
  }
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0F4392;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #0F4392;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-btn:hover {
  background-color: #fcb034;
}

@media screen and (max-width: 576px) {
  .submit-btn {
    font-size: 1rem;
    padding: 10px;
  }

  .submit-btn i {
    font-size: 0.9rem;
  }
}

.map-section {
  margin-top: 30px;
}

@media screen and (max-width: 576px) {
  .map-section {
    margin-top: 20px;
  }

  .map-section h2 {
    font-size: 1.4rem;
    text-align: center;
  }
}

.map-container {
  width: 100%;
  height: 450px;
  border-radius: 10px;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .map-container {
    height: 300px;
  }
}

@media screen and (max-width: 576px) {
  .map-container {
    height: 250px;
    border-radius: 5px;
  }
}

@media screen and (max-width: 992px) {
  .contact-container {
    padding: 20px 10px;
  }
}

img {
  max-width: 100%;
  height: auto;
}
</style>