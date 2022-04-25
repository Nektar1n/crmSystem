import firebase from "firebase/compat";


export const state = () => ({

})

export const actions={
  async createRecord({dispatch,commit},record){
    try {
      const uid=localStorage.getItem('uid')
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
  }
}
