<template>
  <v-card>
  <Snackbar/>
  <v-form
    class="form"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      class="field"
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      class="field"
    ></v-text-field>

    <v-text-field
      class="field"
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Normal with hint text"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submit"
    >
      Зарегестрироваться <v-icon>mdi-send</v-icon>
    </v-btn>
    <div class="span">
      <span>Уже есть аккаунт? <router-link to="/login">ВОЙТИ</router-link></span>
    </div>
  </v-form>
  </v-card>
</template>

<script>
import Snackbar from "../components/Snackbar";
export default {
  name:'registration',
  components: {Snackbar},
  layout:'started',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    checkbox: false,
    show1: false,
    password: 'Password',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),

  methods: {
    async submit(){
      if (this.$refs.form.validate()){

        const user={
          name:this.name,
          email:this.email,
          password:this.password
        }
        try {
          await this.$store.dispatch('auth/registration',user).then(()=>{
            this.$router.push('/')
          })
          console.log('heybro')


        }catch (e){
          console.log('hey registration', e)
        }

      }else {
        this.$refs.form.validate()
      }
    },
    validate () {
      this.$refs.form.validate()
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
.form{
  padding: 10px;
}
.field{
  margin-bottom: 30px;
}
.span{
  margin-top: 15px;
}
.form{
  width: 600px;
}
</style>
