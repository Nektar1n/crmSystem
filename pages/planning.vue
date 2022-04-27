<template>
  <v-app>
    <h1>Планирование</h1>
    <v-app-bar-title>{{ userInfo.bill | currencyFilter }} </v-app-bar-title>
    <Loader v-if="loading"/>
    <p v-else-if="!categories.length">Категорий пока нет. <nuxt-link to="/categories">Добавить категорию</nuxt-link></p>
    <v-card v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.title}} :</strong>
          {{cat.spend | currencyFilter}}  из {{cat.limit | currencyFilter}}
        </p>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
              <v-progress-linear
                v-model="cat.progressPercent"
                :color="cat.progressColour"
                height="20"
                v-bind="attrs"
                v-on="on"
              >
                <strong>{{Math.ceil(cat.progressPercent)}}%</strong>
              </v-progress-linear>
          </template>
          <span>{{cat.toolTip}}</span>
        </v-tooltip>
      </div>
    </v-card>
  </v-app>

</template>

<script>
import Loader from "../components/app/Loader";
import currencyFilter from "../plugins/currency.filter";
export default {
  head:{
    title: 'Планирование'
  },
  name: "planning",
  components: {Loader},
  data: ()=>({
    loading:true,
    categories:[]
  }),
  computed:{
    userInfo(){
      return this.$store.getters["info/info"]
    }
  },
  filters:{
    currencyFilter(value,currency='RUB'){
      return new Intl.NumberFormat('ru-RU',{
        style:'currency',
        currency
      }).format(value)
    },
  },
  async mounted() {
    const records=await this.$store.dispatch('record/fetchRecords')
    const categories=await this.$store.dispatch('category/fetchCategories')
    // console.log('its categories')
    // console.log(categories)
    console.log(records)
    this.categories=categories.map(cat=>{
      const spend=records
        .filter(r=>r.categoryId===cat.id)
        .filter(r=>r.type==='outcome')
        .reduce((total,record)=>{
          return total+= +record.sum
        },0)
      const percent=100*spend/cat.limit
      const progressPercent=percent >100 ? 100 : percent
      const progressColour=percent <60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const toolTipValue=cat.limit-spend
      const toolTip=`${toolTipValue<0? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(toolTipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColour,
        spend,
        toolTip
      }

    })


    this.loading=false
  }

}
</script>

<style scoped>

</style>
