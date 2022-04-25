<template>
<v-container>
  <h1>
    История записей
  </h1>
  <div class="history-chart">
    <canvas></canvas>
  </div>
  <Loader v-if="loading"/>
  <p class="center" v-else-if="!records.length">Записей пока нет</p>
  <section v-else>
    <history-table :records="records"/>
  </section>
</v-container>
</template>

<script>
import HistoryTable from "../../components/HistoryTable";
import Loader from "../../components/app/Loader";
export default {
  name: "history",
  components: {Loader, HistoryTable},
  data: ()=>({
    loading: true,
    records:[],
    categories:[],
  }),
  async mounted() {
    const records= await this.$store.dispatch('record/fetchRecords')
    this.categories=await this.$store.dispatch('category/fetchCategories')
    // console.log('this.categories')
    // console.log(this.categories)
    console.log('records')
    console.log(records)
    let index=1
    this.records=records.map(record=>{
      return {
        ...record,
        categoryName:this.categories.find(c=>c.id===record.categoryId),
        typeClass: record.type==='income'? 'green': 'red',
        typeText: record.type==='income'? 'Доход': 'Расход',
        index: index++,
        icon: 'mdi-format-list-bulleted-square'
      }
    })
    console.log('records')
    console.log(this.records)

    this.loading=false;
  }

}
</script>

<style scoped>

</style>
