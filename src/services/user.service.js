import { STORAGE_KEYS } from 'utils/constants';
const COURSE_API_URL = STORAGE_KEYS.COURSE_API_URL;

export const userService = {
    login,
    register,
    logout,
    // register,
      getAll,
    addActivity,
    getImage,
    addFollower,
    getAllPeoples,
    getUserInfo,
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


function register(name,email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, email, password })
    };

    // const response =  await fetch(COURSE_API_URL+'/users/login', {
    return  fetch(COURSE_API_URL+'/users', requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function getUserInfo(id) {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(COURSE_API_URL+`/users/`+id, requestOptions)
        .then(response => response.json())
        .then(res => {return res});
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(COURSE_API_URL+`/users`, requestOptions)
        .then(response => response.json())
        .then(res => {return res});
}

function getAllPeoples(id) {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(COURSE_API_URL+`/users/peoples/`+id, requestOptions)
        .then(response => response.json())
        .then(res => {return res});
}

 function getImage() {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return  fetch(COURSE_API_URL+`/activity/files/cat-3.jpeg`, requestOptions)
        .then(res => {return res.json();})
        .then(json => {
            return json;
        });
}

// @GetMapping("/files/{filename:.+}")

function addActivity(userid, description,user,file) {
    const formData = new FormData();
    formData.append('file', file);

    const requestOptions = {
        method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        body: formData
        //body: JSON.stringify({ userid, description,user,file})
    };

    // json={userid:userId,description:txtActivity,user:{id:userId}};
    // const response =  await fetch(COURSE_API_URL+'/users/login', {
    return  fetch(COURSE_API_URL+'/activity?userId='+userid+"&description="+description, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}


function addFollower(userid, followerid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, followerid })
    };

    return  fetch(COURSE_API_URL+'/userfollower', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log("ser>> " + JSON.stringify(user));
            return user;
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
            if (response.status === 409) {
                console.log("409>> "  + data.message);
            }

           // const error = (data && data.message) || response.statusText;
            const error = (data && data.message) || response.status;
            console.log(error);
            return data;//Promise.reject(error);
        }

        return data;
    });
}