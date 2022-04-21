import firebase from "firebase/compat";


export const state = () => ({
  info:{}
})

export const mutations = {
  setInfo(state,info){
    state.info=info
  },
  clearInfo(state){
    state.info={}
  }
}

export const actions={
  async updateInfo({dispatch,commit, getters},toUpdate){
    try {
      const uid=localStorage.getItem('uid')
      const updateData={...getters.info, ...toUpdate}
      await firebase.database().ref(`/users/${uid}/info`).update(updateData)
      commit('setInfo',updateData)
    }catch (e){
      throw e
    }
  },
  async fetchInfo({dispatch, commit}){
    try {
      // const uid=await dispatch('getUid')
      // const info=(await firebase.database().ref(`users/${uid}/info`).once('value')).val()



      // const info=firebase.auth().currentUser
      const info=(await firebase.database().ref(`users/${localStorage.getItem('uid')}/info`).once('value')).val()
      commit('setInfo', info)

    }catch (e){

    }
  },
  // getUid(){
  //   const user=firebase.auth().currentUser
  //   return user? user.uid : null
  // },
}
export const getters={
  info:s=>s.info
}
