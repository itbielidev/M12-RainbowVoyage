<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4 contact-info mt-3">
          <p class="title">CONTACTO</p>
          <div class="contact-details">
            <p>
              <font-awesome-icon icon="fa-solid fa-phone" class="contact-icon"></font-awesome-icon>
              <a href="tel:+34965972423">965 972 423</a>
            </p>
            <p>
              <font-awesome-icon
                icon="fa-solid fa-envelope"
                class="contact-icon"
              ></font-awesome-icon>
              <a href="mailto:rainbow@gmail.com">rainbow@gmail.com</a>
            </p>
          </div>
        </div>
        <div class="col-md-4 mb-4 social-media mt-3">
          <p class="title">REDES SOCIALES</p>
          <div class="social-icons">
            <a href="https://www.facebook.com/?locale=es_ES"
              ><font-awesome-icon
                icon="fa-brands fa-facebook"
                class="social-icon"
              ></font-awesome-icon
            ></a>
            <a href="https://twitter.com/?lang=es">
              <font-awesome-icon icon="fa-brands fa-twitter" class="social-icon"></font-awesome-icon
            ></a>
            <a href="https://www.instagram.com/"
              ><font-awesome-icon
                icon="fa-brands fa-instagram"
                class="social-icon"
              ></font-awesome-icon
            ></a>
          </div>
        </div>
        <div class="col-md-4 mb-4 newsletter mt-3">
          <p class="title">NEWSLETTER</p>
          <div class="newsletter-form text-center">
            <input
              type="text"
              placeholder="user@gmail.com"
              class="newsletter-input py-1 px-2"
            /><br />
            <button class="btn mt-3">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  background-color: #000000;
  opacity: 0.72;
  color: white;
}

.btn {
  background-color: rgba(217, 5, 148, 1);
  color: white;
  margin-bottom: 10px;
  border-radius: 12px;
  width: max-content;
  padding: 0.6rem 1rem;
}

.btn:hover {
  background-color: rgb(233, 78, 181);
}

.contact-info,
.social-media,
.newsletter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-details p {
  font-size: 15px;
  display: flex;
  align-items: center;
}

.contact-icon {
  color: #ffffff;
  font-size: 25px;
  margin-right: 20px;
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-icon {
  color: #ffffff;
  font-size: 25px;
  margin-right: 20px;
}

.newsletter-form input {
  margin-bottom: 5px;
  border-radius: 15px;
  border: 2px solid #d90594;
}

.title {
  font-size: 22px;
  font-weight: bolder;
}

a {
  color: whitesmoke;
  text-decoration: none;
}
</style>
