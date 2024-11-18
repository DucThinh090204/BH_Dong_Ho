<template>
  <header>
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/logo.png" alt="Watch Store Logo">
        </router-link>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/" exact>
              <i class="fas fa-home"></i> Trang Chủ
            </router-link>
          </li>
          <li>
            <router-link to="/cart">
              <i class="fas fa-shopping-cart"></i> Giỏ Hàng
            </router-link>
          </li>
          <li>
            <router-link to="/invoice">
              <i class="fas fa-file-invoice"></i> Hoá Đơn
            </router-link>
          </li>
          <li>
            <router-link to="/contact">
              <i class="fas fa-envelope"></i> Liên Hệ
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
header {
  background-color: #0F4392;
  color: #ecf0f1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.logo img {
  height: 80px;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.05);
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 15px;
}

nav ul li a {
  text-decoration: none;
  color: #ecf0f1;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

nav ul li a i {
  margin-right: 8px;
}

nav ul li a:hover,
nav ul li a.router-link-active {
  color: #fcb034;
  text-shadow: 0 0 5px rgba(252, 176, 52, 0.7);
}

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    padding: 15px;
  }

  nav ul {
    margin-top: 15px;
    flex-wrap: wrap;
    justify-content: center;
  }

  nav ul li {
    margin: 5px 10px;
  }
}
</style>