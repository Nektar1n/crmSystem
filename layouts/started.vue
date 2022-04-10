<template>
  <v-app dark>
    <v-card max-width="700px" class="auth">
      <v-card-text>
          <nuxt/>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "started"
}
</script>

<style scoped>
  .auth{
    margin: 100px auto;
  }
</style>
