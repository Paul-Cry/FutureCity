export default function({store, redirect}){
    const currentUser = {
      user: store.state.auth.user
    }
    if (!currentUser.user){ // Если пользователь пустой то его возвращает на /auth/signin
      return redirect('/auth/signin')
    }
}
