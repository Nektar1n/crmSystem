<template>
  <v-data-table
    :headers="headers1"
    :items="records"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:item.typeText="{ item }">
      <v-chip
        :color="item.typeClass"
        dark
      >
        {{ item.typeText }}
      </v-chip>
    </template>
    <template v-slot:item.icon="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-chip
              @click="$router.push(`/history/${item.id}`)"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{item.icon}}
              </v-icon>
            </v-chip>
        </template>
        <span>Посмотреть запись</span>
       </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name:'HistoryTable',
  props:{
    records:{
      required: true,
      type: Array
    }
  },
  mounted() {
    console.log(this.records)
  },
  data () {
    return {
      headers1:[
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'index'
        },
        {text: 'Сумма', value: 'sum'}, {text: 'Дата', value: 'date'},{text: 'Имя категории', value: 'categoryName.title'},
        {text: 'Тип', value: 'typeText'}, {text: 'Открыть', value: 'icon'}
      ],
    }
  },
  methods:{
    openRecordDescription(){
      this.$router.push(`/history/${this.records.categoryId}`)
    }
  }
}
</script>

<style scoped>

</style>
