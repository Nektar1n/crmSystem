
import firebase from "firebase/compat";

export const state = () => ({
  // list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
}

export const actions={
    async login({dispatch, commit}, {email, password}){
      try{
        await firebase.auth().signInWithEmailAndPassword(email,password)
      }catch (e){
        throw e
      }
    }
}
