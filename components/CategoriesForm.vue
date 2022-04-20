<template>
  <v-card width="40%">
    <v-card-title>Создать категорию</v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-card-text>
          <v-text-field
            v-model="title"
            :counter="20"
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

      <!--    <v-select-->
      <!--      v-model="select"-->
      <!--      :items="items"-->
      <!--      :rules="[v => !!v || 'Item is required']"-->
      <!--      label="Item"-->
      <!--      required-->
      <!--    ></v-select>-->

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
            Создать
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Очистить
          </v-btn>

          </v-card-text>
        </v-form>
  </v-card>
</template>

<script>
export default {
  name:'CategoriesForm',
  data: () => ({
    valid: true,
    title: '',
    limit: 100,
    limitRules:[
      v => !!v || "Введите лимит.",
      v => (v && Number(v) >= 100) || "Лимит должен быть не меньше 100.",
      v => (v && String(v).length <= 10) || "Слишком большое количество денег."
    ],
    nameRules: [
      v => !!v || 'Имя пустое.',
      v => (v && v.length <= 20) || 'Имя категории не может превышать 20 символов.',
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
  }),

  methods: {
    async submit () {
      if (this.$refs.form.validate()){
        try {
          const category=await this.$store.dispatch('category/createCategory',{
            title:this.title,
            limit:this.limit
          })
          this.title=''
          this.limit=100
          this.$refs.form.resetValidation()
          this.$emit('createCategory', category)
          await this.$store.dispatch('category/fetchCategories')
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
  },
}
</script>

<style scoped>

</style>
