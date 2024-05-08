export const loginUser=(user)=>{
    return {
        type:'LOGIN_SUCCESS',
        payload:{isAuthenticated:true,user},
    }
}

export const logoutUser=()=>{
    return {
        type:'LOGOUT_SUCCESS',
        payload:{isAuthenticated:false,user:null},
    }
}
