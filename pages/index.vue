<template>
  <v-card dark>
  <h1>USER, HELLO!</h1>
    <h1>{{$store.state.auth.user}}</h1>
  </v-card>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    console.log(this.$store.state.auth.user)
  },
  middleware:['mainCrm']

}
</script>
