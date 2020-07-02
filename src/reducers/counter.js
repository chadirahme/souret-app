const counterReducer = (state =0, action) =>
{
    console.log('reducer', state, action);
    switch (action.type) {
        case'add':
            return state + action.payload;
        case'sub':
            return state - 1;
        default:
            return state;
    }
}

export default counterReducer;