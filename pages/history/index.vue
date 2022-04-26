<template>
<v-container>
  <h1>
    История записей
  </h1>

  <Loader v-if="loading"/>
  <p class="center" v-else-if="!records.length">Записей пока нет</p>
  <section v-else>
    <div class="history-chart">
      <div class="container">
        <pie-chart :data="barChartData" :options="barChartOptions" :height="200" />
      </div>
    </div>
    <history-table :records="records"/>
  </section>
</v-container>
</template>

<script>
import HistoryTable from "../../components/HistoryTable";
import Loader from "../../components/app/Loader";
import PieChart from "../../components/PieChart";

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};


export default {
  name: "history",
  components: { Loader, HistoryTable, PieChart},
  data: ()=>({
    loading: true,
    records:[],
    categories:[],
    barChartData: {

    },
    barChartOptions: {
      responsive: true,
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Monthly Income'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    },

  }),
  async mounted() {
    const records= await this.$store.dispatch('record/fetchRecords')
    this.categories=await this.$store.dispatch('category/fetchCategories')
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


    this.barChartData={
      labels: this.categories.map(c=>c.title),
      datasets: [{
        label: 'Расходы по категориям',
        data: this.categories.map(c=>{
          return this.records.reduce((total, rec)=>{
            if (rec.categoryId===c.id && rec.type==='outcome'){
              total += +rec.sum
            }
            return total
          }, 0)
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }


    // setTimeout(()=>this.loading=false,400)
    this.loading=false
  },

}
</script>

<style scoped>

</style>
