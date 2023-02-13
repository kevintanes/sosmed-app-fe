const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    status: "",
    imgProfile: "",
    role: ""
};

export const authReducer = (state = INITIAL_STATE, action) => {
    console.log("data from action :", action);
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("data from state :", state);
            console.log("data from action.payload :", action.payload);
            console.log("data from combine :",  {...state, ...action.payload});
            return { ...state, ...action.payload };

        case "LOGOUT":
            return INITIAL_STATE; //mengreset ulang reducer
    
        default:
            return state;
    }
}