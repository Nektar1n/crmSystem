<template>
  <div class="score">
    <h1>Счёт:</h1>
    <div class="loadBtn">
      <v-btn
        icon
        color="green"
        @click="refresh()"
      >
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </div>
    <div class="loading" v-if="loading">
      <Loader/>
    </div>
    <div v-else class="cards">
      <HomeBill :rates="currency.rates"/>
      <Currency :rates="currency.rates"
                :date="currency.date"
                :currency="currency"
                class="currency"
      />
    </div>
  </div>
</template>

<script>
import Loader from "../components/app/Loader";
import HomeBill from "../components/HomeBill";
import Currency from "../components/Currency";
export default {
  data : ()=>({
    loading:true,
    currency:null,
  }),
  name: "score",
  components: {Currency, HomeBill, Loader},
  async mounted() {
    this.currency=await this.$store.dispatch('fetchCurrency')
    console.log(this.currency)
    this.loading=false
  },
  methods:{
    async refresh(){
      this.loading=true
      await this.$store.dispatch('fetchCurrency')
      this.loading=false
    }
  }

}
</script>

<style scoped>
.loading{
  margin-left: 50%;
}
.cards{
  display: flex;
  /*margin-right: 5px;*/

}
.currency{
  margin-right: 50px;
}
@media (max-width: 900px) {
  .cards{
    flex-direction: column;
  }
  .currency{
    margin-right: 0;
  }
}
.loadBtn{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
