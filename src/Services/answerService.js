import { get, post } from "../Utils/requests"

export const getAnswerList = async () => {
    const result = await get(`answers`);
    return result;
}

export const getAnswerListByUserId = async (userId) => {
    const result = await get(`answers?userId=${userId}`);
    return result;
}

export const getAnswerListById = async (id) => {
    const result = await get(`answers/${id}`);
    return result;
}

export const addNewAnswers = async (data) => {
    const response = await post(`answers`, data);
    return response;
}