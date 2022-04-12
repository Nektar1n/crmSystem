
export const state = () => ({
  error: null
})

export const mutations = {
  setError(state,error){
    state.error=error
  },
  clearError(state){
    state.error=null
  }
}

export const getters = {
  getError: state=>state.error,
}
