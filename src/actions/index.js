export const add= (num) =>{
    return{
        type: 'add',
        payload: num
    };
};


export const sub= () =>{
    return{
        type: 'sub'
    };
};