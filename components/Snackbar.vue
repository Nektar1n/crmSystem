<template>
  <v-snackbar
    top
    v-model="snackbar"
    :vertical="vertical"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="indigo"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data:()=>({
    message:'',
    snackbar:false,
    vertical:true
  }),
  computed:{
    err(){
      // setTimeout(()=>{
      //   this.$store.commit('auth/clearErr')
      // },7000)
      return this.$store.state.err

    },
  },
  watch:{
    err(fbError){
      this.message=this.err
      this.snackbar=!!this.message
      console.log('it s fb error'+fbError)
      setTimeout(()=>{
        this.$store.commit('clearErr')
      },7000)

    }
  },
  mounted() {
    const {message}=this.$route.query
    if (message==='noUser'){
      this.message='Пожалуйста, введите ваши данные.'
    }else if (message==='logout'){
      this.message='Вы вышли из системы.'
    }
    this.snackbar=!!this.message
  }
}
</script>

<style scoped>

</style>
