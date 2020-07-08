import { STORAGE_KEYS } from 'utils/constants';
const COURSE_API_URL = STORAGE_KEYS.COURSE_API_URL;

export const activityService = {
    getAllActivity
};


function getAllActivity(id) {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(COURSE_API_URL+`/activity/allActivity/`+id, requestOptions)
        .then(response => response.json())
        .then(res => {return res});
}