<template>
    <div>
        <hr class="cab__hr">
        <h3 class="cab__title">Заявки</h3>
        <div class="cab-items container admin" v-if="user.admin">
            <div class="cab-item" v-for="(element, index) in clearRequest">
                <p class="cab-item__number">{{++index}}.</p>
                <p class="cab-item__text">{{element.content}}</p>
                <p class="cab-item__text">{{element.email}}</p>
                <div class="cab-item_status">
                    <button>
                        <img src="/img/cabinet/icons/check.svg" alt="" class="button button_status"
                            @click="addCheckRequest({element: element, index: index})">
                    </button>
                    <button>
                        <img src="/img/cabinet/icons/cancel.svg" alt="" class="button button_status"
                            @click="addCancelRequest({element: element, index: index})">
                    </button>
                </div>
            </div>
        </div>
        <div class="cab-items container user">
            <div class="cab-item" v-for="(element, index) in privateRequest">
                <p class="cab-item__number">{{++index}}.</p>
                <p class="cab-item__text">{{element.content}}</p>
                <div class="cab-item_status check" v-if="element.status ==='check'">
                    <button class='button_cabinet'>
                        <img src="/img/cabinet/icons/check.svg" alt="" class="button button_status">
                        <p class="cab-item_status status__text button">Принято</p>
                    </button>
                </div>
                <div class="cab-item_status check" v-if="element.status ==='cancel'">
                    <button>
                        <img src="/img/cabinet/icons/cancel.svg" alt="" class="button button_status">
                    </button>
                    <p class="cab-item_status status__text">Отказано</p>
                </div>
                <div class="cab-item_status check" v-if="element.status ==='waiting'">
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
    import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
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
            //this.checkPage()

            let reading = () => {
                console.log('this.user.admin')
                console.log(this.user.admin)
                this.getAllRequest()
            }
            reading()
            // this.$nextTick(() => {
            //   this.$nuxt.$loading.start()
            //   this.$nuxt.$loading.finish()
            // })
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                requests: 'request/requests'
            }),
            clearRequest() {
                let result = this.requests.filter(el => {
                    if (el.status === "waiting") {
                        return true
                    }
                })
                return result
            },
            privateRequest() {
                let result = this.requests.filter(el => {
                    if (el.email === this.user.email) {
                        return true
                    }
                })
                return result
            }
        },
        methods: {
            ...mapActions({
                getAllRequest: 'request/getAllRequest',
                addRequestCheck: 'auth/addRequestCheck',
                addRequestCancel: 'auth/addRequestCancel'
            }),
            ...mapMutations({
                addUser: 'auth/addUser',
                deleteRequest: 'request/deleteRequest'
            }),

            checkPage() {
                console.log('this.user.email')
                console.log(this.user.email)
                if (this.user.email === undefined) {
                    this.$router.push("/")
                }
            },
            checkUser() {
                let userLocal = localStorage.getItem('user')
                console.log(111)
                console.log(this.user)
                if (userLocal !== null && this.user.email === undefined) {
                    this.addUser(JSON.parse(userLocal))
                }
            },
            addCheckRequest(data) {
                this.addRequestCheck({
                    email: data.element.email,
                    id_reques: data.element.id
                })
                this.deleteRequest(data.index)
            },
            addCancelRequest(data) {
                this.addRequestCancel({
                    email: data.element.email,
                    id_reques: data.element.id
                })
                this.deleteRequest(data.index)
            },
            test() {
                console.log('clearRequest')
                console.log('clearRequest')
                console.log('clearRequest')
                console.log(this.privateRequest)
            }
        }

    }
</script>