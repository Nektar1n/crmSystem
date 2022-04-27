import firebase from "firebase/compat";


export const state = () => ({
  record: {},
})

export const mutations={
  updRecord(state, rec){
    state.record=rec
  },
}

export const actions={
  async createRecord({dispatch,commit},record){
    try {
      const uid=localStorage.getItem('uid')
      commit('updRecord', record)
      return await firebase.database().ref(`/users/${uid}/records`).push(record)


    }catch (e){
      throw e
    }
  },
  async fetchRecords({dispatch,commit}){
    try {
      const uid=localStorage.getItem('uid')
      const records=(await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
      return Object.keys(records).map(key=>({...records[key], id: key}))
    }catch (e){
      throw e
    }
  },
  async fetchRecordById({dispatch,commit}, id){
    try {
      const uid=localStorage.getItem('uid')
      const record=(await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
      return {
        ...record,
        id
      }
    }catch (e){
      throw e
    }
  }
}
