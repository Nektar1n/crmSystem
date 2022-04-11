
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
    },
    async logout(){
      await firebase.auth().signOut()
    },
    async registration({dispatch},{name,email,password}){
      try{
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        const uid=await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          // bill:10000,
          name,
        })
      }catch (e){
        throw e
      }
    },
    getUid(){
      const user=firebase.auth().currentUser
      return user? user.uid : null
    }
}
