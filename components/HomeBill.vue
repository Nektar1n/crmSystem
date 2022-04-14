<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Word of the Day</div>
      <p class="text-h4 text--primary">
        Счёт в валюте
      </p>
      <p>adjective</p>
      <div class="text--primary" v-for="cur of currencies" :key="cur">
        <h1 >{{getCurrency(cur) | currencyFilter(cur)}}</h1><br>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
        bottom
      >
        Подробнее.
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            Счёт на аккаунте
          </p>
          <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "HomeBill",
  data:()=>({
    reveal:false,
    currencies:['RUB','USD','EUR','UAH']
  }),
  computed:{
    base(){
      return this.$store.getters["info/info"].bill/(this.rates['RUB']/this.rates['EUR'])
    }
  },
  methods:{
    getCurrency(currency){
      return Math.floor(this.base*this.rates[currency])
    }
  },
  props:['rates'],
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
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
