<template>
  <div>
    <header>
      <div class="header-main">
        <div class="header-content">
          <h2 class="header__title">Сделаем этот город лучше вместе с вами</h2>
          <p class="header__text">Сервис для подачи заявок</p>
        </div>
        <button class="header__button">Оставить заявку</button>
      </div>
    </header>
    <section class="news">
      <h2 class="news__title">
        Новости
      </h2>
      <p class="news__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div class="news-items container">
        <div class="news-item">
          <img src="/img/news/Rectangle1.png" alt="" class="news-item__img">
          <h4 class="news-item__title">Что должно быть на праздничном столе</h4>
          <p class="news-item__text">Встречая 2022 год, хозяйки должны позаботиться о том, чтобы на праздничном столе
            было много зелени</p>
          <p class="news-item__date">12 Mar - Jhon Doe</p>
        </div>
        <div class="news-item">
          <img src="/img/news/Rectangle2.png" alt="" class="news-item__img">
          <h4 class="news-item__title">В Москве открылась выставка, посвященная языкам коренных народов России</h4>
          <p class="news-item__text">Свыше 120 книг о языках народов бывшего СССР а также словари языков коренных
            народов России можно увидеть на выставке</p>
          <p class="news-item__date">12 Mar - Jhon Doe</p>
        </div>
        <div class="news-item">
          <img src="/img/news/Rectangle3.png" alt="" class="news-item__img">
          <h4 class="news-item__title">Врач развеяла миф о вреде привычки запивать еду водой</h4>
          <p class="news-item__text">ВРасхожее мнение о том, что жидкость разбавляет пищеварительные соки и мешает
            пищеварению не имеет под собой научных
            доказательств.</p>
          <p class="news-item__date">12 Mar - Jhon Doe</p>
        </div>
      </div>
    </section>
    <footer class="footer">
      <hr>
      <div class="footer-content container">
        <div class="footer-copyright">© 2022 #sdelaemluchse — All Rights Reserved</div>
        <ul class="footer-links">
          <li class="footer-links__item"><img src="/img/icons/facebook.svg" alt=""></li>
          <li class="footer-links__item"><img src="/img/icons/instagram.svg" alt=""></li>
          <li class="footer-links__item"><img src="/img/icons/twitter-sign.svg" alt=""></li>
          <li class="footer-links__item"><img src="/img/icons/youtube.svg" alt=""></li>
        </ul>
      </div>
    </footer>
  </div>
</template>
<script>
  //import { mapActions, mapGetters, mapState } from 'vuex'
  export default {
    name: 'IndexPage',
    layout: 'main_layout',
    data: () => ({
      // ...mapState({
      //   sportEvent: 'getItem/sportEvent'
      // })
    }),
    async mounted() {
      // this.$nextTick(() => {
      //   this.$nuxt.$loading.start()
      //   this.$nuxt.$loading.finish()
      // })


    },
    computed: {
      // ...mapGetters({
      //   flag: 'getItem/CloaseLoadingGet',
      // }),
    },
    methods: {
      // ...mapActions({
      //   flag: 'getItem/CloaseLoadingGet',
      // }),
    }

  }
</script>