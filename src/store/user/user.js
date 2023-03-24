const initialUserState = {
    userName: '',
    walletAddress: ''
}

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state, userName: action.payload.userName
            };
        case 'SET_WALLET' :
            return {
                ...state, walletAddress: action.payload.walletAddress
            }
            default:
                return state;
        }
}