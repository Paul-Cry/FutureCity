<template>
    <div>
        <hr class="cab__hr">
        <h3 class="cab__title">Заявки</h3>
        <div class="cab-items container admin" v-if="!flag">
            <div class="cab-item">
                <p class="cab-item__number">1.</p>
                <p class="cab-item__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                <p class="cab-item__text">kim@gmail.com</p>
                <div class="cab-item_status">
                    <button>
                        <img src="/img/cabinet/icons/check.svg" alt="" class="button button_status">
                    </button>
                    <button>
                        <img src="/img/cabinet/icons/cancel.svg" alt="" class="button button_status">
                    </button>
                </div>
            </div>
        </div>
        <div class="cab-items container user" v-if="flag">
            <div class="cab-item">
                <p class="cab-item__number">1.</p>
                <p class="cab-item__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                <p class="cab-item__text">kim@gmail.com</p>
                 <div class="cab-item_status check">
                    <button>
                        <img src="/img/cabinet/icons/check.svg" alt="" class="button button_status">
                    </button>
                    <p class="cab-item_status status__text">Принято</p>
                </div>
                <div class="cab-item_status check">
                    <button>
                        <img src="/img/cabinet/icons/cancel.svg" alt="" class="button button_status">
                    </button>
                    <p class="cab-item_status status__text">Отказано</p>
                </div>
                <div class="cab-item_status check">
                    <button>
                        <img src="/img/cabinet/icons/time.svg" alt="" class="button button_status">
                    </button>
                    <p class="cab-item_status status__text">В обработке</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'

    export default {
        name: 'cabinet',
        layout: 'main_layout',
        data: () => ({
            // ...mapState({
            //   sportEvent: 'getItem/sportEvent'
            // })
            flag: true
        }),
        async mounted() {
            this.checkUser()
            // this.$nextTick(() => {
            //   this.$nuxt.$loading.start()
            //   this.$nuxt.$loading.finish()
            // })
            
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        methods: {
            // ...mapActions({
            //   flag: 'getItem/CloaseLoadingGet',
            // }),
            checkUser(){
                if(this.user === undefined){
                    this.$router.push("/")
                }
            }
        }

    }
</script>