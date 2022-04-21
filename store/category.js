import firebase from "firebase/compat";
import * as Zlib from "zlib";

export const state = () => ({
  category: {},
  titles:[],
  changedCategory:{},
})

export const mutations = {
  setTitles(state, allTitles){
    state.titles=allTitles
  },
  // setUser(state, user){
  //   state.user=user
  // },
  setCategory(state, category){
    state.category=category
  },
  setChangedCategory(state,changedCategory){
    state.changedCategory=changedCategory
  }
}
export const getters ={
    getTitles: state=>state.titles
}

export const actions={
  async fetchCategories({commit, dispatch}){
    try {
      const uid=localStorage.getItem('uid')

      const categories=(await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

      // const cats=[]
      // Object.keys(categories).forEach(key=>{
      //   cats.push({
      //     title: categories[key].title,
      //     limit: categories[key].limit,
      //     id: key
      //   })
      // })
      // return cats

      const res=Object.keys(categories).map(key=>({...categories[key], id: key}))
      let allTitles=[]
      res.forEach(e=>{
        console.log(e.title)
        allTitles.push(e.title)
      })

      commit('setTitles', allTitles)
      // console.log(allTitles)



      return Object.keys(categories).map(key=>({...categories[key], id: key}))

    }catch (e){
      throw e
    }

  },
  async createCategory({commit, dispatch}, {title, limit}){
      try {
        // const uid=await dispatch('getUid') оставим это на потом .
        const uid=localStorage.getItem('uid')

        const category=await firebase.database().ref(`/users/${uid}/categories`).push({
          title,
          limit
        })
        commit('setCategory', {id:category.key})
        return {title, limit, id: category.key}
      }catch (e){
        // commit('setError', e)
        throw e
      }
  },
  async updateCategory({commit, dispatch}, {title, limit, id}){
    try {
      // const uid=await dispatch('getUid') оставим это на потом .
      const uid=localStorage.getItem('uid')

      await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title,limit})
      const changedCategory={
        title:this.title,
        limit:this.limit,
        id:this.id
      }
      commit('setChangedCategory', changedCategory)
      console.log('it s changed category'+changedCategory)
      // commit('setCategory', {id:category.key})
      // return {title, limit, id: category.key}
    }catch (e){
      // commit('setError', e)
      throw e
    }
  }
}
