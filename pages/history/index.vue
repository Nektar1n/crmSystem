<template>
<v-container>
  <h1>
    История записей
  </h1>
  <div class="history-chart">
<!--    <canvas ref="canvas"></canvas>-->
    <div class="container">
      <bar-chart :data="barChartData" :options="barChartOptions" :height="200" />
    </div>
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
import BarChart from '~/components/chart'

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
  components: { Loader, HistoryTable, BarChart},
  data: ()=>({
    loading: true,
    records:[],
    categories:[],
    barChartData: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Income',
          // backgroundColor: ["red", "orange", "yellow"],
          backgroundColor: [chartColors.red, chartColors.orange, chartColors.yellow],
          data: [10, 15, 20]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      legend: {
        display: false,
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


    this.loading=false;
  },

}
</script>

<style scoped>

</style>
