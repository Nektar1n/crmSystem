<template>
  <v-container>
    <Loader v-if="loading"/>
    <v-card v-else-if="record">
      <v-card-title><nuxt-link class="link" to="/history">История</nuxt-link><span>   -></span> {{ record.type==='income'? 'Доход': 'Расход' }}</v-card-title>
      <v-card :class="{
        'red': record.type==='outcome',
        'green': record.type==='income'
      }">
        <v-card-text>
          <h2>Описание:</h2> {{record.description}}
          <h2>Сумма:</h2> {{record.sum | currencyFilter}}
          <h2>Категория:</h2> {{record.categoryName}}
          <h3>Дата:</h3>
          <small>{{record.date}}</small>
        </v-card-text>
      </v-card>
    </v-card>
    <p v-else>Запись с id= <strong>{{$route.params.record}}</strong> не найдена</p>
  </v-container>
</template>

<script>
import Loader from "../../components/app/Loader";
export default {
  name: "record",
  components: {Loader},
  data: ()=>({
    loading: true,
    record: null,
  }),
  async mounted() {
    const id=this.$route.params.record
    console.log(id)
    const record= await this.$store.dispatch('record/fetchRecordById', id)
    const category= await this.$store.dispatch('category/fetchCategoryById',record.categoryId)

    this.record={
      ...record,
      categoryName: category.title
    }
    this.loading=false
  },
  filters:{
    currencyFilter(value,currency='RUB'){
      return new Intl.NumberFormat('ru-RU',{
        style:'currency',
        currency
      }).format(value)
    },
  }

}
</script>

<style scoped>
.link{
    text-decoration: none;
    color: gray;
  transition: all .2s ease-in-out;
}
.link:hover{
  color: cadetblue;
  cursor: pointer;
  transform: scale(1.1);
}
</style>
