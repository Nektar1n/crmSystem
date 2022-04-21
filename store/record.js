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
  }
}
