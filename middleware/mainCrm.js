export default function ({store, redirect}){
  if (!Object.keys(store.state.auth.user).length){
    redirect('/login?message=noUser')
  }
}
