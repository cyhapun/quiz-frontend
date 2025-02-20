import {get, post} from '../Utils/requests'

export const login = async (email, password) => {
    const result = await get(`users?email=${email}&password=${password}`);
    return result;
}

export const register = async (user) => {
    const result = await post('users', user);
    return result;
}

export const checkUserExist = async (key, value) => {
    const result = await get(`users?${key}=${value}`);
    return result;
}

export const getInfoUser = async (token) => {
    const result = await get(`users?token=${token}`);
    return result;
}