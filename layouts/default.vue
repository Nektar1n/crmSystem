<template>
  <v-app dark>
    <Loader v-if="loading"/>
    <v-navigation-drawer
      v-else
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <h1>{{name}}</h1>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <transition name="home">
        <Nuxt />
        </transition>
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
<!--        <v-list-item @click.native="right = !right">-->
<!--          <v-list-item-action>-->
<!--            <v-icon light>-->
<!--              mdi-repeat-->
<!--            </v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-title>Switch drawer (click me)</v-list-item-title>-->
<!--        </v-list-item>-->
        <v-list-item @click="$router.push('/profile')">
          <v-list-item-action>
            <v-icon>
              mdi-account
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Профиль</v-list-item-title>
        </v-list-item>

        <v-list-item @click="exitWithLogout">
          <v-list-item-action>
            <v-icon>
              mdi-arrow-up-bold-box-outline
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Выйти</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Loader from "../components/app/Loader";
export default {
  name: 'DefaultLayout',
  components: {Loader},
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Главная',
          to: '/'
        },
        {
          icon: 'mdi-domain',
          title: 'Счёт',
          to: '/score'
        },
        {
          icon: 'mdi-widgets',
          title: 'Категории',
          to:'/categories'
        },
        {
          icon: 'mdi-folder-open',
          title: 'Новая запись',
          to: '/record'
        },
        {
          icon: 'mdi-arrow-up-bold-box-outline',
          title: 'Планирование',
          to: '/planning'
        },
        {
          icon: 'mdi-dialpad',
          title:'История',
          to: '/history'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'true_CRM',
      loading: true,
    }
  },
  methods:{
    async exitWithLogout(){
      await this.$store.dispatch('logout')
      localStorage.removeItem('uid');
      this.$router.push('/login?message=logout')
    }
  },
  async mounted() {
    if (!localStorage.getItem('uid')){
      this.$router.push('/login?message=noUser')
    }

    if (!Object.keys(this.$store.getters["info/info"]).length){
      await this.$store.dispatch('info/fetchInfo')
      console.log(this.$store.getters["info/info"])
    }

    this.loading=false
  },
  computed:{
    name(){
      return this.$store.getters["info/info"].name
    }
  }
}
</script>


<style>
.home-enter-active, .home-leave-active { transition: opacity .5s; }
.home-enter, .home-leave-active { opacity: 0; }
</style>
