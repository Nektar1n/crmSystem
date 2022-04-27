<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="form">
    <h1>Профиль</h1>
    <hr>
    <div class="input_name">
      <v-text-field
        class="field"
        v-model="updatedName"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
    </div>
    <v-container fluid>
      <h3>Выберете язык: {{ radios || 'null' }}</h3>
      <v-radio-group
        class="radio-group"
        v-model="radios"
        mandatory
      >
        <v-radio
          label="Русский"
          value="Русский"
        ></v-radio>
        <v-radio
          label="English"
          value="English"
        ></v-radio>
      </v-radio-group>
    </v-container>
    <v-btn @click="updateUserInfo">
      Обновить
    </v-btn>
    <hr>
  </v-form>
</template>

<script>
export default {
  name: "profile",
  data: ()=>({
    radios: null,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    valid: true,
    updatedName:''
  }),
  computed:{
    name(){
      return this.$store.getters["info/info"].name
    }
  },
  mounted() {
    this.updatedName=this.name
  },
  methods:{
    async updateUserInfo(){
      if (this.$refs.form.validate()){
        try {
          console.log('yes')
          await this.$store.dispatch('info/updateInfo',{
            name: this.updatedName
          })
        }catch (e){
          console.log('no')
        }
      }else {
        this.$refs.form.validate()
      }
    }
  }

}
</script>

<style scoped>
.input_name{
  width: 50%;
}
.radio-group{
  margin-left: 30px;
}
</style>
