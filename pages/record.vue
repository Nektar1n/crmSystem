<template>
  <v-card height="100%">
    <v-card-text>
      <Loader v-if="loading"/>
      <p v-else-if="!categories.length">Категорий пока нет. <nuxt-link to="/categories">Добавить категорию</nuxt-link></p>
      <v-form
        lazy-validation
        ref="form"
        v-model="valid"
        v-else
      >
        <v-card-title>
          Новая запись
        </v-card-title>
        <v-select
          v-model="category"
          :items="categories"
          item-text="title"
          label="Выберите категорию"
        ></v-select>
        <v-radio-group
          v-model="type"
          mandatory
        >
          <v-radio
            label="Доход"
            value="income"
          ></v-radio>
          <v-radio
            label="Расход"
            value="outcome"
          ></v-radio>
        </v-radio-group>
        <v-text-field
          v-model.number="sum"
          filled
          label="Сумма"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="description"
          filled
          label="Описание"
          clearable
        ></v-text-field>
        <v-btn color="primary">
          Создать
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Loader from "../components/app/Loader";
export default {
  name: "record",
  components: {Loader},
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    radios: null,
    sum: null,
    description: null,
    valid: true,
    categories: [],
    loading: true,
    category: null,
    type:'outcome'

  }),
  async mounted() {
    this.categories=await this.$store.dispatch('category/fetchCategories')
    this.loading=false

    // if (this.categories.length){
    //   this.category=this.categories[0].title
    // }
  }
}
</script>

<style scoped>

</style>
