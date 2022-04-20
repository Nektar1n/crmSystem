<template>
  <v-card width="40%">
    <v-card-title v-if="!categories.length">Создайте категорию, сэр.</v-card-title>
    <div class="edit" v-else>
      <v-card-title>Редактировать категорию</v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-text>
          <v-select
            dense
            v-model="select"
            :items="allTitles"
            :rules="[v => !!v || 'Выберете категорию.']"
            label="Категории"
            required
          ></v-select>

          <v-text-field
            v-model="title"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>


          <v-text-field
            type="number"
            prefix="₽"
            v-model.number="limit"
            :counter="10"
            :rules="limitRules"
            label="Limit"
            required
          ></v-text-field>
          <!--    <v-text-field-->
          <!--      v-model="email"-->
          <!--      :rules="emailRules"-->
          <!--      label="E-mail"-->
          <!--      required-->
          <!--    ></v-text-field>-->

          <!--          <v-select-->
          <!--            v-model="select"-->
          <!--            :items="items"-->
          <!--            :rules="[v => !!v || 'Item is required']"-->
          <!--            label="Item"-->
          <!--            required-->
          <!--          ></v-select>-->

          <!--    <v-checkbox-->
          <!--      v-model="checkbox"-->
          <!--      :rules="[v => !!v || 'You must agree to continue!']"-->
          <!--      label="Do you agree?"-->
          <!--      required-->
          <!--    ></v-checkbox>-->

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Редактировать
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Удалить категорию
          </v-btn>

        </v-card-text>
      </v-form>
    </div>

  </v-card>
</template>

<script>
export default {
  name:'EditCategories',
  data: () => ({
    valid: true,
    title: '',
    limit: 100,
    limitRules:[
      v=> !!v || "Введите лимит",
      v=>(v&& Number(v)>=100) || "Лимит должен быть не меньше 100."
    ],
    nameRules: [
      v => !!v || 'Имя пустое',
      v => (v && v.length <= 10) || 'Имя категории не может превышать 10 символов',
    ],
    select: null,
    checkbox: false,
    // allTitles:[],
    // allTitlesTest:[]
    currentId:''
  }),
  computed:{
    // allTitleCategories(){
    //   return this.categories.map(key=>{
    //     this.allTitleCategories.push(key.title)
    //   })
    // }
    allTitles(){
      return this.$store.getters["category/getTitles"]
    },
  },
  watch:{
    categories(newCat){
      console.log(newCat)
    },
    select(currentTitle){
      console.log(currentTitle)
      const {id,title,limit}=this.categories.find(c=> c.title===currentTitle)
      this.title=title
      this.limit=limit
      this.currentId=id
      console.log(this.currentId)
    }
    // allTitlesTest(){
    //   return this.categories.forEach(e=>{
    //     this.allTitlesTest.push(e.title)
    //   })
    // }
  },
  created() {
    if (this.categories.length){
      const {title, limit}=this.categories[0]
      this.title=title
      this.limit=limit
      this.select=title
    }else{
      this.title=''
      this.limit=100
    }
    // const {id, title, limit}=this.categories[0]
    // this.title=title
    // this.limit=limit
    // this.select=id
    console.log('is categories')
    console.log(...this.categories)
  },
  props:{
   categories:{
     type: Array,
     required: true
   }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()){
        try {
          const categoryData={
            id: this.currentId,
            title:this.title,
            limit:this.limit,
            select: this.select
          }
          await this.$store.dispatch('category/updateCategory', categoryData)
          console.log(categoryData)
          this.$emit('updated', categoryData)
          console.log(this.allTitles)
          //
          const idxTitles=this.allTitles.indexOf(this.select)
          console.log(idxTitles)
          if (idxTitles !== -1) {
            this.allTitles[idxTitles] = categoryData.title;
            this.select=categoryData.title
          }
          console.log(this.allTitles)

        }catch (e){

        }
      }else{
        this.$refs.form.validate()
      }

    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },mounted() {

    // this.categories.map(key=>{
    //   this.allTitleCategories.push({title:key.title})
    // })

    // this.categories.forEach(e=>{
    //   console.log(e.title)
    //   this.allTitleCategories.push(e.title)
    //х })
    // console.log(this.$store.state["category/titles"])
    // console.log(this.$store.getters["category/getTitles"])
    // this.allTitles=this.$store.getters["category/getTitles"]
  }
}
</script>

<style scoped>

</style>
