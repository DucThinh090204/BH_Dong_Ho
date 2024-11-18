<template>
  <footer>
    <div class="footer-container">
      <p>&copy; 2024 Watch Store. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped>
footer {
  background-color: #333;
  color: white;
  text-align: center;
  width: 100%;
  left: 0;
  padding: 15px 0;
  position: relative;
  bottom: 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

@media screen and (max-width: 576px) {
  footer {
    padding: 10px 0;
    font-size: 0.9rem;
  }
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1 0 auto;
}

footer {
  flex-shrink: 0;
}

@media screen and (max-width: 768px) {
  .footer-container {
    padding: 0 10px;
  }
}

@media screen and (max-width: 480px) {
  footer p {
    font-size: 0.8rem;
    line-height: 1.4;
  }
}

@media print {
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    color: #000;
    border-top: 1px solid #000;
  }
}
</style>