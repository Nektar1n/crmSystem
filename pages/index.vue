<template>
  <v-card dark>
  <v-card-title>Популярность этой crm за последние 3 месяца.</v-card-title>
    <div class="container">
      <bar-chart :data="barChartData" :options="barChartOptions" :height="200" />
    </div>
  </v-card>
</template>

<script>
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
  head:{
    title: 'Добро пожаловать в CRM'
  },
  name: 'IndexPage',
  components:{BarChart},
  data: ()=>({
    barChartData: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Популярность',
          // backgroundColor: ["red", "orange", "yellow"],
          backgroundColor: [chartColors.red, chartColors.orange, chartColors.yellow],
          data: [10, 15, 30]
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
        text: 'Растёт'
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
  })
  // mounted() {
  //   console.log(this.$store.state.auth.user)
  // },
  // middleware:['mainCrm']

}
</script>
