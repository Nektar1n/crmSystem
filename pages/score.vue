<template>
  <div class="score">
    <h1>Счёт:</h1>
    <div class="loading" v-if="loading">
      <Loader/>
    </div>
    <div v-else class="cards">
      <HomeBill/>
      <Currency/>
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
    this.loading=false
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
</style>
