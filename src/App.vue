<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(
              to="/"
            ) Munia
            .button-burger(
              @click="menuShow = !menuShow"
              :class="{ active: menuShow }"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow }"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for="link in linkMenu"
                  :key="link.title"
                  @click="menuShow = false"
                )
                  router-link.navbar-link(
                    :to="`${link.url}`"
                  ) {{ link.title }}
                li.navbar-item(
                  v-if="checkUser"
                  @click="logout"
                )
                  span.navbar-link Выход

      router-view
</template>

<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    linkMenu () {
      if (this.checkUser) {
        return [
          {title: 'Добавить', url: '/'},
          {title: 'Список', url: '/task'}
        ]
      }
      return [
        {title: 'Войти', url: '/login'},
        {title: 'Регистрация', url: '/registration'}
      ]
    }
  }
}
</script>

<style lang="stylus">

.wrapper
  max-width 100%

.navbar
  background rgb(0,120,215)

.header-logo
  color rgb(255,255,255)

.navbar-link
  color rgba(0,0,161,1)

.line.line-1,
.line.line-2,
.line.line-3
  color rgba(0,0,161,1)

</style>
