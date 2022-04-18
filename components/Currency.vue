<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="valutes"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
<!--      <template v-slot:body.append>-->
<!--        <tr>-->
<!--          <td></td>-->
<!--          <td>-->
<!--            <v-text-field-->
<!--              v-model="count"-->
<!--              type="number"-->
<!--              label="Less than"-->
<!--            ></v-text-field>-->
<!--          </td>-->
<!--          <td colspan="4"></td>-->
<!--        </tr>-->
<!--      </template>-->
    </v-data-table>
  </div>
</template>

<script>
export default {
  name:'Currency',
  data () {
    return {
      currencies:['RUB','USD','EUR','UAH','CLP','ETB','GHS','JPY'],
      count:'',
      search: '',
      course: '',
      valutes: [
        {
          name: 'RUB',
          course: this.currency.rates['RUB'],
          date: this.date,
        },
        {
          name: 'USD',
          course: this.currency.rates['USD'],
          date: this.date,
        },
        {
          name: 'EUR',
          course: this.currency.rates['EUR'],
          date: this.date,
        },
        {
          name: 'UAH',
          course: this.currency.rates['UAH'],
          date: this.date,
        },
        {
          name: 'CLP',
          course: this.currency.rates['CLP'],
          date: this.date
        },
        {
          name: 'GHS',
          course: this.currency.rates['GHS'],
          date: this.date
        },
        {
          name: 'JPY',
          course: this.currency.rates['JPY'],
          date: this.date
        },

      ],
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Валюта',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Курс',
          value: 'course',
          filter: value => {
            if (!this.course) return true

            return value < parseInt(this.course)
          },
        },
        { text: 'Дата', value: 'date' },
      ]
    },
  },
  methods: {
    filterOnlyCapsText (value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
  },
  props:['rates','date','currency'],
  mounted() {
    console.log('is rates'+this.rates)

    console.log(this.currency.rates['RUB'])
  }

}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
