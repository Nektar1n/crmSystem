
import firebase from "firebase/compat";

export const state = () => ({
  user:{},
  err:null
})

export const mutations = {
  setUser(state, user){
    state.user=user
  },
  setErr(state, message){
    state.err=message
  },
  clearErr(state){
    state.err=null
  }
}


export const actions={
    async login({dispatch, commit}, {email, password}){
      try{
        await firebase.auth().signInWithEmailAndPassword(email,password)

        const user={
          email,
          password
        }
        commit('setUser', user)

      }catch (e){
        console.log('this is error man',e.message)
        if (e.message.includes('auth/user-not-found')){
          commit('setErr', 'Пользователя с таким Email или паролем не существует.')
        }else if (e.message.includes('auth/wrong-password')){
          commit('setErr', 'Неверный пароль.')
        }
        throw e
      }
    },
    async logout(){
      await firebase.auth().signOut()
    },

    async registration({dispatch, commit},{name,email,password}){
      try{
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        const uid=await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill:10000,
          name,
        })
        const user={
          email,
          password
        }
        commit('setUser', user)

      }catch (e){
        console.log('this is error man',e.message)
        if (e.message.includes('auth/email-already-in-use')){
          commit('setErr', 'Пользователь с таким Email уже существует.')
        }
        throw e
      }
    },
    getUid(){
      const user=firebase.auth().currentUser
      return user? user.uid : null
    }
}
