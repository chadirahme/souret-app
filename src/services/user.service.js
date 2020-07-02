import { STORAGE_KEYS } from 'utils/constants';
const COURSE_API_URL = STORAGE_KEYS.COURSE_API_URL;

export const userService = {
    login,
    logout,
    // register,
      getAll,
    // getById,
    // update,
    // delete: _delete
};


function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

   // const response =  await fetch(COURSE_API_URL+'/users/login', {
    return  fetch(COURSE_API_URL+'/users/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //console.log("ser>> " + JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem("name", user.name);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(COURSE_API_URL+`/users`, requestOptions)
        .then(res => {return res.json();})
        .then(json => {
        });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        console.log(data);
        if (!response.ok) {
            console.log(response.status);

            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

           // const error = (data && data.message) || response.statusText;
            const error = (data && data.message) || response.status;
            console.log(error);
            return data;//Promise.reject(error);
        }

        return data;
    });
}