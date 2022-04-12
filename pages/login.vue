<template>
  <v-card>
<!--    <v-snackbar-->
<!--      v-model="snackbar"-->
<!--      :timeout="6000"-->
<!--      top-->
<!--    >-->
<!--      {{ message }}-->
<!--      <v-btn-->
<!--        color="blue"-->
<!--        flat-->
<!--        @click="snackbar = false"-->
<!--      >-->
<!--        Закрыть-->
<!--      </v-btn>-->
<!--    </v-snackbar>-->
    <Snackbar/>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="form"
  >


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


    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Войти <v-icon>mdi-send</v-icon>
    </v-btn>


    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Отменить
    </v-btn>
    <div class="span">
    <span>Нет аккаунта? <router-link to="/registration" id="registr">ЗАРЕГЕСТРИРОВАТЬСЯ</router-link></span>
    </div>
  </v-form>
  </v-card>
</template>

<script>
import Snackbar from "../components/Snackbar";
export default {
  name:'login',
  components: {Snackbar},
  layout:'started',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    show1: false,
    password: 'Password',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),

  methods: {
    async validate () {
      if (this.$refs.form.validate()){
        const user={
          email: this.email,
          password: this.password
        }

        try {
          await this.$store.dispatch('login', user)

          this.$router.push('/')
        }catch (e){
          console.log('hey login')
        }

      }else {
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
.form{
  padding: 10px;
}
.field{
  margin-bottom: 30px;
}
.span{
  margin-top: 15px;
}
</style>
