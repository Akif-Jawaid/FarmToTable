const initialState = {
  isAuthenticated: false,
};
const token = localStorage.getItem("token");
if (token) {
  initialState.isAuthenticated = true;
} else if (!token) {
  initialState.isAuthenticated = false;
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReducer;
