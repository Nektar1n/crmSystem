<template>
  <v-card height="100%">
    <Snackbar/>
    <v-card-text>
      <Loader v-if="loading"/>
      <p v-else-if="!categories.length">Категорий пока нет. <nuxt-link to="/categories">Добавить категорию</nuxt-link></p>
      <v-form
        lazy-validation
        ref="form"
        v-model="valid"
        v-else
      >
        <v-card-title>
          Новая запись
        </v-card-title>
        <v-select
          v-model="category"
          :items="categories"
          item-text="title"
          item-value="id"
          label="Выберите категорию"
        ></v-select>
        <v-radio-group
          v-model="type"
          mandatory
        >
          <v-radio
            label="Доход"
            value="income"
          ></v-radio>
          <v-radio
            label="Расход"
            value="outcome"
          ></v-radio>
        </v-radio-group>
        <v-text-field
          required
          v-model.number="sum"
          filled
          label="Сумма"
          clearable
          type="number"
          :counter="20"
          :rules="sumRules"
        ></v-text-field>
        <v-text-field
          v-model="description"
          filled
          label="Описание"
          clearable
          required
          :counter="200"
          :rules="descriptionRules"
        ></v-text-field>
        <v-btn color="primary"
               @click="submit"
        >
          Создать
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

import Loader from "../components/app/Loader";
import Snackbar from "../components/Snackbar";
export default {
  name: "record",
  components: {Snackbar, Loader},
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    radios: null,
    sum: null,
    description: null,
    valid: true,
    categories: [],
    loading: true,
    category: null,
    type:'outcome',
    sumRules:[
      v => !!v || "Введите сумму.",
      v => (v && Number(v) >= 1) || "Сумма должна быть не меньше 1.",
      v => (v && String(v).length <= 20) || "Слишком большое количество денег."
    ],
    descriptionRules: [
      v => !!v || 'Описание пустое.',
      v => (v && v.length <= 200) || 'Описание категорий не должно превышать 200 символов.',
    ],

  }),
  async mounted() {
    this.categories=await this.$store.dispatch('category/fetchCategories')
    this.loading=false

    if (this.categories.length){
      // this.category=this.categories[0]
      console.log('it s category')
      console.log(this.category)
    }
  },
  watch:{
    category(newCat){
      console.log(this.category)

    }
  },
  computed:{
    infoUser(){
      return this.$store.getters["info/info"]
    },
    canCreateRecord(){
      if (this.type==='income'){
        return true
      }

      return this.infoUser.bill>=this.sum
    }
  },
  methods:{
    async submit () {
      if (this.$refs.form.validate()){
        if (this.canCreateRecord){
          try {
            await this.$store.dispatch('record/createRecord', {
              categoryId:this.category,
              sum:this.sum,
              description: this.description,
              type:this.type,
              date: new Date().toJSON()
            })
            const bill=this.type==='income'?this.infoUser.bill+this.sum:this.infoUser.bill-this.sum

            await this.$store.dispatch('info/updateInfo',{bill})


            this.sum=1
            this.description=''
            this.$refs.form.resetValidation()
          }catch (e){
          }
        }
        else {
          alert(`Недостаточно средств на счёте (${this.sum-this.infoUser.bill})`)
        }
      }else{
        this.$refs.form.validate()
      }


    },
  }
}
</script>

<style scoped>

</style>
