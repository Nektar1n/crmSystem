<template>
  <v-card>
    <v-card-title>Создать категорию</v-card-title>
    <CategoriesForm/>
  </v-card>
</template>

<script>
import CategoriesForm from "../components/CategoriesForm";
export default {
  name: "categories",
  components: {CategoriesForm}
}
</script>

<style scoped>

</style>
